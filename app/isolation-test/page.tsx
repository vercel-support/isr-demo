import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import OnDemandISR from "@/components/on-demand-isr"
import TimeBasedISR from "@/components/time-based-isr"
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
    title: "Rendering Strategy Isolation Test",
    description: "Testing isolation between different rendering strategies",
    other: {
      // Add a unique timestamp to metadata to prevent caching
      uniqueTimestamp: Date.now().toString()
    }
  }
}

export default function IsolationTestPage() {
  // Add a timestamp and nonce to the page to verify it's rendering on each request
  const pageRenderTime = new Date().toISOString()
  const pageNonce = Math.random().toString(36).substring(2, 10)
  
  // Log the page render for debugging
  console.log(`Isolation Test Page rendered at ${pageRenderTime} (nonce: ${pageNonce})`)
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6 text-center">Rendering Strategy Isolation Test</h2>
      
      <div className="max-w-4xl mx-auto mb-8">
        <p className="text-center text-muted-foreground mb-4">
          This page demonstrates that on-demand revalidation only affects the specific instance being revalidated,
          without impacting time-based ISR or SSR implementations.
        </p>
        <div className="flex justify-center mb-4">
          <ReloadButton />
        </div>
        <p className="text-center text-xs text-muted-foreground">
          Page rendered at: {pageRenderTime} <span className="ml-2">(Nonce: {pageNonce})</span>
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        <Card className="border-purple-200">
          <CardHeader className="bg-purple-50 dark:bg-purple-950/20">
            <CardTitle>On-Demand ISR</CardTitle>
            <CardDescription>Revalidates only when manually triggered</CardDescription>
          </CardHeader>
          <CardContent className="pt-4">
            {/* Add a unique key to force a new instance on each render */}
            <OnDemandISR key={`on-demand-${pageNonce}`} />
          </CardContent>
        </Card>

        <Card className="border-green-200">
          <CardHeader className="bg-green-50 dark:bg-green-950/20">
            <CardTitle>Time-Based ISR</CardTitle>
            <CardDescription>Revalidates every 10 seconds</CardDescription>
          </CardHeader>
          <CardContent className="pt-4">
            {/* Add a unique key to force a new instance on each render */}
            <TimeBasedISR key={`time-based-${pageNonce}`} />
          </CardContent>
        </Card>

        <Card className="border-orange-200">
          <CardHeader className="bg-orange-50 dark:bg-orange-950/20">
            <CardTitle>Server-Side Rendering</CardTitle>
            <CardDescription>Fetches fresh data on every request</CardDescription>
          </CardHeader>
          <CardContent className="pt-4">
            {/* Add a unique key to force a new instance on each render */}
            <SSRTime key={`ssr-${pageNonce}`} />
          </CardContent>
        </Card>
      </div>
      
      <div className="max-w-4xl mx-auto mt-8">
        <h3 className="text-xl font-semibold mb-4 text-center">Testing Instructions</h3>
        <div className="bg-muted p-4 rounded-lg">
          <ol className="list-decimal list-inside space-y-2">
            <li>Note the timestamps and tags for all components and the page</li>
            <li>Click the &quot;Revalidate Now&quot; button on the On-Demand ISR component</li>
            <li>Verify that <strong>only</strong> the On-Demand ISR component updates</li>
            <li>Click the &quot;Force Time-Based Update&quot; button on the Time-Based ISR component</li>
            <li>Verify that <strong>only</strong> the Time-Based ISR component updates</li>
            <li>Click the page &quot;Reload&quot; button</li>
            <li>Verify that the page render time and SSR component show new timestamps and tags</li>
            <li>The Time-Based ISR component should maintain its value unless 10+ seconds have passed</li>
            <li>The On-Demand ISR component should maintain its value until manually revalidated</li>
          </ol>
        </div>
      </div>
    </div>
  )
} 