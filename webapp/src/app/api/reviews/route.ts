import { prisma } from "../../../../prisma/prisma"
import { NextResponse,NextRequest } from 'next/server'
import { getServerSession } from "next-auth/next"
import { authOptions } from "../auth/[...nextauth]/route";

export const config = {
  api: {
    bodyParser: false,
  },
};

interface ReviewData {
    rating: number,
    comment: string,
    published: string
}

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
  } catch (error : any) {
    console.log(error.message);
    return NextResponse.json({ error: 'Something Wrong' },{status: 500});
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      throw Error('You must be logged in.');
    }
    const formData = await req.formData();
    console.log(formData);
    const isbn = formData.get("isbn");
    const rating = formData.get("rating");
    const comment = formData.get("comment");
    const published = formData.get("published");
    if(!isbn || !(published === "false" || published === "true")){
      throw Error('Title and Published are required');
    }
    const reviewData : ReviewData = {
        rating: Number(rating),
        comment: comment,
        published: published ? "true" : "false",
    }
    const review = await prisma.review.create({
        data: {
          rating: rating ? Number(rating) : 0,
          comment: comment ? comment : "",
          published: reviewData.published === "true" ? true : false,
          user: { connect: { email: session.user.email } },
          book: { connect: { isbn: isbn } },
        }
    })
    return NextResponse.json({ message: 'Book created', review },{status: 201});
  } catch (error : any) {
    console.log(error);
    return NextResponse.json({ error: error.message },{status: 500});
  }
}
