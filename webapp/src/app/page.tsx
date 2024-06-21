import TableBook from "./components/TableBook";
import TableReview from "./components/TableReview";
import { BooksResponse,ReviewsResponse } from "./types/types";

async function getBooks() {
  const res = await fetch("http://localhost:3000/api/allbooks");
  const { books } : BooksResponse = await res.json();
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.
  if(!books) {
    return null;
  }
  return books;
}

async function getReviews() {
  const res = await fetch("http://localhost:3000/api/allreviews");
  const { reviews } : ReviewsResponse = await res.json();
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.
  if(!reviews) {
    return null;
  }
  return reviews;
}

export default async function Home() {
  const books = await getBooks();
  const reviews = await getReviews();
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 w-full max-w-5xl items-center font-mono" >
        <div className="flex flex-col">
          <h1 className="text-2xl">Book List</h1>
          <TableBook data={books} />
          <a href="/createbook"><button className="bg-green-600 rounded-xl p-2 w-36">Add</button></a>
        </div>
        <div className="flex flex-col">
          <h1 className="text-2xl">Review List</h1>
          <TableReview data={reviews} />
          <a href="/createreview"><button className="bg-green-600 rounded-xl p-2 w-36">Add</button></a>
        </div>
      </div>
    </main>
  );
}
