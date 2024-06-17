import TableData from "../components/TableData"
import { TableDataType } from "../types/booktable"

export async function getServerSideProps() {
    const res = await fetch(`https://...`)
    const projects : TableDataType = await res.json()
   
    return { props: { projects } }
  }

interface TableProps {
    projects: TableDataType
}

export default function Table({ projects } : TableProps) {
    
    return (
        <TableData data={projects} />
    )
}