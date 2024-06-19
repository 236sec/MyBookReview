import TableData from "./components/TableData1";
import { BooksResponse } from "./types/booktable";

interface TableProps {
  books: BooksResponse
}

async function getData() {
  const res = await fetch("http://localhost:3000/api/books");
  const { books } : BooksResponse = await res.json();
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.
  if(!books) {
    return {books:null};
  }
  return books;
}

export default async function Home() {
  const books = await getData();
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 w-full max-w-5xl items-center font-mono" >
        <div className="flex flex-col">
          <h1 className="text-2xl">Book List</h1>
          <TableData data={books} />
          <button className="bg-green-600 rounded-xl p-2 w-36"><a href="/createbook">Add</a></button>
        </div>
        <div className="flex flex-col">
          <h1 className="text-2xl">Review List</h1>
          <TableData data={books} />
          <button className="bg-green-600 rounded-xl p-2 w-36"><a href="/createreview">Add</a></button>
        </div>
      </div>
    </main>
  );
}
