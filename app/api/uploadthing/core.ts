import { createUploadthing, type FileRouter } from "uploadthing/next"
import { UploadThingError } from "uploadthing/server"
import { auth } from "@clerk/nextjs/server"

const f = createUploadthing()

export const ourFileRouter = {
  resumeUploader: f({
    pdf: { maxFileSize: "4MB" }
  })
    .middleware(async () => {
      const { userId } = await auth()

      if (!userId) throw new UploadThingError("Unauthorised")

      return { userId }
    })
    .onUploadComplete(async ({ metadata, file }) => {
      console.log("Upload complete for:", metadata.userId)
      console.log("File URL:", file.ufsUrl)
      return { uploadedBy: metadata.userId, url: file.ufsUrl }
    }),
} satisfies FileRouter

export type OurFileRouter = typeof ourFileRouter