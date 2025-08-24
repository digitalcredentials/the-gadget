import { LinkIcon, PowerIcon } from '@heroicons/react/24/outline';
import { signOut } from '@/auth';
import Link from 'next/link';
import { Metadata } from 'next';
 
export const metadata: Metadata = {
  title: 'Choose a Credential | The Gadget',
};

export default function Home() {
  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
       <div className=" md:text-3xl font-medium">Choose a credential to issue:</div>


    
            <Link
            data-testid="summit-presenter-btn"
            href="/summit-presenter"
            className="flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:p-2 md:px-3"
          >
            
            <p className="hidden md:block dark:text-black">DCC Summit Presenter</p>
          </Link>
         
     
            <Link
            data-testid="summit-attendance-btn"
            href="/summit-attendance"
            className="flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:p-2 md:px-3"
          >
            
            <p className="hidden md:block dark:text-black">DCC Summit Attendance</p>
          </Link>
      

        <div className="flex gap-4 items-center flex-col sm:flex-row">

        </div>
      </main>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
       
              <form
          action={async () => {
            'use server';
            await signOut({ redirectTo: '/' });
          }}
        >
          <button className="flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 dark:bg-white p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3">
            <div className="hidden md:block dark:text-black">Sign Out</div>
          </button>
        </form>
      </footer>
    </div>
  );
}
