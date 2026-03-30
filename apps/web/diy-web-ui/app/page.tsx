
import "./globals.css"
export default function MarketingPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-4xl font-bold">DIY Web Platform</h1>
      <p className="mt-4 text-gray-600">Enter your subdomain to see your AI-generated site.</p>
      <div className="mt-8 p-4 border rounded bg-gray-50">
        Example: <code className="font-bold">vantage-estates.localhost:3000</code>
      </div>
    </div>
  );
}