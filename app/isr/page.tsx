import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import ClientTime from "@/components/client-time"
import TimeBasedISR from "@/components/time-based-isr"
import { getTimeData } from '../actions'

export const revalidate = 10; // Revalidate every 10 seconds

export default async function ISRPage() {
  const data = await getTimeData();
  
  return (
    <div className="container mx-auto px-4">
      <h2 className="text-2xl font-bold mb-6 text-center">Time-Based ISR Comparison</h2>
      <p className="text-center mb-6">Server Time: {data.time}</p>
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
            <CardTitle>Time-Based ISR</CardTitle>
            <CardDescription>Revalidates every 10 seconds</CardDescription>
          </CardHeader>
          <CardContent>
            <TimeBasedISR />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

