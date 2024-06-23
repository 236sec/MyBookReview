import { prisma } from "../../../../prisma/prisma"
import { NextResponse,NextRequest } from 'next/server'

export const config = {
  api: {
    bodyParser: false,
  },
};

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
  } catch (error : any) {
    console.log(error.message)
    return NextResponse.json({ error: 'Something Wrong' },{status: 500});
  }
}

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