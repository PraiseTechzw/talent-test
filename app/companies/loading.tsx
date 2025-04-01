import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export default function Loading() {
  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">
          <Skeleton className="h-9 w-48" />
        </h1>
        <Skeleton className="h-10 w-32" />
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">
              <Skeleton className="h-4 w-24" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              <Skeleton className="h-8 w-16" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">
              <Skeleton className="h-4 w-32" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              <Skeleton className="h-8 w-20" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">
              <Skeleton className="h-4 w-28" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              <Skeleton className="h-8 w-24" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>
                <Skeleton className="h-4 w-24" />
              </TableHead>
              <TableHead>
                <Skeleton className="h-4 w-32" />
              </TableHead>
              <TableHead>
                <Skeleton className="h-4 w-28" />
              </TableHead>
              <TableHead>
                <Skeleton className="h-4 w-28" />
              </TableHead>
              <TableHead>
                <Skeleton className="h-4 w-20" />
              </TableHead>
              <TableHead>
                <Skeleton className="h-4 w-24" />
              </TableHead>
              <TableHead className="text-right">
                <Skeleton className="h-4 w-16 ml-auto" />
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {Array.from({ length: 5 }).map((_, index) => (
              <TableRow key={index}>
                <TableCell>
                  <Skeleton className="h-5 w-32" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-5 w-28" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-5 w-24" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-5 w-28" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-5 w-12" />
                </TableCell>
                <TableCell>
                  <div className="flex gap-1">
                    <Skeleton className="h-5 w-16" />
                    <Skeleton className="h-5 w-16" />
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <Skeleton className="h-8 w-8 ml-auto" />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="flex justify-center mt-4">
        <div className="flex gap-1">
          <Skeleton className="h-10 w-10" />
          <Skeleton className="h-10 w-10" />
          <Skeleton className="h-10 w-10" />
          <Skeleton className="h-10 w-10" />
        </div>
      </div>
    </div>
  )
}

