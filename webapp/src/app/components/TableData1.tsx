import './table.css';

export default function TableData({ data } : any) {
    const headers = ["title","publishedDate","isbn","author"]
    const books = data;
    return (
        <div className="table-container">
            <table className="styled-table">
                <thead>
                    <tr>
                        {
                            headers.map((header, index) => (
                                <th key={`${index}-${header}`}>{header}</th>
                            ))
                        }
                    </tr>
                </thead>
                <tbody>
                        {
                            books.map((book,index) => {
                                return (
                                    <tr key={`${index}`}>
                                        <td>{book.title}</td>
                                        <td>{book.publishedDate}</td>
                                        <td>{book.isbn}</td>
                                        <td>{book.author}</td>
                                    </tr>
                                )
                            
                            })
                        }
                </tbody>
            </table>
        </div>
    )
}