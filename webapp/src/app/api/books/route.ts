import { prisma } from "../../../../prisma/prisma"
import { NextResponse,NextRequest } from 'next/server'

export const config = {
  api: {
    bodyParser: false,
  },
};

export async function POST(request : NextRequest) {
  try {
    const formData = await request.formData();
    const title = formData.get('title');
    const author_name = formData.get('author');
    const published_date = formData.get('publishedDate');
    const isbn = formData.get('isbn');
    const page_amount = Number(formData.get('pageAmount'));
    const picture_url = formData.get('pictureUrl');
    const description = formData.get('description');
    let formatDate = new Date(published_date);
    if(!title || !isbn || !author_name){
        throw Error('Title and ISBN are required');
    }
    let authorRecord = await prisma.author.findUnique({
        where: { name: author_name },
    })
    if(!authorRecord){
        authorRecord = await prisma.author.create({
            data: {
                name: author_name
            }
        })
    }
    if(!published_date){
      formatDate = null;
    }
    const result = await prisma.book.create({
      data: {
        title,
        publishedDate: formatDate,
        isbn,
        pageAmount:page_amount,
        pictureUrl: picture_url,
        description,
        author: { connect: { name: author_name } },
      },
    })

  return NextResponse.json({ message: 'Book created', result });

  } catch (error : any) {
    console.log(error);
    return NextResponse.json({ error: error.message },{status: 500});
  }
}

export async function GET(req : NextRequest) {
  try {
    const url = new URL(req.url);
    const bookid = url.searchParams.get('bookid');
    if(bookid){
      const book = await prisma.book.findUnique({
          where: { id: parseInt(bookid) },
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
    }
  } catch (error : any) {
    console.log(error);
    return NextResponse.json({ error: error.message },{status: 500});
  }
}