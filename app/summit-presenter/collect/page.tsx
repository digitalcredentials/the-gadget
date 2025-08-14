import { Suspense } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import QRCode from "react-qr-code";
import { confirmDeepLinkStillValid } from '@/app/lib/deepLink';

async function DeepLinks({ deepLink, recipientName }: { recipientName: string, deepLink: string }) {

  //const deepLink = `https://lcw.app/request.html?issuer=issuer.example.com&auth_type=bearer&challenge=${transactionId}&vc_request_url=https://issuer.dcconsortium.org/exchange/${exchangeId}/${transactionId}`


  return (
    <div className="flex flex-col gap-3 m-10">
      <div className="max-w-[900px] text-left text-l md:text-3xl font-medium mb-5">{`Hello ${recipientName}!`}</div>
      <div className="max-w-[900px] text-left text-sm md:text-lg font-medium">
        This is where you can claim your DCC Summit Presenter Badge.</div>
        <div className="max-w-[900px] text-left text-sm md:text-lg font-medium">
          Here’s how it works:
      </div>
      <div className="max-w-[900px] text-left text-sm md:text-base font-medium">
        1. If you haven't installed the Learner Credential Wallet yet, <Link className="font-extrabold text-gray-800 dark:text-white transition-colors hover:bg-gray-200" href="https://lcw.app/" target="_blank">install on your mobile device</Link>, follow set-up instructions in the app and return here for next steps.
      </div>
      <div className="max-w-[900px] text-left text-sm md:text-base font-medium">
        2. If you are viewing this page on your phone then click here to add your credential to the Learner Credential Wallet:<br />
      </div>
      <div className="m-5 flex justify-center gap-4">
        <Link href={`${deepLink}`} className="flex h-10 items-center rounded-lg bg-[#429EA6] px-4 text-sm font-medium text-gray-800 transition-colors hover:bg-gray-200">Add to LCW</Link>
      </div>
      <div className="max-w-[900px] text-left text-sm md:text-base font-medium">
      If you are viewing this page on a computer screen, scan this QR from your phone camera:

      </div>
      <div className="mt-6 mb-5 flex justify-center align-middle">
        <div style={{ height: "auto", margin: "0 auto", maxWidth: 128, width: "100%" }}>
          <QRCode
            size={256}
            style={{ height: "auto", maxWidth: "100%", width: "100%" }}
            value={deepLink}
            viewBox={`0 0 256 256`}
          />
        </div>
      </div>
      <div className="max-w-[900px] text-left text-sm md:text-base font-medium">
        3. This will open the wallet app where you will see an offer to accept this badge.
        <div className="mx-6 mt-2 p-3 bg-slate-100 dark:text-black italic font-sans text-sm"> In the background, the wallet will tell the issuing system the digital identity associated with your wallet. Then, the issuer will add that identity to your badge data, digitally sign it and send it back to your wallet where you can choose to accept it.
        </div>
      </div>
      <div className="max-w-[900px] text-left text-sm md:text-base font-medium">
        4. Once you have accepted your badge, click on “Done” to return to the home screen where you will see your badge listed. 
      </div>
      <div className="max-w-[900px] text-left text-sm md:text-base font-medium">
      5. If you would like to share your badge on the web, click on your badge and look for three vertical dots in the top right corner. When you click on the dots, you will see the option to share. This will take you to a screen where you can choose to create a public url to share your badge with anyone and an option to post the badge on your LinkedIn profile. 
      </div>



            <div className="max-w-[800px] text-base md:text-base font-bold mt-8 md:mt-10 mb-1 md:mb-1" id="explainer">
        How does this work?
      </div>

      <div className="max-w-[800px] text-sm md:text-base font:medium flex flex-col gap-3 space-y-2.5">
        <p>
        The Learner Credential Wallet will create a default profile with a digital identity called a Decentralized Identifier (DID). When you claim your badge – by clicking on a link or scanning the QR code with your device’s camera or the from the LCW’s “Add Credential” screen (“Scan QR code” button) – the link and QR code will open the LCW. Almost instantaneously you will be asked if you want to accept the LCW badge.
        </p>

        <p>
       When you click on the link to accept, the DCC issuing system sends a request to the wallet that tells it that it has a credential to send. The wallet sends the DID for your profile back to the issuing system. Then the issuing system compiles the awarded badge with your DID, digitally signs the badge, and sends it to the wallet for you to accept.    </p>

        <p>
          When you accept it, you will see a green check mark indicating that it has been verified. This means that:
        </p>

        <ul className="list-disc ml-5 p-1">
        <li>the badge was signed properly</li>
        <li>the badge data hasn’t been changed since it was signed.</li>
</ul>

        <p>
          The LCW also checks that
        </p>

        <ul className="list-disc ml-5 p-1">
          <li>the identity issuer of the badge has been substantiated (that is a DID too!)</li>
          <li>the badge hasn’t been revoked</li>
          <li>it hasn’t expired</li>
        </ul>

        <p>
        Your badge doesn’t exist until you request it. Once it is in your wallet, it is yours to share with others however you choose.
        </p>

        <p>
         To share your badge, click “Done” and go to the home screen. Click on your badge and look for three vertical dots in the top right corner. When you click on the dots, you will see the option to share. This will take you to a screen where you can choose to create a public url to share your badge with anyone and an option to post the badge on your LinkedIn profile.
        </p>

        <p className='font-extrabold'>
          Note about Privacy:
        </p>

        <p>
         The DCC does not save any of your information when creating and issuing this badge. The LCW does not track any use of the app or where you share your public link. 
         </p><p>
The link is hosted at our web verifier app called VerifierPlus where your badge can be verified by anyone in real-time. This website will hold the badge data for as long as the link exists. However, you can destroy the link at any time – by locating it on the share screen for your badge – and this will delete it from VerifierPlus too. 
 </p><p>
As with the LCW, VerifierPlus does not track where you share this link. The DCC believes that we should all have unfettered access to our data and be able to share it privately. So, we try our best to make that possible with our software.
     </p>

      </div>

    </div>)
}

export default async function Page(props: {
  searchParams?: Promise<{
    recipientName?: string;
    deepLink?: string;
  }>;
}) {

  const searchParams = await props.searchParams;
  const recipientName = searchParams?.recipientName || '';
  const deepLink = searchParams?.deepLink || '';

  const isDeepLinkValid = await confirmDeepLinkStillValid(deepLink);

  return (
  
    <main className="flex flex-col items-center md:h-screen w-screen">
      <div className="mx-auto flex md:gap-4 items-center max-w-screen-lg flex-col space-y-2.5 p-4">
    
        <Image
           src="/dcc-logo-dark.png"
           width={322}
           height={100}
           alt="dark-mode-dcc-logo"
           className="hidden dark:block md:m-10"
         />
 
        <Image
           className="md:m-10 block dark:hidden"
           src="/dcc-logo-light.png"
           alt="light-mode-dcc-logo"
           width={322}
           height={100}
         />

        <div className="text-l md:text-3xl font-medium">DCC Summit Presenter Badge</div>

      </div>
      <div className="md:min-w-[500px]">
        <Suspense>
            {isDeepLinkValid ? 
          <DeepLinks recipientName={recipientName} deepLink={deepLink} />
          :
          'Sorry the link to collect your credential has expired or has been used. Please email us to get a new link.'}
        </Suspense>
      </div>
    </main>
  );
}
