import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import ClientTime from "@/components/client-time"
import TimeBasedISR from "@/components/time-based-isr"
import OnDemandISR from "@/components/on-demand-isr"
import { getTimeData } from './actions'
import { ReloadButton } from "@/components/reload-button"
import ClientSSRTime from "@/components/client-ssr-time"
import type { Metadata } from "next"
import { Badge } from "@/components/ui/badge"

// For the home page, we'll use a revalidation time of 10 seconds
export const revalidate = 10

// Add metadata generation to ensure proper revalidation
export async function generateMetadata(props: { 
  searchParams: Promise<{ [key: string]: string | string[] | undefined }> 
}): Promise<Metadata> {
  // Await the searchParams promise
  const searchParams = await props.searchParams;
  
  // Use the timestamp from the URL or generate a new one
  const timestamp = typeof searchParams._t === 'string' ? searchParams._t : Date.now().toString();
  
  return {
    title: "Next.js Render Methods",
    description: "Demonstrating different rendering methods in Next.js",
    other: {
      // Add the timestamp to metadata to help with revalidation
      uniqueTimestamp: timestamp
    }
  }
}

// Use the exact Next.js page props type with Promise
export default async function Home(props: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  // Await the searchParams promise
  const searchParams = await props.searchParams;
  
  // Use the timestamp from the URL or generate a new one
  const timestamp = typeof searchParams._t === 'string' ? searchParams._t : Date.now().toString();
  
  // Get fresh data using the timestamp
  const data = await getTimeData();
  
  return (
    <div className="container mx-auto px-4">
      <div className="max-w-5xl mx-auto">
        <div className="flex justify-center mb-6">
          <ReloadButton />
        </div>
        
        <p className="text-center mb-8 flex items-center justify-center gap-2">
          <span className="text-sm text-muted-foreground">Server Time:</span>
          <span className="font-mono bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded text-sm">{data.time}</span>
          <Badge variant="outline" className="ml-2">Page Timestamp: {timestamp.substring(0, 8)}...</Badge>
        </p>

        {/* Rendering Method Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="border-blue-200">
            <CardHeader className="bg-blue-50 dark:bg-blue-950/20">
              <CardTitle>Client-Side Rendering</CardTitle>
              <CardDescription>Time fetched on the client-side using useEffect</CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <p className="text-sm text-muted-foreground mb-4">
                Data fetched in the browser after page load. Good for personalized or frequently changing content.
              </p>
              <ClientTime />
            </CardContent>
          </Card>

          <Card className="border-green-200">
            <CardHeader className="bg-green-50 dark:bg-green-950/20">
              <CardTitle>Time-Based ISR</CardTitle>
              <CardDescription>Revalidates every 10 seconds</CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <p className="text-sm text-muted-foreground mb-4">
                Pages cached and regenerated at fixed intervals. Balances performance with freshness.
              </p>
              <TimeBasedISR key={`time-based-${timestamp}`} />
            </CardContent>
          </Card>

          <Card className="border-purple-200">
            <CardHeader className="bg-purple-50 dark:bg-purple-950/20">
              <CardTitle>On-Demand ISR</CardTitle>
              <CardDescription>Revalidates when manually triggered</CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <p className="text-sm text-muted-foreground mb-4">
                Pages cached until manually revalidated. Perfect for content that changes on specific events.
              </p>
              <OnDemandISR key="overview-on-demand" />
            </CardContent>
          </Card>

          <Card className="border-orange-200">
            <CardHeader className="bg-orange-50 dark:bg-orange-950/20">
              <CardTitle>Server-Side Rendering</CardTitle>
              <CardDescription>Fetches time on every request</CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <p className="text-sm text-muted-foreground mb-4">
                Fresh data on every request. Ideal for highly dynamic content that needs SEO.
              </p>
              <ClientSSRTime />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

