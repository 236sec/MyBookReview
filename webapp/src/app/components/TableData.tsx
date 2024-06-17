import './table.css';
import { TableProjection } from '../types/booktable';

export default function TableData({ data } : any) {
    function transformToTableProjection(data: Record<string, string>[]): TableProjection {
        if (data.length === 0) {
          return { headers: [], rows: [] };
        }
      
        // Extract headers from the keys of the first object
        const headers = Object.keys(data[0]);
      
        // Extract rows from the values of each object
        const rows = data.map(item => headers.map(header => item[header]));
      
        return { headers, rows };
    }
    const {headers, rows} = transformToTableProjection(data);
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
                    <tr>
                        {
                            rows.map((row, index) => {
                                return (
                                    <tr key={`${index}`}>
                                        {row.map((cell, index) => (
                                            <td key={index}>{cell}</td>
                                        ))}
                                    </tr>
                                )
                            
                            })
                        }
                    </tr>
                    {

                    }
                </tbody>
            </table>
        </div>
    )
}