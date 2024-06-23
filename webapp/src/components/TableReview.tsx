

export default function TableReview({ data } : any) {
    const headers = ["title","rating","author","updatedAt"]
    const reviews = data;
    if(reviews === null) {
        return (
            <div>
                <h1>No reviews found</h1>
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
                                <th className="text-center" key={`${index}-${header}`}>{header}</th>
                            ))
                        }
                    </tr>
                </thead>
                <tbody className="text-xl">
                        {
                            reviews.map((review,index) => {
                                return (
                                    <tr key={`${index}`} >
                                        <td className="text-center"><a href={`/reviews/${review.id}`} >{review.book.title}</a></td>
                                        <td className="text-center"><a href={`/reviews/${review.id}`} >{review.rating}</a></td>
                                        <td className="text-center"><a href={`/reviews/${review.id}`} >{review.user.name}</a></td>
                                        <td className="text-center"><a href={`/reviews/${review.id}`} >{review.updatedAt}</a></td>
                                    </tr>
                                )
                            
                            })
                        }
                </tbody>
            </table>
        </div>
    )
}