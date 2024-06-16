import { prisma } from "../../../../../prisma/prisma"
import bcrypt from 'bcryptjs'
import { NextResponse } from 'next/server'

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
    return NextResponse.json({ message: 'User created', user })
  } catch (error) {
    console.log(error)
    return NextResponse.json({ error: 'User could not be created' },{status: 500})
  }
}