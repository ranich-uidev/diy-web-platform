import { Hero01 } from "packages/ui/src";
import DatabaseConnection from "./database-connetion";



export default function Home() {
  
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
       <Hero01 title="Welcome to DIY Platform" subtitle="this is to test" />
      <div className="container mx-auto p-8">
        <DatabaseConnection />
      </div>

      </main>
    </div>
  );
}
