import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { ExclamationTriangleIcon, InfoCircledIcon, ExternalLinkIcon } from "@radix-ui/react-icons"

export default function DebugPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6 text-center">Next.js Data Fetching Debug & Documentation</h2>
      
      <div className="max-w-4xl mx-auto mb-8">
        <p className="text-center text-muted-foreground mb-4">
          This page provides documentation, troubleshooting tips, and resources for understanding 
          different data fetching strategies in Next.js.
        </p>
      </div>
      
      <Alert className="max-w-4xl mx-auto mb-8 border-amber-200 bg-amber-50 dark:bg-amber-950/20">
        <ExclamationTriangleIcon className="h-5 w-5 text-amber-600" />
        <AlertTitle className="text-amber-600">Important Note</AlertTitle>
        <AlertDescription>
          ISR (Incremental Static Regeneration) features only work in production builds. 
          You must run <code className="bg-muted px-1 py-0.5 rounded">npm run build</code> followed by <code className="bg-muted px-1 py-0.5 rounded">npm start</code> (or equivalent commands for your package manager) to see ISR in action.
        </AlertDescription>
      </Alert>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>Data Fetching Strategies</CardTitle>
            <CardDescription>Understanding the different approaches</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <h3 className="font-semibold">Client-Side Rendering (CSR)</h3>
              <p className="text-sm text-muted-foreground">
                Data is fetched by the browser after the page loads using JavaScript.
                Good for private, user-specific data or frequently changing content.
              </p>
            </div>
            
            <div className="space-y-2">
              <h3 className="font-semibold">Server-Side Rendering (SSR)</h3>
              <p className="text-sm text-muted-foreground">
                Data is fetched on the server for each request.
                Good for pages that need fresh data on every request or need SEO.
              </p>
            </div>
            
            <div className="space-y-2">
              <h3 className="font-semibold">Time-Based ISR</h3>
              <p className="text-sm text-muted-foreground">
                Pages are statically generated and then regenerated after a specified interval.
                Good for data that changes periodically but doesn&apos;t need real-time updates.
              </p>
            </div>
            
            <div className="space-y-2">
              <h3 className="font-semibold">On-Demand ISR</h3>
              <p className="text-sm text-muted-foreground">
                Pages are statically generated and then regenerated when explicitly requested.
                Good for content that changes infrequently or unpredictably.
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Troubleshooting ISR</CardTitle>
            <CardDescription>Common issues and solutions</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <h3 className="font-semibold">ISR Not Working</h3>
              <ul className="text-sm text-muted-foreground list-disc pl-5 space-y-1">
                <li>Ensure you&apos;re running a production build (<code className="bg-muted px-1 py-0.5 rounded">npm run build && npm start</code> or equivalent for your package manager)</li>
                <li>Check that you&apos;ve set the correct <code className="bg-muted px-1 py-0.5 rounded">revalidate</code> value</li>
                <li>Verify that your API routes are correctly calling <code className="bg-muted px-1 py-0.5 rounded">revalidateTag</code> or <code className="bg-muted px-1 py-0.5 rounded">revalidatePath</code></li>
              </ul>
            </div>
            
            <div className="space-y-2">
              <h3 className="font-semibold">Cache Not Updating</h3>
              <ul className="text-sm text-muted-foreground list-disc pl-5 space-y-1">
                <li>Use unique tags for different content types</li>
                <li>Check browser caching (try hard refresh with Ctrl+F5)</li>
                <li>Ensure your fetch requests include proper cache control headers</li>
              </ul>
            </div>
            
            <div className="space-y-2">
              <h3 className="font-semibold">Dynamic Server Usage Error</h3>
              <ul className="text-sm text-muted-foreground list-disc pl-5 space-y-1">
                <li>Use client components for dynamic content in static pages</li>
                <li>Set <code className="bg-muted px-1 py-0.5 rounded">dynamic = &quot;force-dynamic&quot;</code> for fully dynamic pages</li>
                <li>Use <code className="bg-muted px-1 py-0.5 rounded">fetchCache = &quot;force-no-store&quot;</code> to disable caching</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="max-w-4xl mx-auto mt-8">
        <h3 className="text-xl font-semibold mb-4 text-center">Official Documentation</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <a 
            href="https://nextjs.org/docs/app/building-your-application/data-fetching" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center p-4 border rounded-lg hover:bg-muted transition-colors"
          >
            <InfoCircledIcon className="h-5 w-5 mr-2 text-blue-500" />
            <div>
              <h4 className="font-medium">Data Fetching</h4>
              <p className="text-sm text-muted-foreground">Comprehensive guide to data fetching in Next.js</p>
            </div>
            <ExternalLinkIcon className="h-4 w-4 ml-auto text-muted-foreground" />
          </a>
          
          <a 
            href="https://nextjs.org/docs/app/api-reference/functions/generate-static-params" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center p-4 border rounded-lg hover:bg-muted transition-colors"
          >
            <InfoCircledIcon className="h-5 w-5 mr-2 text-blue-500" />
            <div>
              <h4 className="font-medium">Static Generation</h4>
              <p className="text-sm text-muted-foreground">Learn about static site generation with dynamic routes</p>
            </div>
            <ExternalLinkIcon className="h-4 w-4 ml-auto text-muted-foreground" />
          </a>
          
          <a 
            href="https://nextjs.org/docs/app/api-reference/functions/revalidatePath" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center p-4 border rounded-lg hover:bg-muted transition-colors"
          >
            <InfoCircledIcon className="h-5 w-5 mr-2 text-blue-500" />
            <div>
              <h4 className="font-medium">revalidatePath</h4>
              <p className="text-sm text-muted-foreground">On-demand revalidation by path</p>
            </div>
            <ExternalLinkIcon className="h-4 w-4 ml-auto text-muted-foreground" />
          </a>
          
          <a 
            href="https://nextjs.org/docs/app/api-reference/functions/revalidateTag" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center p-4 border rounded-lg hover:bg-muted transition-colors"
          >
            <InfoCircledIcon className="h-5 w-5 mr-2 text-blue-500" />
            <div>
              <h4 className="font-medium">revalidateTag</h4>
              <p className="text-sm text-muted-foreground">On-demand revalidation by cache tag</p>
            </div>
            <ExternalLinkIcon className="h-4 w-4 ml-auto text-muted-foreground" />
          </a>
        </div>
      </div>
      
      <div className="max-w-4xl mx-auto mt-8 text-center">
        <Link 
          href="/"
          className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Return to Demo Home
        </Link>
      </div>
    </div>
  )
}

