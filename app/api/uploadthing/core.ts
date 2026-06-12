import { createUploadthing, type FileRouter } from "uploadthing/next"
import { UploadThingError } from "uploadthing/server"

const f = createUploadthing()

export const ourFileRouter = {
  resumeUploader: f({
    pdf: { maxFileSize: "4MB" }
  })
    .middleware(async () => {
      return { userId: "placeholder_01" }
    })
    .onUploadComplete(async ({ metadata, file }) => {
      console.log("Upload complete for:", metadata.userId)
      console.log("File URL:", file.ufsUrl)
      return { uploadedBy: metadata.userId, url: file.ufsUrl }
    }),
} satisfies FileRouter

export type OurFileRouter = typeof ourFileRouter