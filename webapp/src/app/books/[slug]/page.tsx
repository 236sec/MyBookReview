import Image from "next/image";

async function getReview(id : number) {
    const res = await fetch(`http://localhost:3000/api/books?bookid=${id}`);
    const { book } = await res.json();
    // The return value is *not* serialized
    // You can return Date, Map, Set, etc.
    if(!book) {
      return null;
    }
    return book;
}


export default async function Page({ params }: { params: { slug: string } }) {
    const bookid = Number(params.slug);
    if(isNaN(bookid)) {
        return <h1>Invalid Review ID</h1>
    }
    const book = await getReview(bookid);
    if(book === null){
        return <h1>Book not found</h1>
    }
    console.log(book);
    return (
        <div>
            <h1>Book</h1>
            <h2>{book.title}</h2>
            <h2>{book.author.name}</h2>
            <h2>{book.publishedDate}</h2>
            <h2>{book.isbn}</h2>
            <h2>{book.pageAmount}</h2>
            <h2>{book.description}</h2>
            <h2>{book.updatedAt}</h2>
            <Image alt="book_picture" src={"https://picsum.photos/200"} width={500} height={500} />
        </div>
    )
}