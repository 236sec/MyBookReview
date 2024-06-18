import TableData from "../../app/components/TableData1"
import { BooksResponse } from "../../app/types/booktable"

export async function getServerSideProps() {
    const res = await fetch("http://localhost:3000/api/books");
    const { books } : BooksResponse = await res.json();
    if(!books) {
        return {props : {books:null}};
    }
    return { props: { books } }
  }

interface TableProps {
    books: BooksResponse
}

export default function Table({ books } : TableProps) {
    
    return (
        <div>
            {books && <TableData data={books} />}
        </div>
    )
}