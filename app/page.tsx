import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import ClientTime from "@/components/client-time"
import TimeBasedISR from "@/components/time-based-isr"
import OnDemandISR from "@/components/on-demand-isr"
import { getTimeData } from './actions'
import { ReloadButton } from "@/components/reload-button"
import ClientSSRTime from "@/components/client-ssr-time"
import type { Metadata } from "next"

// For the home page, we'll use a shorter revalidation time
export const revalidate = 5

// Add metadata generation to ensure proper revalidation
export async function generateMetadata(props: { 
  searchParams: Promise<{ [key: string]: string | string[] | undefined }> 
}): Promise<Metadata> {
  // Await the searchParams promise
  const searchParams = await props.searchParams;
  
  // Use the timestamp from the URL or generate a new one
  const timestamp = typeof searchParams._t === 'string' ? searchParams._t : Date.now().toString();
  
  return {
    title: "Next.js Data Fetching Demo",
    description: "Demonstrating different data fetching strategies in Next.js",
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
  
  // Log the page render for debugging
  console.log(`Home page rendered at ${new Date().toISOString()} with URL timestamp: ${timestamp}`);
  
  return (
    <div className="container mx-auto px-4">
      <h1 className="text-3xl font-bold text-center my-8">Next.js Data Fetching Demo</h1>
      <div className="flex justify-center mb-4">
        <ReloadButton />
      </div>
      <p className="text-center mb-6">
        Server Time: {data.time}
        <span className="text-xs text-gray-500 ml-2">(Page Timestamp: {timestamp.substring(0, 8)}...)</span>
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ClientTimeCard />
        <TimeBasedISRCard timestamp={timestamp} />
        <OnDemandISRCard />
        <SSRTimeCard />
      </div>
    </div>
  )
}

function ClientTimeCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Client-Side Rendering</CardTitle>
        <CardDescription>Time fetched on the client-side using useEffect</CardDescription>
      </CardHeader>
      <CardContent>
        <ClientTime />
      </CardContent>
    </Card>
  )
}

function TimeBasedISRCard({ timestamp }: { timestamp: string }) {
  return (
    <Card className="border-green-200">
      <CardHeader className="bg-green-50 dark:bg-green-950/20">
        <CardTitle>Time-Based ISR</CardTitle>
        <CardDescription>Revalidates every 5 seconds</CardDescription>
      </CardHeader>
      <CardContent>
        {/* Use a key that includes the timestamp to force a refresh when the page is reloaded */}
        <TimeBasedISR key={`time-based-${timestamp}`} />
      </CardContent>
    </Card>
  )
}

function OnDemandISRCard() {
  return (
    <Card className="border-purple-200">
      <CardHeader className="bg-purple-50 dark:bg-purple-950/20">
        <CardTitle>On-Demand ISR</CardTitle>
        <CardDescription>Revalidates when manually triggered</CardDescription>
      </CardHeader>
      <CardContent>
        {/* Use a consistent key for on-demand ISR to maintain its cache */}
        <OnDemandISR key="overview-on-demand" />
      </CardContent>
    </Card>
  )
}

function SSRTimeCard() {
  return (
    <Card className="border-orange-200">
      <CardHeader className="bg-orange-50 dark:bg-orange-950/20">
        <CardTitle>Server-Side Rendering</CardTitle>
        <CardDescription>Fetches time on every request</CardDescription>
      </CardHeader>
      <CardContent>
        {/* Use the client-side component to avoid dynamic server usage errors */}
        <ClientSSRTime />
      </CardContent>
    </Card>
  )
}

