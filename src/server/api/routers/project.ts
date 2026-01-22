
import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { clerkClient } from "@clerk/nextjs/server";
import { z } from "zod";

export const projectRouter=createTRPCRouter({
    createProject : protectedProcedure.input(
        z.object({
            name: z.string(),
            githubUrl : z.string(),
            githubToken : z.string().optional()
        })
    ).mutation(async({ctx,input})=>{
        // Sync user to DB
        const client = await clerkClient();
        const clerkUser = await client.users.getUser(ctx.user.userId!);
        if (!clerkUser.emailAddresses[0]?.emailAddress) {
            throw new Error("User email not found");
        }
        const email = clerkUser.emailAddresses[0].emailAddress;
        await ctx.db.user.upsert({
            where: {
                emailAddress: email,
            },
            update: {
                imageUrl: clerkUser.imageUrl,
                firstName: clerkUser.firstName,
                lastName: clerkUser.lastName,
            },
            create: {
                id: ctx.user.userId!,
                emailAddress: email,
                imageUrl: clerkUser.imageUrl,
                firstName: clerkUser.firstName,
                lastName: clerkUser.lastName,
            },
        });
        const user = await ctx.db.user.findUnique({
            where: { emailAddress: email },
        });
        if (!user) {
            throw new Error("User not found after upsert");
        }

      const project = await ctx.db.project.create({
        data: {
            githubUrl : input.githubUrl,
            name :  input.name,
            userToProjects:{
                create:{
                    userId : user.id,
                }
            }
        }
      })
      return project
    })
}
)

