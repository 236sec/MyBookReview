import TableData from "../../app/components/TableData"
import { BooksResponse } from "../../app/types/booktable"

export async function getServerSideProps() {
    const res = await fetch(`http://localhost:3000/api/book`);
    const { books } : BooksResponse = await res.json();
   
    return { props: { books } }
  }

interface TableProps {
    books: BooksResponse
}

export default function Table({ books } : TableProps) {
    
    return (
        <TableData data={books} />
    )
}