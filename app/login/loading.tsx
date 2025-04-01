import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function Loading() {
  return (
    <div className="flex h-screen w-full items-center justify-center">
      <Card className="mx-auto max-w-md w-full">
        <CardHeader className="space-y-2 text-center">
          <CardTitle className="text-2xl font-bold">
            <Skeleton className="h-8 w-48 mx-auto" />
          </CardTitle>
          <div className="text-sm text-muted-foreground">
            <Skeleton className="h-4 w-64 mx-auto" />
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Skeleton className="h-4 w-16" />
            <Skeleton className="h-10 w-full" />
          </div>
          <div className="space-y-2">
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-10 w-full" />
          </div>
          <div className="flex items-center space-x-2">
            <Skeleton className="h-4 w-4" />
            <Skeleton className="h-4 w-32" />
          </div>
          <Skeleton className="h-10 w-full" />
          <div className="text-center text-sm">
            <Skeleton className="h-4 w-48 mx-auto" />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

