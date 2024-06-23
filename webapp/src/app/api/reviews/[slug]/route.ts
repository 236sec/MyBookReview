import { prisma } from "../../../../../prisma/prisma"
import { NextResponse,NextRequest } from 'next/server'

export async function GET(req : NextRequest, { params }: { params: { slug: string } }) {
    try {
        const reviewid = Number(params.slug);
        if(isNaN(reviewid)) {
            throw Error('Invalid Review ID');
        }
        const review = await prisma.review.findUnique({
            where: { id: reviewid },
            include: {
              user: {
                select: {
                  name: true,
                },
              },
              book: {
                select: {
                  title: true,
                  pictureUrl: true,
                }
              },
            }
        });
        if(!review){
          throw Error('Review not found');
        }
        return NextResponse.json({ review });
    } catch (error : any) {
      console.log(error.message);
      return NextResponse.json({ error: error.message },{status: 500});
    }
  }