import { prisma } from "../../../../../prisma/prisma"
import { NextResponse,NextRequest } from 'next/server'

export async function GET(req : NextRequest, { params }: { params: { slug: string } }) {
    try {
        const bookid = Number(params.slug);
        if(isNaN(bookid)) {
            return NextResponse.json({ error: 'Invalid Book ID' },{status: 400});
        }
        const book = await prisma.book.findUnique({
            where: { id: bookid },
            include: {
              author: {
                select: {
                  name: true,
                },
              },
            }
        });
        if(!book){
          return NextResponse.json({ error: 'Book not found' },{status: 404});
        }
        return NextResponse.json({ book });
    } catch (error : any) {
      console.log(error.message);
      return NextResponse.json({ error: error.message },{status: 500});
    }
  }