import Image from "next/image";
import { ReviewIdResponse } from "@/types/types";




async function getReview(id : number): Promise<ReviewIdResponse | null> {
    const res = await fetch(`http://localhost:3000/api/reviews/${id}`);
    if(!res.ok) {
        return null;
    }
    const data = await res.json();
    // The return value is *not* serialized
    // You can return Date, Map, Set, etc.
    return data;
}


export default async function Page({ params }: { params: { slug: string } }) {
    const reviewid = Number(params.slug);
    if(isNaN(reviewid)) {
        return <h1>Invalid Review ID</h1>
    }
    const data = await getReview(reviewid);
    if(data === null) {
        return <h1>Review not found</h1>
    }
    const { review } = data;
    console.log(review);
    return (
        <div>
            <h1>Reviews</h1>
            <h2>{reviewid}</h2>
            <Image alt="book_picture" src={"https://picsum.photos/200"} width={500} height={500} />
        </div>
    )
}