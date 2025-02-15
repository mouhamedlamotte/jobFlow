import { Skeleton } from "@/app/_components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/app/_components/ui/table";

interface TableSkeletonProps {
  headers?: string[];
  rowCount?: number;
}

export const TableSkeleton = ({
  headers = ["", "", "", "", ""],
  rowCount = 10,
}: TableSkeletonProps) => {
  const cellsToRender = headers.length;

  return (
    <Table>
      <TableHeader>
        <TableRow>
          {headers.map((header, index) => (
            <TableHead key={index}>
              <Skeleton className="h-6 w-full" />
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {Array.from({ length: rowCount }).map((_, rowIndex) => (
          <TableRow key={rowIndex}>
            {Array.from({ length: cellsToRender }).map((_, cellIndex) => (
              <TableCell key={cellIndex}>
                <Skeleton className="h-6 w-full" />
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
