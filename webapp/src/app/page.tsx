import TableBook from "./components/TableBook";
import TableReview from "./components/TableReview";
import { BooksResponse,ReviewsResponse } from "./types/types";

async function getBook() {
  const res = await fetch("http://localhost:3000/api/allbooks");
  const { books } : BooksResponse = await res.json();
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.
  if(!books) {
    return null;
  }
  return books;
}

async function getReview() {
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
  const books = await getBook();
  const reviews = await getReview();
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 w-full max-w-5xl items-center font-mono" >
        <div className="flex flex-col">
          <h1 className="text-2xl">Book List</h1>
          <TableBook data={books} />
          <button className="bg-green-600 rounded-xl p-2 w-36"><a href="/createbook">Add</a></button>
        </div>
        <div className="flex flex-col">
          <h1 className="text-2xl">Review List</h1>
          <TableReview data={reviews} />
          <button className="bg-green-600 rounded-xl p-2 w-36"><a href="/createreview">Add</a></button>
        </div>
      </div>
    </main>
  );
}
