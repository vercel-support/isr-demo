import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Suspense } from "react"
import ClientTime from "@/components/client-time"
import SSRTime from "@/components/ssr-time"
import { ReloadButton } from "@/components/reload-button"

// Force dynamic rendering for this page
export const dynamic = "force-dynamic"
// Disable all caching for this page
export const fetchCache = "force-no-store"
export const revalidate = 0

export default function SSRPage() {
  return (
    <div className="container mx-auto px-4">
      <h2 className="text-2xl font-bold mb-6 text-center">Server-Side Rendering Comparison</h2>
      <div className="flex justify-center mb-4">
        <ReloadButton />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>Client-Side Rendering</CardTitle>
            <CardDescription>Time fetched on the client-side using useEffect</CardDescription>
          </CardHeader>
          <CardContent>
            <ClientTime />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Server-Side Rendering</CardTitle>
            <CardDescription>Fetches time on every request</CardDescription>
          </CardHeader>
          <CardContent>
            <Suspense fallback={<div>Loading...</div>}>
              <SSRTime />
            </Suspense>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

