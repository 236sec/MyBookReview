import { prisma } from "../../../../prisma/prisma"
import { NextResponse } from 'next/server'

export const config = {
  api: {
    bodyParser: false,
  },
};

interface PostData {
    title: string,
    author: string,
    published_date: string,
    isbn: string,
    page_amount: number,
    picture_url: string,
    description: string
}

export async function POST(request : Request) {
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

export async function GET(request : Request) {
    try {
      const url = new URL(request.url);
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
            delete newBook.authorId
            return newBook
        });
      return NextResponse.json({ books:data });
    } catch (error) {
      console.log(error)
      return NextResponse.json({ error: 'Something Wrong' },{status: 500});
    }
}
  
