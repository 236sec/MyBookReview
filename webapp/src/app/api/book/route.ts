import { prisma } from "../../../../prisma/prisma"
import { NextResponse } from 'next/server'

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
    const { title, author, published_date, isbn, page_amount, picture_url, description} : PostData = await request.json();
    if(!title || !isbn || !author){
        throw Error('Title and ISBN are required');
    }
    let authorRecord = await prisma.author.findUnique({
        where: { name: author },
    })
    if(!authorRecord){
        authorRecord = await prisma.author.create({
            data: {
                name: author
            }
        })
    }


    const bookData  = {
        title,
        authorId: authorRecord.id, // use the ID of the author record
        publishedDate: published_date,
        isbn,
        pageAmount: page_amount,
        pictureUrl: picture_url,
        description
    }

    const filteredData = Object.fromEntries(
        Object.entries(bookData).filter(([_, v]) => v != null)
    )

    const book = await prisma.book.create({
        data: filteredData
    })

    return NextResponse.json({ message: 'Book created', book });

  } catch (error : any) {
    console.log(error);
    return NextResponse.json({ error: error.message },{status: 500});
  }
}

// export async function GET(request : Request) {
//     try {
//       const hashedPassword = bcrypt.hashSync(password, 10)
//       const user = await prisma.user.create({
//         data: {
//           email,
//           password: hashedPassword,
//           name,
//         },
//       })
//       return NextResponse.json({ message: 'User created', user })
//     } catch (error) {
//       console.log(error)
//       return NextResponse.json({ error: 'User could not be created' },{status: 500})
//     }
//   }
  
