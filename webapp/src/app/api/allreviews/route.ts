import { prisma } from "../../../../prisma/prisma"
import { NextResponse,NextRequest } from 'next/server'

export async function GET(request : NextRequest) {
    try {
        const reviews = await prisma.review.findMany({
            orderBy: {
              updatedAt: 'desc',
            },
            take: 10,
            include: {
              user: {
                select: {
                  name: true,
                },
              },
              book: {
                select: {
                  title: true,
                }
              }
            },
        });
      return NextResponse.json({ reviews });
    } catch (error) {
      console.log(error)
      return NextResponse.json({ error: 'Something Wrong' },{status: 500});
    }
}