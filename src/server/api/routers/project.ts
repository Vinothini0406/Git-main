import { createTRPCRouter, protectedProcedure } from "../trpc"
import { z } from "zod"
import { clerkClient } from "@clerk/nextjs/server"
import { get } from "http"
import { pollCommits } from "@/lib/github"
import { indexGithubRepo } from "@/lib/github-loader"

export const projectRouter = createTRPCRouter({
  createProject: protectedProcedure
    .input(
      z.object({
        name: z.string(),
        githubUrl: z.string(),
        githubToken: z.string().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {

      const client = await clerkClient()
      const clerkUser = await client.users.getUser(ctx.user.userId!)

      const email = clerkUser.emailAddresses[0]?.emailAddress
      if (!email) {
        throw new Error("Email not found")
      }

      // ✅ FIXED UPSERT (USE emailAddress)
      const user = await ctx.db.user.upsert({
        where: { emailAddress: email },
        update: {
          id: ctx.user.userId!,
        },
        create: {
          id: ctx.user.userId!,
          emailAddress: email,
        },
      })

      const project = await ctx.db.project.create({
        data: {
          name: input.name,
          githubUrl: input.githubUrl,
          userToProjects: {
            create: {
              userId: user.id,
            },
          },
        },
      })
      await indexGithubRepo(project.id, input.githubUrl, input.githubToken)
      await pollCommits(project.id)
      return project
    }),
    getProjects: protectedProcedure.query(async ({ctx}) => {
       return  await ctx.db.project.findMany({
        where: {
          userToProjects: {
            some: {
              userId: ctx.user.userId!
            }
          },
          deletedAt: null
        }
      })
    }) ,
    getCommits : protectedProcedure.input(z.object({
    projectId: z.string()
    })).query(async ({ctx, input}) =>{
      return await ctx.db.commit.findMany({ where: {projectId: input.projectId}})
    }
  )
})
