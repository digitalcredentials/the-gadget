'use server';

import { z } from 'zod';
import { getPopulatedEmail } from './getPopulatedEmail';
import { sendEmail } from '@/app/lib/sendEmail';
import { getDeepLink } from '@/app/lib/deepLink';
import { getPopulatedVC } from './getPopulatedVC';

import fs from 'fs';

const credName = "summit-presenter";  // for credential configuration data

let credDetails: { from: string, cc?: string, bcc?: string, tenantName: string, tenantToken: string };
try {
  credDetails = JSON.parse(fs.readFileSync(process.cwd() + '/secrets.json', 'utf8')).creds[credName]
} catch (err) {
  console.error('Error reading secrets file:', err);
}

const appHost = process.env.APP_HOST

const FormSchema = z.object({
  recipientName: z.string().trim()
    .min(1, { message: "You must enter a name." }),
  email: z.email()
});

export type State = {
  errors?: {
    recipientName?: string[];
    email?: string[];
  };
  message?: string | null;
  success?: boolean | null;
  collectionPageURL?: string;
  data?: {
    recipientName?: string;
    email?: string;
  };
};


export async function handleFormSubmission(prevState: State, formData: FormData): Promise<State> {

  const recipientName = formData.get('recipientName')
  const email = formData.get('email')
  const data = { recipientName, email }
  const validatedFields = FormSchema.safeParse(data);

  // If form validation fails, return errors early. Otherwise, continue.
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields - complete them so we can get you your credential!"
    };
  }

  try {
    // setup the exchange
    const vc = getPopulatedVC(recipientName as string)

    const deepLink = await getDeepLink(vc, credDetails.tenantName, credDetails.tenantToken)
    const params = new URLSearchParams();
    params.append("deepLink", deepLink);
    params.append("recipientName", validatedFields.data.recipientName);

    // send email
    const collectionPageURL = `${appHost}/summit-presenter/collect?${params.toString()}`
    const htmlForEmail = getPopulatedEmail(collectionPageURL, validatedFields.data.recipientName)
    const cc = credDetails.cc;
    const bcc = credDetails.bcc;
    await sendEmail({
      html: htmlForEmail,
      to: validatedFields.data.email,
      from: credDetails.from,
      subject: "Your DCC Summit 2025 Presenter Digital Badge is Ready",
      ...(cc && { cc }),
      ...(bcc && { bcc })
    })
    return { ...data, success: true, collectionPageURL };

  } catch (error) {
    console.log(error)
    return {
      message: 'Error: Failed to issue.',
      success: false,
      ...data
    };
  }
  
}





