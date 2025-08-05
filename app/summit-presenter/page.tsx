import Form from './form';
import Image from 'next/image';
import Link from 'next/link';

export default function Page() {
  return (

    <main className="flex flex-col items-center md:h-screen w-screen">
      <div className="mx-auto flex md:gap-4 items-center max-w-screen-lg flex-col space-y-2.5 p-4">
        <div className="text-l md:text-3xl font-medium">Digital Credentials Consortium</div>
        <div className="text-l md:text-3xl font-medium">DCC Summit Presenter Badge</div>
        <Image
          src="/creds/DCCLogo-White.png"
          width={322}
          height={100}
          alt="dark-mode-dcc-logo"
          className="hidden dark:block md:m-10"
        />

        <Image
          className="md:m-10 block dark:hidden"
          src="/creds/DCC-Logo.png"
          alt="light-mode-dcc-logo"
          width={322}
          height={100}
        />
       

   <div>Enter the name of the recipient as it should appear in the credential, their email address, and then click the "Award Credential" button.</div>
     
        

        <p className="max-w-[800px] text-sm md:text-base font-medium">They will be sent an email with instructions to claim their badge.</p>


      </div>
      <div className="md:min-w-[500px] md:mt-4">
        <Form />
      </div>

    </main>

  );
}