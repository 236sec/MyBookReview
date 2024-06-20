import { NextResponse,NextRequest } from "next/server";
import { prisma } from "../../../../prisma/prisma"

export async function GET(req : NextRequest) {
  try {
    const books = await prisma.book.findMany({
      orderBy: {
        updatedAt: 'desc',
      },
      take: 10,
      include: {
        author: {
          select: {
            name: true,
          },
        },
      },
    });
    const data = books.map((book) => {
    const newBook = {...book,author: book.author.name}
      return newBook
    });
    return NextResponse.json({ books:data });
  } catch (error) {
    console.log(error)
    return NextResponse.json({ error: 'Something Wrong' },{status: 500});
  }
}
  
