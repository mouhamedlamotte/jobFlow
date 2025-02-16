"use server"

import { actionClient } from "@/server/safe-action"
import { z } from "zod"
import prisma from "@/prisma"
import { auth } from "@/server/auth"
import { UserLinksType } from "@prisma/client"

const AddUserLinkSchema = z.object({
  name: z.nativeEnum(UserLinksType),
  url: z.string().url(),
})

export const addUserLink = actionClient.schema(AddUserLinkSchema).action(async ({ parsedInput: { name, url } }) => {
  const session = await auth()
  if (!session?.user.id) {
    throw new Error("Unauthorized")
  }

  try {
    const newLink = await prisma.userLinks.create({
      data: {
        name,
        url,
        userId: session.user.id,
      },
    })

    return { success: true, link: newLink }
  } catch (error) {
    console.error("Failed to add user link:", error)
    throw new Error("Failed to add user link. Please try again.")
  }
})

const RemoveUserLinkSchema = z.object({
  id: z.string(),
})

export const removeUserLink = actionClient.schema(RemoveUserLinkSchema).action(async ({ parsedInput: { id } }) => {
  const session = await auth()
  if (!session?.user.id) {
    throw new Error("Unauthorized")
  }

  try {
    await prisma.userLinks.delete({
      where: {
        id,
        userId: session.user.id,
      },
    })

    return { success: true, id }
  } catch (error) {
    console.error("Failed to remove user link:", error)
    throw new Error("Failed to remove user link. Please try again.")
  }
})

