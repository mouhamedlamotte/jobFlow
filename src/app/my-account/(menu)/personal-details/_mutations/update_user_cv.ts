"use server"

import { actionClient } from "@/server/safe-action"
import { z } from "zod"
import prisma from "@/prisma"
import { auth } from "@/server/auth"
import { revalidateTag, unstable_cache } from "next/cache"
import { put } from "@vercel/blob"

// export const getCvByUserId = unstable_cache(
//   async (userId?: string) => {
//     if (!userId) return null;

// )

export const addUserCV = actionClient
  .schema(z.instanceof(FormData))
  .action(async (formData) => {
  const session = await auth()
  if (!session?.user.id) {
    throw new Error("Unauthorized")
  }


  try {
    const file = formData.clientInput.get("file") as File
    if (!file) {
      throw new Error("No file provided")
    }
    const fileData = await file.arrayBuffer().then((buffer) => {
      const base64 = Buffer.from(buffer).toString("base64");
      return base64;
    });

    // Convert base64 file data to a Buffer
    const binaryData = Buffer.from(fileData, "base64");

    // Upload the file to Vercel Blob
    const { url : cv_url } = await put(`cvs/$${session.user.id}-${file.name}`, binaryData, {
      access: "public",
    });

    // Here you would typically upload the file to a storage service
    // and get back a URL. For this example, we'll use a placeholder URL.

    const newCV = await prisma.userCV.create({
      data: {
        cv_filename: file.name,
        cv_url,
        userId: formData.clientInput.get("userId") as string,
      },
    })
    revalidateTag("myAccount.getUserCv");
    return { success: true, cv: newCV }
  } catch (error) {
    throw new Error("Une erreur est survenue lors de l'ajout du CV.")
  }
})

const RemoveUserCVSchema = z.object({
  id: z.string(),
})

export const removeUserCV = actionClient.schema(RemoveUserCVSchema).action(async ({ parsedInput: { id } }) => {
  const session = await auth()
  if (!session?.user.id) {
    throw new Error("Unauthorized")
  }

  try {
    await prisma.userCV.delete({
      where: {
        id,
        userId: session.user.id,
      },
    })
    revalidateTag("myAccount.getUserCv");
    return { success: true, id }
  } catch (error) {
    throw new Error("Une erreur est survenue lors de la suppression du CV.")
  }
})

const SetUserCVPrimarySchema = z.object({
  id: z.string(),
})

export const setUserCVPrimary = actionClient.schema(SetUserCVPrimarySchema).action(async ({ parsedInput: { id } }) => {
  const session = await auth()
  if (!session?.user.id) {
    throw new Error("Unauthorized")
  }

  try {
    await prisma.$transaction([
      prisma.userCV.updateMany({
        where: { userId: session.user.id },
        data: { primary: false },
      }),
      prisma.userCV.update({
        where: {
          id,
          userId: session.user.id,
        },
        data: { primary: true },
      }),
    ])
    revalidateTag("myAccount.getUserCv")
    return { success: true, id }
  } catch (error) {
    throw new Error("une erreur est survenue lors de la mise à jour du CV.")
  }
})

