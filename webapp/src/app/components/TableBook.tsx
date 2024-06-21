export default function TableBook({ data } : any) {
    const headers = ["title","publishedDate","isbn","author"]
    const books = data;
    if(books === null) {
        return (
            <div>
                <h1>No books found</h1>
            </div>
        )
    }
    return (
        <div className="rounded-lg overflow-hidden my-10">
            <table className="border-separate w-full border border-slate-400 dark:border-slate-500 bg-white dark:bg-slate-800 text-sm shadow-sm table-auto">
                <thead className="bg-green-500 text-2xl">
                    <tr>
                        {
                            headers.map((header, index) => (
                                <th className='text-center' key={`${index}-${header}`}>{header}</th>
                            ))
                        }
                    </tr>
                </thead>
                <tbody className="text-xl">
                        {
                            books.map((book,index) => {
                                return (
                                    <tr className="border-2 border-white" key={`${index}`}>
                                        <td className="text-center">{book.title}</td>
                                        <td className="text-center">{book.publishedDate}</td>
                                        <td className="text-center">{book.isbn}</td>
                                        <td className="text-center">{book.author}</td>
                                    </tr>
                                )
                            
                            })
                        }
                </tbody>
            </table>
        </div>
    )
}