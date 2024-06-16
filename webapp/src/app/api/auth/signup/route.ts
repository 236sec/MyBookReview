import { prisma } from "../../../../../prisma/prisma"
import bcrypt from 'bcryptjs'

export async function POST(request : Request) {
  try {
    const { email, password, name } = await request.json()
    const hashedPassword = bcrypt.hashSync(password, 10)
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
      },
    })
    return Response.json({ message: 'User created', user })
  } catch (error) {
    console.log(error)
    return Response.json({ error: 'User could not be created' })
  }
}