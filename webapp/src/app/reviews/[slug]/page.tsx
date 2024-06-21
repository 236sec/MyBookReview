import Image from "next/image";

async function getReview(id : number) {
    const res = await fetch(`http://localhost:3000/api/reviews?reviewid=${id}`);
    const { review } = await res.json();
    // The return value is *not* serialized
    // You can return Date, Map, Set, etc.
    if(!review) {
      return null;
    }
    return review;
}


export default async function Page({ params }: { params: { slug: string } }) {
    const reviewid = Number(params.slug);
    if(isNaN(reviewid)) {
        return <h1>Invalid Review ID</h1>
    }
    const review = await getReview(reviewid);
    console.log(review);
    return (
        <div>
            <h1>Reviews</h1>
            <h2>{reviewid}</h2>
            <Image alt="book_picture" src={"https://picsum.photos/200"} width={500} height={500} />
        </div>
    )
}