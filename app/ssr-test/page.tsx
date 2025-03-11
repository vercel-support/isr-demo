import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import SSRTime from "@/components/ssr-time"
import { ReloadButton } from "@/components/reload-button"

// Force the page to be dynamic (server-rendered on each request)
export const dynamic = "force-dynamic"
// Disable caching for this page
export const fetchCache = "force-no-store"
// Setting revalidate to 0 ensures the page is not statically generated
export const revalidate = 0

// Add a unique search param to the URL to prevent any caching
export const generateMetadata = () => {
  return {
    title: "SSR Test Page",
    description: "Testing server-side rendering with no caching",
    other: {
      // Add a unique timestamp to metadata to prevent caching
      uniqueTimestamp: Date.now().toString()
    }
  }
}

export default function SSRTestPage() {
  // Generate a unique ID and timestamp for this page render
  const pageRenderTime = new Date().toISOString()
  const pageRenderTimestamp = Date.now()
  const pageRequestId = crypto.randomUUID()
  
  // Log the page render for debugging
  console.log(`SSR Test Page rendered at ${pageRenderTime} (ID: ${pageRequestId.substring(0, 8)})`)
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6 text-center">Server-Side Rendering Test</h2>
      
      <div className="max-w-4xl mx-auto mb-8">
        <p className="text-center text-muted-foreground mb-4">
          This page demonstrates that server-side rendering generates fresh content on every page load.
          Each time you reload the page, all timestamps should update.
        </p>
        <div className="flex justify-center mb-4">
          <ReloadButton />
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
        <Card className="border-blue-200">
          <CardHeader className="bg-blue-50 dark:bg-blue-950/20">
            <CardTitle>Page Render Info</CardTitle>
            <CardDescription>Generated on the server for each request</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 pt-4">
            <div className="flex flex-col space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Render Time:</span>
                <span className="font-mono text-sm">{pageRenderTime}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Timestamp:</span>
                <span className="font-mono text-sm">{pageRenderTimestamp}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Request ID:</span>
                <span className="font-mono text-sm">{pageRequestId.substring(0, 8)}...</span>
              </div>
            </div>
            
            <div className="text-sm text-muted-foreground mt-4">
              <p>• This information is generated on the server</p>
              <p>• It should change on every page reload</p>
              <p>• No client-side JavaScript is involved</p>
            </div>
          </CardContent>
        </Card>

        <Card className="border-orange-200">
          <CardHeader className="bg-orange-50 dark:bg-orange-950/20">
            <CardTitle>SSR Component</CardTitle>
            <CardDescription>Fetches fresh data on every request</CardDescription>
          </CardHeader>
          <CardContent className="pt-4">
            <SSRTime />
          </CardContent>
        </Card>
      </div>
      
      <div className="max-w-4xl mx-auto mt-8">
        <h3 className="text-xl font-semibold mb-4 text-center">Testing Instructions</h3>
        <div className="bg-muted p-4 rounded-lg">
          <ol className="list-decimal list-inside space-y-2">
            <li>Note the timestamps and request IDs for both the page and the SSR component</li>
            <li>Click the &quot;Reload&quot; button</li>
            <li>Verify that <strong>all</strong> timestamps and request IDs have changed</li>
            <li>This confirms that the entire page is being rendered server-side on each request</li>
            <li>The SSR component should <strong>not</strong> update at the same time as time-based ISR components</li>
          </ol>
        </div>
      </div>
    </div>
  )
} 