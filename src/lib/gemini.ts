import  "dotenv/config";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!)
const model = genAI.getGenerativeModel({
    model : "gemini-2.5-flash",
})
export const summariseCommit = async (diff: string) =>{
    const response = await model.generateContent([
         `You are an expert programmer, and you are trying to summarize a git diff.

Reminders about the git diff format:

For every file, there are a few metadata lines, like (for example):

\`\`\`
diff --git a/lib/index.js b/lib/index.js
index aadf691..bfef603 100644
--- a/lib/index.js
+++ b/lib/index.js
\`\`\`

This means that \`lib/index.js\` was modified in this commit. Note that this is only an example.

Then there is a specifier of the lines that were modified.

A line starting with \`+\` means it was added.  
A line that starting with \`-\` means that line was deleted.  

A line that starts with neither \`+\` nor \`-\` is code given for context and better understanding.  
It is not part of the diff.

[...]

EXAMPLE SUMMARY COMMENTS:

\`\`\`
* Raised the amount of returned recordings from \`10\` to \`100\`
  [packages/server/recordings_api.ts], [packages/server/constants.ts]

* Fixed a typo in the github action name
  [.github/workflows/gpt-commit-summarizer.yml]

* Moved the \`octokit\` initialization to a separate file
  [src/octokit.ts], [src/index.ts]

* Added an OpenAI API for completions
  [packages/utils/apis/openai.ts]

* Lowered numeric tolerance for test files
\`\`\`

Most commits will have less comments than this examples list.

The last comment does not include the file names,  
because there were more than two relevant files in the hypothetical commit.

Do not include parts of the example in your summary.
It is given only as example of appropriate comments.`,
     `Please summarize the following diff file: \n\n${diff}`,

    ])
    return response.response.text()
}
console.log(await summariseCommit(
    `diff --git a/package-lock.json b/package-lock.json
index 3e68d30..0e2d5f1 100644
--- a/package-lock.json
+++ b/package-lock.json
@@ -10,6 +10,7 @@
       "hasInstallScript": true,
       "dependencies": {
         "@clerk/nextjs": "^6.36.8",
+        "@google/generative-ai": "^0.24.1",
         "@hookform/resolvers": "^5.2.2",
         "@prisma/client": "^6.6.0",
         "@radix-ui/react-accordion": "^1.2.12",
@@ -80,8 +81,10 @@
         "prettier-plugin-tailwindcss": "^0.6.11",
         "prisma": "^6.6.0",
         "tailwindcss": "^4.0.15",
+        "ts-node": "^10.9.2",
+        "tsx": "^4.21.0",
         "tw-animate-css": "^1.4.0",
-        "typescript": "^5.8.2",
+        "typescript": "^5.9.3",
         "typescript-eslint": "^8.27.0"
       }
     },
@@ -209,6 +212,30 @@
         "node": ">=18.17.0"
       }
     },
+    "node_modules/@cspotcode/source-map-support": {
+      "version": "0.8.1",
+      "resolved": "https://registry.npmjs.org/@cspotcode/source-map-support/-/source-map-support-0.8.1.tgz",
+      "integrity": "sha512-IchNf6dN4tHoMFIn/7OE8LWZ19Y6q/67Bmf6vnGREv8RSbBVb9LPJxEcnwrcwX6ixSvaiGoomAUvu4YSxXrVgw==",
+      "dev": true,
+      "license": "MIT",
+      "dependencies": {
+        "@jridgewell/trace-mapping": "0.3.9"
+      },
+      "engines": {
+        "node": ">=12"
+      }
+    },
+    "node_modules/@cspotcode/source-map-support/node_modules/@jridgewell/trace-mapping": {
+      "version": "0.3.9",
+      "resolved": "https://registry.npmjs.org/@jridgewell/trace-mapping/-/trace-mapping-0.3.9.tgz",
+      "integrity": "sha512-3Belt6tdc8bPgAtbcmdtNJlirVoTmEb5e2gC94PnkwEW9jI6CAHUeoG85tjWP5WquqfavoMtMwiG4P926ZKKuQ==",
+      "dev": true,
+      "license": "MIT",
+      "dependencies": {
+        "@jridgewell/resolve-uri": "^3.0.3",
+        "@jridgewell/sourcemap-codec": "^1.4.10"
+      }
+    },
     "node_modules/@date-fns/tz": {
       "version": "1.4.1",
       "resolved": "https://registry.npmjs.org/@date-fns/tz/-/tz-1.4.1.tgz",
@@ -248,6 +275,448 @@
         "tslib": "^2.4.0"
       }
     },
+    "node_modules/@esbuild/aix-ppc64": {
+      "version": "0.27.2",
+      "resolved": "https://registry.npmjs.org/@esbuild/aix-ppc64/-/aix-ppc64-0.27.2.tgz",
+      "integrity": "sha512-GZMB+a0mOMZs4MpDbj8RJp4cw+w1WV5NYD6xzgvzUJ5Ek2jerwfO2eADyI6ExDSUED+1X8aMbegahsJi+8mgpw==",
+      "cpu": [
+        "ppc64"
+      ],
+      "dev": true,
+      "license": "MIT",
+      "optional": true,
+      "os": [
+        "aix"
+      ],
+      "engines": {
+        "node": ">=18"
+      }
+    },
+    "node_modules/@esbuild/android-arm": {
+      "version": "0.27.2",
+      "resolved": "https://registry.npmjs.org/@esbuild/android-arm/-/android-arm-0.27.2.tgz",
+      "integrity": "sha512-DVNI8jlPa7Ujbr1yjU2PfUSRtAUZPG9I1RwW4F4xFB1Imiu2on0ADiI/c3td+KmDtVKNbi+nffGDQMfcIMkwIA==",
+      "cpu": [
+        "arm"
+      ],
+      "dev": true,
+      "license": "MIT",
+      "optional": true,
+      "os": [
+        "android"
+      ],
+      "engines": {
+        "node": ">=18"
+      }
+    },
+    "node_modules/@esbuild/android-arm64": {
+      "version": "0.27.2",
+      "resolved": "https://registry.npmjs.org/@esbuild/android-arm64/-/android-arm64-0.27.2.tgz",
+      "integrity": "sha512-pvz8ZZ7ot/RBphf8fv60ljmaoydPU12VuXHImtAs0XhLLw+EXBi2BLe3OYSBslR4rryHvweW5gmkKFwTiFy6KA==",
+      "cpu": [
+        "arm64"
+      ],
+      "dev": true,
+      "license": "MIT",
+      "optional": true,
+      "os": [
+        "android"
+      ],
+      "engines": {
+        "node": ">=18"
+      }
+    },
+    "node_modules/@esbuild/android-x64": {
+      "version": "0.27.2",
+      "resolved": "https://registry.npmjs.org/@esbuild/android-x64/-/android-x64-0.27.2.tgz",
+      "integrity": "sha512-z8Ank4Byh4TJJOh4wpz8g2vDy75zFL0TlZlkUkEwYXuPSgX8yzep596n6mT7905kA9uHZsf/o2OJZubl2l3M7A==",
+      "cpu": [
+        "x64"
+      ],
+      "dev": true,
+      "license": "MIT",
+      "optional": true,
+      "os": [
+        "android"
+      ],
+      "engines": {
+        "node": ">=18"
+      }
+    },
+    "node_modules/@esbuild/darwin-arm64": {
+      "version": "0.27.2",
+      "resolved": "https://registry.npmjs.org/@esbuild/darwin-arm64/-/darwin-arm64-0.27.2.tgz",
+      "integrity": "sha512-davCD2Zc80nzDVRwXTcQP/28fiJbcOwvdolL0sOiOsbwBa72kegmVU0Wrh1MYrbuCL98Omp5dVhQFWRKR2ZAlg==",
+      "cpu": [
+        "arm64"
+      ],
+      "dev": true,
+      "license": "MIT",
+      "optional": true,
+      "os": [
+        "darwin"
+      ],
+      "engines": {
+        "node": ">=18"
+      }
+    },
+    "node_modules/@esbuild/darwin-x64": {
+      "version": "0.27.2",
+      "resolved": "https://registry.npmjs.org/@esbuild/darwin-x64/-/darwin-x64-0.27.2.tgz",
+      "integrity": "sha512-ZxtijOmlQCBWGwbVmwOF/UCzuGIbUkqB1faQRf5akQmxRJ1ujusWsb3CVfk/9iZKr2L5SMU5wPBi1UWbvL+VQA==",
+      "cpu": [
+        "x64"
+      ],
+      "dev": true,
+      "license": "MIT",
+      "optional": true,
+      "os": [
+        "darwin"
+      ],
+      "engines": {
+        "node": ">=18"
+      }
+    },
+    "node_modules/@esbuild/freebsd-arm64": {
+      "version": "0.27.2",
+      "resolved": "https://registry.npmjs.org/@esbuild/freebsd-arm64/-/freebsd-arm64-0.27.2.tgz",
+      "integrity": "sha512-lS/9CN+rgqQ9czogxlMcBMGd+l8Q3Nj1MFQwBZJyoEKI50XGxwuzznYdwcav6lpOGv5BqaZXqvBSiB/kJ5op+g==",
+      "cpu": [
+        "arm64"
+      ],
+      "dev": true,
+      "license": "MIT",
+      "optional": true,
+      "os": [
+        "freebsd"
+      ],
+      "engines": {
+        "node": ">=18"
+      }
+    },
+    "node_modules/@esbuild/freebsd-x64": {
+      "version": "0.27.2",
+      "resolved": "https://registry.npmjs.org/@esbuild/freebsd-x64/-/freebsd-x64-0.27.2.tgz",
+      "integrity": "sha512-tAfqtNYb4YgPnJlEFu4c212HYjQWSO/w/h/lQaBK7RbwGIkBOuNKQI9tqWzx7Wtp7bTPaGC6MJvWI608P3wXYA==",
+      "cpu": [
+        "x64"
+      ],
+      "dev": true,
+      "license": "MIT",
+      "optional": true,
+      "os": [
+        "freebsd"
+      ],
+      "engines": {
+        "node": ">=18"
+      }
+    },
+    "node_modules/@esbuild/linux-arm": {
+      "version": "0.27.2",
+      "resolved": "https://registry.npmjs.org/@esbuild/linux-arm/-/linux-arm-0.27.2.tgz",
+      "integrity": "sha512-vWfq4GaIMP9AIe4yj1ZUW18RDhx6EPQKjwe7n8BbIecFtCQG4CfHGaHuh7fdfq+y3LIA2vGS/o9ZBGVxIDi9hw==",
+      "cpu": [
+        "arm"
+      ],
+      "dev": true,
+      "license": "MIT",
+      "optional": true,
+      "os": [
+        "linux"
+      ],
+      "engines": {
+        "node": ">=18"
+      }
+    },
+    "node_modules/@esbuild/linux-arm64": {
+      "version": "0.27.2",
+      "resolved": "https://registry.npmjs.org/@esbuild/linux-arm64/-/linux-arm64-0.27.2.tgz",
+      "integrity": "sha512-hYxN8pr66NsCCiRFkHUAsxylNOcAQaxSSkHMMjcpx0si13t1LHFphxJZUiGwojB1a/Hd5OiPIqDdXONia6bhTw==",
+      "cpu": [
+        "arm64"
+      ],
+      "dev": true,
+      "license": "MIT",
+      "optional": true,
+      "os": [
+        "linux"
+      ],
+      "engines": {
+        "node": ">=18"
+      }
+    },
+    "node_modules/@esbuild/linux-ia32": {
+      "version": "0.27.2",
+      "resolved": "https://registry.npmjs.org/@esbuild/linux-ia32/-/linux-ia32-0.27.2.tgz",
+      "integrity": "sha512-MJt5BRRSScPDwG2hLelYhAAKh9imjHK5+NE/tvnRLbIqUWa+0E9N4WNMjmp/kXXPHZGqPLxggwVhz7QP8CTR8w==",
+      "cpu": [
+        "ia32"
+      ],
+      "dev": true,
+      "license": "MIT",
+      "optional": true,
+      "os": [
+        "linux"
+      ],
+      "engines": {
+        "node": ">=18"
+      }
+    },
+    "node_modules/@esbuild/linux-loong64": {
+      "version": "0.27.2",
+      "resolved": "https://registry.npmjs.org/@esbuild/linux-loong64/-/linux-loong64-0.27.2.tgz",
+      "integrity": "sha512-lugyF1atnAT463aO6KPshVCJK5NgRnU4yb3FUumyVz+cGvZbontBgzeGFO1nF+dPueHD367a2ZXe1NtUkAjOtg==",
+      "cpu": [
+        "loong64"
+      ],
+      "dev": true,
+      "license": "MIT",
+      "optional": true,
+      "os": [
+        "linux"
+      ],
+      "engines": {
+        "node": ">=18"
+      }
+    },
+    "node_modules/@esbuild/linux-mips64el": {
+      "version": "0.27.2",
+      "resolved": "https://registry.npmjs.org/@esbuild/linux-mips64el/-/linux-mips64el-0.27.2.tgz",
+      "integrity": "sha512-nlP2I6ArEBewvJ2gjrrkESEZkB5mIoaTswuqNFRv/WYd+ATtUpe9Y09RnJvgvdag7he0OWgEZWhviS1OTOKixw==",
+      "cpu": [
+        "mips64el"
+      ],
+      "dev": true,
+      "license": "MIT",
+      "optional": true,
+      "os": [
+        "linux"
+      ],
+      "engines": {
+        "node": ">=18"
+      }
+    },
+    "node_modules/@esbuild/linux-ppc64": {
+      "version": "0.27.2",
+      "resolved": "https://registry.npmjs.org/@esbuild/linux-ppc64/-/linux-ppc64-0.27.2.tgz",
+      "integrity": "sha512-C92gnpey7tUQONqg1n6dKVbx3vphKtTHJaNG2Ok9lGwbZil6DrfyecMsp9CrmXGQJmZ7iiVXvvZH6Ml5hL6XdQ==",
+      "cpu": [
+        "ppc64"
+      ],
+      "dev": true,
+      "license": "MIT",
+      "optional": true,
+      "os": [
+        "linux"
+      ],
+      "engines": {
+        "node": ">=18"
+      }
+    },
+    "node_modules/@esbuild/linux-riscv64": {
+      "version": "0.27.2",
+      "resolved": "https://registry.npmjs.org/@esbuild/linux-riscv64/-/linux-riscv64-0.27.2.tgz",
+      "integrity": "sha512-B5BOmojNtUyN8AXlK0QJyvjEZkWwy/FKvakkTDCziX95AowLZKR6aCDhG7LeF7uMCXEJqwa8Bejz5LTPYm8AvA==",
+      "cpu": [
+        "riscv64"
+      ],
+      "dev": true,
+      "license": "MIT",
+      "optional": true,
+      "os": [
+        "linux"
+      ],
+      "engines": {
+        "node": ">=18"
+      }
+    },
+    "node_modules/@esbuild/linux-s390x": {
+      "version": "0.27.2",
+      "resolved": "https://registry.npmjs.org/@esbuild/linux-s390x/-/linux-s390x-0.27.2.tgz",
+      "integrity": "sha512-p4bm9+wsPwup5Z8f4EpfN63qNagQ47Ua2znaqGH6bqLlmJ4bx97Y9JdqxgGZ6Y8xVTixUnEkoKSHcpRlDnNr5w==",
+      "cpu": [
+        "s390x"
+      ],
+      "dev": true,
+      "license": "MIT",
+      "optional": true,
+      "os": [
+        "linux"
+      ],
+      "engines": {
+        "node": ">=18"
+      }
+    },
+    "node_modules/@esbuild/linux-x64": {
+      "version": "0.27.2",
+      "resolved": "https://registry.npmjs.org/@esbuild/linux-x64/-/linux-x64-0.27.2.tgz",
+      "integrity": "sha512-uwp2Tip5aPmH+NRUwTcfLb+W32WXjpFejTIOWZFw/v7/KnpCDKG66u4DLcurQpiYTiYwQ9B7KOeMJvLCu/OvbA==",
+      "cpu": [
+        "x64"
+      ],
+      "dev": true,
+      "license": "MIT",
+      "optional": true,
+      "os": [
+        "linux"
+      ],
+      "engines": {
+        "node": ">=18"
+      }
+    },
+    "node_modules/@esbuild/netbsd-arm64": {
+      "version": "0.27.2",
+      "resolved": "https://registry.npmjs.org/@esbuild/netbsd-arm64/-/netbsd-arm64-0.27.2.tgz",
+      "integrity": "sha512-Kj6DiBlwXrPsCRDeRvGAUb/LNrBASrfqAIok+xB0LxK8CHqxZ037viF13ugfsIpePH93mX7xfJp97cyDuTZ3cw==",
+      "cpu": [
+        "arm64"
+      ],
+      "dev": true,
+      "license": "MIT",
+      "optional": true,
+      "os": [
+        "netbsd"
+      ],
+      "engines": {
+        "node": ">=18"
+      }
+    },
+    "node_modules/@esbuild/netbsd-x64": {
+      "version": "0.27.2",
+      "resolved": "https://registry.npmjs.org/@esbuild/netbsd-x64/-/netbsd-x64-0.27.2.tgz",
+      "integrity": "sha512-HwGDZ0VLVBY3Y+Nw0JexZy9o/nUAWq9MlV7cahpaXKW6TOzfVno3y3/M8Ga8u8Yr7GldLOov27xiCnqRZf0tCA==",
+      "cpu": [
+        "x64"
+      ],
+      "dev": true,
+      "license": "MIT",
+      "optional": true,
+      "os": [
+        "netbsd"
+      ],
+      "engines": {
+        "node": ">=18"
+      }
+    },
+    "node_modules/@esbuild/openbsd-arm64": {
+      "version": "0.27.2",
+      "resolved": "https://registry.npmjs.org/@esbuild/openbsd-arm64/-/openbsd-arm64-0.27.2.tgz",
+      "integrity": "sha512-DNIHH2BPQ5551A7oSHD0CKbwIA/Ox7+78/AWkbS5QoRzaqlev2uFayfSxq68EkonB+IKjiuxBFoV8ESJy8bOHA==",
+      "cpu": [
+        "arm64"
+      ],
+      "dev": true,
+      "license": "MIT",
+      "optional": true,
+      "os": [
+        "openbsd"
+      ],
+      "engines": {
+        "node": ">=18"
+      }
+    },
+    "node_modules/@esbuild/openbsd-x64": {
+      "version": "0.27.2",
+      "resolved": "https://registry.npmjs.org/@esbuild/openbsd-x64/-/openbsd-x64-0.27.2.tgz",
+      "integrity": "sha512-/it7w9Nb7+0KFIzjalNJVR5bOzA9Vay+yIPLVHfIQYG/j+j9VTH84aNB8ExGKPU4AzfaEvN9/V4HV+F+vo8OEg==",
+      "cpu": [
+        "x64"
+      ],
+      "dev": true,
+      "license": "MIT",
+      "optional": true,
+      "os": [
+        "openbsd"
+      ],
+      "engines": {
+        "node": ">=18"
+      }
+    },
+    "node_modules/@esbuild/openharmony-arm64": {
+      "version": "0.27.2",
+      "resolved": "https://registry.npmjs.org/@esbuild/openharmony-arm64/-/openharmony-arm64-0.27.2.tgz",
+      "integrity": "sha512-LRBbCmiU51IXfeXk59csuX/aSaToeG7w48nMwA6049Y4J4+VbWALAuXcs+qcD04rHDuSCSRKdmY63sruDS5qag==",
+      "cpu": [
+        "arm64"
+      ],
+      "dev": true,
+      "license": "MIT",
+      "optional": true,
+      "os": [
+        "openharmony"
+      ],
+      "engines": {
+        "node": ">=18"
+      }
+    },
+    "node_modules/@esbuild/sunos-x64": {
+      "version": "0.27.2",
+      "resolved": "https://registry.npmjs.org/@esbuild/sunos-x64/-/sunos-x64-0.27.2.tgz",
+      "integrity": "sha512-kMtx1yqJHTmqaqHPAzKCAkDaKsffmXkPHThSfRwZGyuqyIeBvf08KSsYXl+abf5HDAPMJIPnbBfXvP2ZC2TfHg==",
+      "cpu": [
+        "x64"
+      ],
+      "dev": true,
+      "license": "MIT",
+      "optional": true,
+      "os": [
+        "sunos"
+      ],
+      "engines": {
+        "node": ">=18"
+      }
+    },
+    "node_modules/@esbuild/win32-arm64": {
+      "version": "0.27.2",
+      "resolved": "https://registry.npmjs.org/@esbuild/win32-arm64/-/win32-arm64-0.27.2.tgz",
+      "integrity": "sha512-Yaf78O/B3Kkh+nKABUF++bvJv5Ijoy9AN1ww904rOXZFLWVc5OLOfL56W+C8F9xn5JQZa3UX6m+IktJnIb1Jjg==",
+      "cpu": [
+        "arm64"
+      ],
+      "dev": true,
+      "license": "MIT",
+      "optional": true,
+      "os": [
+        "win32"
+      ],
+      "engines": {
+        "node": ">=18"
+      }
+    },
+    "node_modules/@esbuild/win32-ia32": {
+      "version": "0.27.2",
+      "resolved": "https://registry.npmjs.org/@esbuild/win32-ia32/-/win32-ia32-0.27.2.tgz",
+      "integrity": "sha512-Iuws0kxo4yusk7sw70Xa2E2imZU5HoixzxfGCdxwBdhiDgt9vX9VUCBhqcwY7/uh//78A1hMkkROMJq9l27oLQ==",
+      "cpu": [
+        "ia32"
+      ],
+      "dev": true,
+      "license": "MIT",
+      "optional": true,
+      "os": [
+        "win32"
+      ],
+      "engines": {
+        "node": ">=18"
+      }
+    },
+    "node_modules/@esbuild/win32-x64": {
+      "version": "0.27.2",
+      "resolved": "https://registry.npmjs.org/@esbuild/win32-x64/-/win32-x64-0.27.2.tgz",
+      "integrity": "sha512-sRdU18mcKf7F+YgheI/zGf5alZatMUTKj/jNS6l744f9u3WFu4v7twcUI9vu4mknF4Y9aDlblIie0IM+5xxaqQ==",
+      "cpu": [
+        "x64"
+      ],
+      "dev": true,
+      "license": "MIT",
+      "optional": true,
+      "os": [
+        "win32"
+      ],
+      "engines": {
+        "node": ">=18"
+      }
+    },
     "node_modules/@eslint-community/eslint-utils": {
       "version": "4.9.1",
       "resolved": "https://registry.npmjs.org/@eslint-community/eslint-utils/-/eslint-utils-4.9.1.tgz",
@@ -430,6 +899,15 @@
       "integrity": "sha512-aGTxbpbg8/b5JfU1HXSrbH3wXZuLPJcNEcZQFMxLs3oSzgtVu6nFPkbbGGUvBcUjKV2YyB9Wxxabo+HEH9tcRQ==",
       "license": "MIT"
     },
+    "node_modules/@google/generative-ai": {
+      "version": "0.24.1",
+      "resolved": "https://registry.npmjs.org/@google/generative-ai/-/generative-ai-0.24.1.tgz",
+      "integrity": "sha512-MqO+MLfM6kjxcKoy0p1wRzG3b4ZZXtPI+z2IE26UogS2Cm/XHO+7gGRBh6gcJsOiIVoH93UwKvW4HdgiOZCy9Q==",
+      "license": "Apache-2.0",
+      "engines": {
+        "node": ">=18.0.0"
+      }
+    },
     "node_modules/@hookform/resolvers": {
       "version": "5.2.2",
       "resolved": "https://registry.npmjs.org/@hookform/resolvers/-/resolvers-5.2.2.tgz",
@@ -3678,6 +4156,34 @@
         "typescript": ">=5.7.2"
       }
     },
+    "node_modules/@tsconfig/node10": {
+      "version": "1.0.12",
+      "resolved": "https://registry.npmjs.org/@tsconfig/node10/-/node10-1.0.12.tgz",
+      "integrity": "sha512-UCYBaeFvM11aU2y3YPZ//O5Rhj+xKyzy7mvcIoAjASbigy8mHMryP5cK7dgjlz2hWxh1g5pLw084E0a/wlUSFQ==",
+      "dev": true,
+      "license": "MIT"
+    },
+    "node_modules/@tsconfig/node12": {
+      "version": "1.0.11",
+      "resolved": "https://registry.npmjs.org/@tsconfig/node12/-/node12-1.0.11.tgz",
+      "integrity": "sha512-cqefuRsh12pWyGsIoBKJA9luFu3mRxCA+ORZvA4ktLSzIuCUtWVxGIuXigEwO5/ywWFMZ2QEGKWvkZG1zDMTag==",
+      "dev": true,
+      "license": "MIT"
+    },
+    "node_modules/@tsconfig/node14": {
+      "version": "1.0.3",
+      "resolved": "https://registry.npmjs.org/@tsconfig/node14/-/node14-1.0.3.tgz",
+      "integrity": "sha512-ysT8mhdixWK6Hw3i1V2AeRqZ5WfXg1G43mqoYlM2nc6388Fq5jcXyr5mRsqViLx/GJYdoL0bfXD8nmF+Zn/Iow==",
+      "dev": true,
+      "license": "MIT"
+    },
+    "node_modules/@tsconfig/node16": {
+      "version": "1.0.4",
+      "resolved": "https://registry.npmjs.org/@tsconfig/node16/-/node16-1.0.4.tgz",
+      "integrity": "sha512-vxhUy4J8lyeyinH7Azl1pdd43GJhZH/tP2weN8TntQblOY+A0XbT8DJk1/oCPuOOyg/Ja757rG0CgHcWC8OfMA==",
+      "dev": true,
+      "license": "MIT"
+    },
     "node_modules/@tybys/wasm-util": {
       "version": "0.10.1",
       "resolved": "https://registry.npmjs.org/@tybys/wasm-util/-/wasm-util-0.10.1.tgz",
@@ -4357,6 +4863,19 @@
         "acorn": "^6.0.0 || ^7.0.0 || ^8.0.0"
       }
     },
+    "node_modules/acorn-walk": {
+      "version": "8.3.4",
+      "resolved": "https://registry.npmjs.org/acorn-walk/-/acorn-walk-8.3.4.tgz",
+      "integrity": "sha512-ueEepnujpqee2o5aIYnvHU6C0A42MNdsIDeqy5BydrkuC5R1ZuUFnm27EeFJGoEHJQgn3uleRvmTXaJgfXbt4g==",
+      "dev": true,
+      "license": "MIT",
+      "dependencies": {
+        "acorn": "^8.11.0"
+      },
+      "engines": {
+        "node": ">=0.4.0"
+      }
+    },
     "node_modules/ajv": {
       "version": "6.12.6",
       "resolved": "https://registry.npmjs.org/ajv/-/ajv-6.12.6.tgz",
@@ -4390,6 +4909,13 @@
         "url": "https://github.com/chalk/ansi-styles?sponsor=1"
       }
     },
+    "node_modules/arg": {
+      "version": "4.1.3",
+      "resolved": "https://registry.npmjs.org/arg/-/arg-4.1.3.tgz",
+      "integrity": "sha512-58S9QDqG0Xx27YwPSt9fJxivjYl432YCwfDMfZ+71RAqUrZef7LrKQZ3LHLOwCS4FLNBplP533Zx895SeOCHvA==",
+      "dev": true,
+      "license": "MIT"
+    },
     "node_modules/argparse": {
       "version": "2.0.1",
       "resolved": "https://registry.npmjs.org/argparse/-/argparse-2.0.1.tgz",
@@ -4929,6 +5455,13 @@
         "url": "https://github.com/sponsors/mesqueeb"
       }
     },
+    "node_modules/create-require": {
+      "version": "1.1.1",
+      "resolved": "https://registry.npmjs.org/create-require/-/create-require-1.1.1.tgz",
+      "integrity": "sha512-dcKFX3jn0MpIaXjisoRvexIJVEKzaq7z2rZKxf+MSr9TkdmHmsU4m2lcLojrj/FHl8mk5VxMmYA+ftRkP/3oKQ==",
+      "dev": true,
+      "license": "MIT"
+    },
     "node_modules/cross-spawn": {
       "version": "7.0.6",
       "resolved": "https://registry.npmjs.org/cross-spawn/-/cross-spawn-7.0.6.tgz",
@@ -5264,6 +5797,16 @@
       "integrity": "sha512-ypdmJU/TbBby2Dxibuv7ZLW3Bs1QEmM7nHjEANfohJLvE0XVujisn1qPJcZxg+qDucsr+bP6fLD1rPS3AhJ7EQ==",
       "license": "MIT"
     },
+    "node_modules/diff": {
+      "version": "4.0.4",
+      "resolved": "https://registry.npmjs.org/diff/-/diff-4.0.4.tgz",
+      "integrity": "sha512-X07nttJQkwkfKfvTPG/KSnE2OMdcUCao6+eXF3wmnIQRn2aPAHH3VxDbDOdegkd6JbPsXqShpvEOHfAT+nCNwQ==",
+      "dev": true,
+      "license": "BSD-3-Clause",
+      "engines": {
+        "node": ">=0.3.1"
+      }
+    },
     "node_modules/doctrine": {
       "version": "2.1.0",
       "resolved": "https://registry.npmjs.org/doctrine/-/doctrine-2.1.0.tgz",
@@ -5562,6 +6105,48 @@
         "url": "https://github.com/sponsors/ljharb"
       }
     },
+    "node_modules/esbuild": {
+      "version": "0.27.2",
+      "resolved": "https://registry.npmjs.org/esbuild/-/esbuild-0.27.2.tgz",
+      "integrity": "sha512-HyNQImnsOC7X9PMNaCIeAm4ISCQXs5a5YasTXVliKv4uuBo1dKrG0A+uQS8M5eXjVMnLg3WgXaKvprHlFJQffw==",
+      "dev": true,
+      "hasInstallScript": true,
+      "license": "MIT",
+      "bin": {
+        "esbuild": "bin/esbuild"
+      },
+      "engines": {
+        "node": ">=18"
+      },
+      "optionalDependencies": {
+        "@esbuild/aix-ppc64": "0.27.2",
+        "@esbuild/android-arm": "0.27.2",
+        "@esbuild/android-arm64": "0.27.2",
+        "@esbuild/android-x64": "0.27.2",
+        "@esbuild/darwin-arm64": "0.27.2",
+        "@esbuild/darwin-x64": "0.27.2",
+        "@esbuild/freebsd-arm64": "0.27.2",
+        "@esbuild/freebsd-x64": "0.27.2",
+        "@esbuild/linux-arm": "0.27.2",
+        "@esbuild/linux-arm64": "0.27.2",
+        "@esbuild/linux-ia32": "0.27.2",
+        "@esbuild/linux-loong64": "0.27.2",
+        "@esbuild/linux-mips64el": "0.27.2",
+        "@esbuild/linux-ppc64": "0.27.2",
+        "@esbuild/linux-riscv64": "0.27.2",
+        "@esbuild/linux-s390x": "0.27.2",
+        "@esbuild/linux-x64": "0.27.2",
+        "@esbuild/netbsd-arm64": "0.27.2",
+        "@esbuild/netbsd-x64": "0.27.2",
+        "@esbuild/openbsd-arm64": "0.27.2",
+        "@esbuild/openbsd-x64": "0.27.2",
+        "@esbuild/openharmony-arm64": "0.27.2",
+        "@esbuild/sunos-x64": "0.27.2",
+        "@esbuild/win32-arm64": "0.27.2",
+        "@esbuild/win32-ia32": "0.27.2",
+        "@esbuild/win32-x64": "0.27.2"
+      }
+    },
     "node_modules/escape-string-regexp": {
       "version": "4.0.0",
       "resolved": "https://registry.npmjs.org/escape-string-regexp/-/escape-string-regexp-4.0.0.tgz",
@@ -6208,6 +6793,21 @@
         "url": "https://github.com/sponsors/ljharb"
       }
     },
+    "node_modules/fsevents": {
+      "version": "2.3.3",
+      "resolved": "https://registry.npmjs.org/fsevents/-/fsevents-2.3.3.tgz",
+      "integrity": "sha512-5xoDfX+fL7faATnagmWPpbFtwh/R77WmMMqqHGS65C3vvB0YHrgF+B1YmZ3441tMj5n63k0212XNoJwzlhffQw==",
+      "dev": true,
+      "hasInstallScript": true,
+      "license": "MIT",
+      "optional": true,
+      "os": [
+        "darwin"
+      ],
+      "engines": {
+        "node": "^8.16.0 || ^10.6.0 || >=11.0.0"
+      }
+    },
     "node_modules/function-bind": {
       "version": "1.1.2",
       "resolved": "https://registry.npmjs.org/function-bind/-/function-bind-1.1.2.tgz",
@@ -7495,6 +8095,13 @@
         "@jridgewell/sourcemap-codec": "^1.5.5"
       }
     },
+    "node_modules/make-error": {
+      "version": "1.3.6",
+      "resolved": "https://registry.npmjs.org/make-error/-/make-error-1.3.6.tgz",
+      "integrity": "sha512-s8UhlNe7vPKomQhC1qFelMokr/Sc3AgNbso3n74mVPA5LTZwkB9NlXf4XPamLxJE8h0gh73rM94xvwRT2CVInw==",
+      "dev": true,
+      "license": "ISC"
+    },
     "node_modules/math-intrinsics": {
       "version": "1.1.0",
       "resolved": "https://registry.npmjs.org/math-intrinsics/-/math-intrinsics-1.1.0.tgz",
@@ -9289,6 +9896,50 @@
         "typescript": ">=4.8.4"
       }
     },
+    "node_modules/ts-node": {
+      "version": "10.9.2",
+      "resolved": "https://registry.npmjs.org/ts-node/-/ts-node-10.9.2.tgz",
+      "integrity": "sha512-f0FFpIdcHgn8zcPSbf1dRevwt047YMnaiJM3u2w2RewrB+fob/zePZcrOyQoLMMO7aBIddLcQIEK5dYjkLnGrQ==",
+      "dev": true,
+      "license": "MIT",
+      "dependencies": {
+        "@cspotcode/source-map-support": "^0.8.0",
+        "@tsconfig/node10": "^1.0.7",
+        "@tsconfig/node12": "^1.0.7",
+        "@tsconfig/node14": "^1.0.0",
+        "@tsconfig/node16": "^1.0.2",
+        "acorn": "^8.4.1",
+        "acorn-walk": "^8.1.1",
+        "arg": "^4.1.0",
+        "create-require": "^1.1.0",
+        "diff": "^4.0.1",
+        "make-error": "^1.1.1",
+        "v8-compile-cache-lib": "^3.0.1",
+        "yn": "3.1.1"
+      },
+      "bin": {
+        "ts-node": "dist/bin.js",
+        "ts-node-cwd": "dist/bin-cwd.js",
+        "ts-node-esm": "dist/bin-esm.js",
+        "ts-node-script": "dist/bin-script.js",
+        "ts-node-transpile-only": "dist/bin-transpile.js",
+        "ts-script": "dist/bin-script-deprecated.js"
+      },
+      "peerDependencies": {
+        "@swc/core": ">=1.2.50",
+        "@swc/wasm": ">=1.2.50",
+        "@types/node": "*",
+        "typescript": ">=2.7"
+      },
+      "peerDependenciesMeta": {
+        "@swc/core": {
+          "optional": true
+        },
+        "@swc/wasm": {
+          "optional": true
+        }
+      }
+    },
     "node_modules/tsconfig-paths": {
       "version": "3.15.0",
       "resolved": "https://registry.npmjs.org/tsconfig-paths/-/tsconfig-paths-3.15.0.tgz",
@@ -9308,6 +9959,26 @@
       "integrity": "sha512-oJFu94HQb+KVduSUQL7wnpmqnfmLsOA/nAh6b6EH0wCEoK0/mPeXU6c3wKDV83MkOuHPRHtSXKKU99IBazS/2w==",
       "license": "0BSD"
     },
+    "node_modules/tsx": {
+      "version": "4.21.0",
+      "resolved": "https://registry.npmjs.org/tsx/-/tsx-4.21.0.tgz",
+      "integrity": "sha512-5C1sg4USs1lfG0GFb2RLXsdpXqBSEhAaA/0kPL01wxzpMqLILNxIxIOKiILz+cdg/pLnOUxFYOR5yhHU666wbw==",
+      "dev": true,
+      "license": "MIT",
+      "dependencies": {
+        "esbuild": "~0.27.0",
+        "get-tsconfig": "^4.7.5"
+      },
+      "bin": {
+        "tsx": "dist/cli.mjs"
+      },
+      "engines": {
+        "node": ">=18.0.0"
+      },
+      "optionalDependencies": {
+        "fsevents": "~2.3.3"
+      }
+    },
     "node_modules/tw-animate-css": {
       "version": "1.4.0",
       "resolved": "https://registry.npmjs.org/tw-animate-css/-/tw-animate-css-1.4.0.tgz",
@@ -9596,6 +10267,13 @@
         "react": "^16.8.0  || ^17 || ^18 || ^19 || ^19.0.0-rc"
       }
     },
+    "node_modules/v8-compile-cache-lib": {
+      "version": "3.0.1",
+      "resolved": "https://registry.npmjs.org/v8-compile-cache-lib/-/v8-compile-cache-lib-3.0.1.tgz",
+      "integrity": "sha512-wa7YjyUGfNZngI/vtK0UHAN+lgDCxBPCylVXGp0zu59Fz5aiGtNXaq3DhIov063MorB+VfufLh3JlF2KdTK3xg==",
+      "dev": true,
+      "license": "MIT"
+    },
     "node_modules/vaul": {
       "version": "1.1.2",
       "resolved": "https://registry.npmjs.org/vaul/-/vaul-1.1.2.tgz",
@@ -9746,6 +10424,16 @@
         "node": ">=0.10.0"
       }
     },
+    "node_modules/yn": {
+      "version": "3.1.1",
+      "resolved": "https://registry.npmjs.org/yn/-/yn-3.1.1.tgz",
+      "integrity": "sha512-Ux4ygGWsu2c7isFWe8Yu1YluJmqVhxqK2cLXNQA5AcC3QfbGNpM7fu0Y8b/z16pXLnFxZYvWhd3fhBY9DLmC6Q==",
+      "dev": true,
+      "license": "MIT",
+      "engines": {
+        "node": ">=6"
+      }
+    },
     "node_modules/yocto-queue": {
       "version": "0.1.0",
       "resolved": "https://registry.npmjs.org/yocto-queue/-/yocto-queue-0.1.0.tgz",
diff --git a/package.json b/package.json
index 8ed3ed3..57d3021 100644
--- a/package.json
+++ b/package.json
@@ -22,6 +22,7 @@
   },
   "dependencies": {
     "@clerk/nextjs": "^6.36.8",
+    "@google/generative-ai": "^0.24.1",
     "@hookform/resolvers": "^5.2.2",
     "@prisma/client": "^6.6.0",
     "@radix-ui/react-accordion": "^1.2.12",
@@ -92,8 +93,10 @@
     "prettier-plugin-tailwindcss": "^0.6.11",
     "prisma": "^6.6.0",
     "tailwindcss": "^4.0.15",
+    "ts-node": "^10.9.2",
+    "tsx": "^4.21.0",
     "tw-animate-css": "^1.4.0",
-    "typescript": "^5.8.2",
+    "typescript": "^5.9.3",
     "typescript-eslint": "^8.27.0"
   },
   "ct3aMetadata": {
diff --git a/src/app/(protected)/dashboard/page.tsx b/src/app/(protected)/dashboard/page.tsx
index 3cd146f..fcfe3ca 100644
--- a/src/app/(protected)/dashboard/page.tsx
+++ b/src/app/(protected)/dashboard/page.tsx
@@ -11,6 +11,7 @@ const DashboardPage = () => {
 
   return (
     <div>
+      {project?.id}
       <div className="flex items-center justify-between flex-wrap gap-y-4">
         <div className="w-fit rounded-md bg-primary px-4 py-3">
           <div className="flex items-center">
diff --git a/src/lib/github.js b/src/lib/github.js
new file mode 100644
index 0000000..51b6e46
--- /dev/null
+++ b/src/lib/github.js
@@ -0,0 +1,61 @@
+"use strict";
+var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
+    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
+    return new (P || (P = Promise))(function (resolve, reject) {
+        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
+        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
+        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
+        step((generator = generator.apply(thisArg, _arguments || [])).next());
+    });
+};
+var __generator = (this && this.__generator) || function (thisArg, body) {
+    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
+    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
+    function verb(n) { return function (v) { return step([n, v]); }; }
+    function step(op) {
+        if (f) throw new TypeError("Generator is already executing.");
+        while (g && (g = 0, op[0] && (_ = 0)), _) try {
+            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
+            if (y = 0, t) op = [op[0] & 2, t.value];
+            switch (op[0]) {
+                case 0: case 1: t = op; break;
+                case 4: _.label++; return { value: op[1], done: false };
+                case 5: _.label++; y = op[1]; op = [0]; continue;
+                case 7: op = _.ops.pop(); _.trys.pop(); continue;
+                default:
+                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
+                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
+                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
+                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
+                    if (t[2]) _.ops.pop();
+                    _.trys.pop(); continue;
+            }
+            op = body.call(thisArg, _);
+        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
+        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
+    }
+};
+Object.defineProperty(exports, "__esModule", { value: true });
+exports.getCommitHashes = exports.octokit = void 0;
+var octokit_1 = require("octokit");
+exports.octokit = new octokit_1.Octokit({
+    auth: process.env.GITHUB_TOKEN,
+});
+var githubUrl = 'https://github.com/Vinothini0406/Git-main.git';
+var getCommitHashes = function (githubUrl) { return __awaiter(void 0, void 0, void 0, function () {
+    var data;
+    return __generator(this, function (_a) {
+        switch (_a.label) {
+            case 0: return [4 /*yield*/, exports.octokit.rest.repos.listCommits({
+                    owner: 'Vinothini0406',
+                    repo: 'Git-main',
+                })];
+            case 1:
+                data = (_a.sent()).data;
+                console.log(data);
+                return [2 /*return*/];
+        }
+    });
+}); };
+exports.getCommitHashes = getCommitHashes;
+(0, exports.getCommitHashes)(githubUrl);
diff --git a/src/lib/github.ts b/src/lib/github.ts
index e37f2d1..9a9a0e4 100644
--- a/src/lib/github.ts
+++ b/src/lib/github.ts
@@ -1,6 +1,164 @@
-import {Octokit } from "octokit"
+// import "dotenv/config";
+// import { db } from "@/server/db";
+// import {Octokit } from "octokit"
+// import { string } from "zod";
+
+
+
+// export const octokit = new Octokit({
+//     auth: process.env.GITHUB_TOKEN,
+// })
+
+
+// const githubUrl='https://github.com/Vinothini0406/Git-main'
+
+
+// type Response={
+//     commitHash: string;
+//     commitMessage: string;
+//     commitAuthorName: string;
+//     commitAuthorAvatar: string;
+//     commitDate: string;
+// }
+// export const getCommitHashes  = async (githubUrl: string): Promise <Response[]> => {
+//     const [owner,repo] = githubUrl.split('/').slice(-2)
+//     if(!owner || !repo){
+//         throw new Error("Invalid GitHub URL");
+//     }
+//      const {data} = await octokit.rest.repos.listCommits({
+//         owner,
+//         repo
+//      });
+//      const sortedCommits = data.sort((a: any, b: any) => new Date(b.commit.author.date).getTime() - new Date(a.commit.author.date).getTime()) as any[];
+//      return sortedCommits.slice(0,10).map((commit: any) => ({
+//         commitHash: commit.sha as string,
+//         commitMessage: commit.commit.message ?? "",
+//         commitAuthorName: commit.commit?.author?.name ?? "",
+//         commitAuthorAvatar: commit?.author?.avatar_url ?? "",
+//         commitDate: commit.commit?.author?.date ?? "",
+//      }));
+// }
+
+// export const pollCommits = async (projectId : string) =>{
+//     const {project, githubUrl} = await fetchProjectGithubUrl(projectId);
+//     const commitHashes = await getCommitHashes(githubUrl);
+//     const unprocessedCommits = await filterUnprocessedCommits(projectId, commitHashes);
+//     return unprocessedCommits
+// }
+
+// async function summariseCommit(githubUrl: string, commitHash: string){
+
+// } 
+
+// async function fetchProjectGithubUrl(projectId: string){
+//      const project = await db.project.findUnique({
+//         where: {id: projectId},
+//         select: {
+//             githubUrl: true
+//         },
+//      })
+//      if(!project?.githubUrl){
+//         throw new Error("Project has no GitHub URL");
+//      }
+//      return {project, githubUrl: project?.githubUrl};
+// }
+
+// async function filterUnprocessedCommits(projectId: string, commitHashes: Response[]){
+//     const processedCommits = await db.commit.findMany({
+//         where: {
+//             projectId: projectId,
+
+//         }
+//     });
+//     const unprocessedCommits = commitHashes.filter(commit => !processedCommits.some((processesCommit)=> processesCommit.commitHash === commit.commitHash));
+//     return unprocessedCommits;
+// }
+// await pollCommits('cml26412p0000j7a4zjesjc4z').then(console.log)
+
+import "dotenv/config"
+import { db } from "@/server/db"
+import { Octokit } from "octokit"
 
 export const octokit = new Octokit({
-    auth: process.env.GITHUB_TOKEN,
+  auth: process.env.GITHUB_TOKEN,
 })
 
+type Response = {
+  commitHash: string
+  commitMessage: string
+  commitAuthorName: string
+  commitAuthorAvatar: string
+  commitDate: string
+}
+
+function normalizeGithubUrl(url: string) {
+  return url
+    .replace("https://github.com/", "")
+    .replace(".git", "")
+    .replace(/\/$/, "")
+}
+
+export const getCommitHashes = async (
+  githubUrl: string
+): Promise<Response[]> => {
+  const normalized = normalizeGithubUrl(githubUrl)
+  const [owner, repo] = normalized.split("/")
+
+  if (!owner || !repo) {
+    throw new Error("Invalid GitHub URL")
+  }
+
+  const { data } = await octokit.rest.repos.listCommits({
+    owner,
+    repo,
+    per_page: 10,
+  })
+
+  return data.map((commit) => ({
+    commitHash: commit.sha,
+    commitMessage: commit.commit.message ?? "",
+    commitAuthorName: commit.commit.author?.name ?? "",
+    commitAuthorAvatar: commit.author?.avatar_url ?? "",
+    commitDate: commit.commit.author?.date ?? "",
+  }))
+}
+
+export const pollCommits = async (projectId: string) => {
+  const { githubUrl } = await fetchProjectGithubUrl(projectId)
+  const commits = await getCommitHashes(githubUrl)
+  const unprocessed = await filterUnprocessedCommits(projectId, commits)
+  return unprocessed
+}
+
+async function fetchProjectGithubUrl(projectId: string) {
+  const project = await db.project.findUnique({
+    where: { id: projectId },
+    select: { githubUrl: true },
+  })
+
+  if (!project?.githubUrl) {
+    throw new Error("Project has no GitHub URL")
+  }
+
+  return { githubUrl: project.githubUrl }
+}
+
+async function filterUnprocessedCommits(
+  projectId: string,
+  commits: Response[]
+) {
+  const processed = await db.commit.findMany({
+    where: { projectId },
+    select: { commitHash: true },
+  })
+
+  return commits.filter(
+    (commit) =>
+      !processed.some(
+        (processedCommit) =>
+          processedCommit.commitHash === commit.commitHash
+      )
+  )
+}
+
+await pollCommits("cml26412p0000j7a4zjesjc4z").then(console.log)`
))