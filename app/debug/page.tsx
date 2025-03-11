import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { ExclamationTriangleIcon, InfoCircledIcon, ExternalLinkIcon } from "@radix-ui/react-icons"

export default function DebugPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold mb-6 text-center">Next.js Rendering Methods Guide</h2>
        
        <Alert className="mb-8 border-amber-200 bg-amber-50 dark:bg-amber-950/20">
          <ExclamationTriangleIcon className="h-5 w-5 text-amber-600" />
          <AlertTitle className="text-amber-600">Production Mode Required</AlertTitle>
          <AlertDescription>
            ISR (Incremental Static Regeneration) features only work in production builds. 
            Run <code className="bg-muted px-1 py-0.5 rounded">npm run build</code> followed by <code className="bg-muted px-1 py-0.5 rounded">npm start</code> (or equivalent commands for your package manager) to see ISR in action.
          </AlertDescription>
        </Alert>
        
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Rendering Methods Explained</CardTitle>
            <CardDescription>Understanding the different approaches and when to use them</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="p-4 border rounded-lg bg-blue-50 dark:bg-blue-950/20 border-blue-200">
              <h3 className="font-semibold text-blue-700 dark:text-blue-300 mb-2">Client-Side Rendering (CSR)</h3>
              <p className="text-sm">
                Data is fetched by the browser after the page loads using JavaScript.
              </p>
              <ul className="text-sm mt-2 space-y-1 list-disc pl-5">
                <li>Best for: Private, user-specific data or frequently changing content</li>
                <li>Pros: Reduces server load, interactive without full page refresh</li>
                <li>Cons: Initial load may show loading states, SEO challenges</li>
              </ul>
            </div>
            
            <div className="p-4 border rounded-lg bg-green-50 dark:bg-green-950/20 border-green-200">
              <h3 className="font-semibold text-green-700 dark:text-green-300 mb-2">Time-Based ISR</h3>
              <p className="text-sm">
                Pages are statically generated and then regenerated after a specified interval.
              </p>
              <ul className="text-sm mt-2 space-y-1 list-disc pl-5">
                <li>Best for: Content that changes periodically but doesn&apos;t need real-time updates</li>
                <li>Pros: Fast page loads, reduced server load, good SEO</li>
                <li>Cons: Data can be stale between regeneration intervals</li>
              </ul>
            </div>
            
            <div className="p-4 border rounded-lg bg-purple-50 dark:bg-purple-950/20 border-purple-200">
              <h3 className="font-semibold text-purple-700 dark:text-purple-300 mb-2">On-Demand ISR</h3>
              <p className="text-sm">
                Pages are statically generated and then regenerated when explicitly requested.
              </p>
              <ul className="text-sm mt-2 space-y-1 list-disc pl-5">
                <li>Best for: Content that changes infrequently or on specific events</li>
                <li>Pros: Fast page loads, data freshness control, good SEO</li>
                <li>Cons: Requires implementation of revalidation triggers</li>
              </ul>
            </div>
            
            <div className="p-4 border rounded-lg bg-orange-50 dark:bg-orange-950/20 border-orange-200">
              <h3 className="font-semibold text-orange-700 dark:text-orange-300 mb-2">Server-Side Rendering (SSR)</h3>
              <p className="text-sm">
                Data is fetched on the server for each request.
              </p>
              <ul className="text-sm mt-2 space-y-1 list-disc pl-5">
                <li>Best for: Pages that need fresh data on every request or need SEO</li>
                <li>Pros: Always fresh data, good SEO, secure data fetching</li>
                <li>Cons: Slower than static pages, higher server load</li>
              </ul>
            </div>
          </CardContent>
        </Card>
        
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Troubleshooting Common Issues</CardTitle>
            <CardDescription>Solutions for frequent challenges</CardDescription>
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
        
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Official Documentation</CardTitle>
            <CardDescription>Learn more from Next.js resources</CardDescription>
          </CardHeader>
          <CardContent>
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
          </CardContent>
        </Card>
        
        <div className="text-center">
          <Link 
            href="/"
            className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Return to Demo
          </Link>
        </div>
      </div>
    </div>
  )
}

