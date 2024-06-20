import './table.css';

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
                            reviews.map((review,index) => {
                                return (
                                    <tr key={`${index}`}>
                                        <td>{review.book.title}</td>
                                        <td>{review.rating}</td>
                                        <td>{review.user.name}</td>
                                        <td>{review.updatedAt}</td>
                                    </tr>
                                )
                            
                            })
                        }
                </tbody>
            </table>
        </div>
    )
}