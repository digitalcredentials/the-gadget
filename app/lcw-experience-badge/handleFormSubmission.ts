'use server';

import { z } from 'zod';
import { getPopulatedEmail } from './getPopulatedEmail';
import { sendEmail } from '../lib/sendEmail';

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
  collectionPageURL?: string | null;
  data?: {
    recipientName?: string;
    email?: string;
  };
};


export async function handleFormSubmission(prevState: State, formData: FormData) : Promise<State> {

  const recipientName = formData.get('recipientName')
  const email = formData.get('email')
  const data = {recipientName, email}
  const validatedFields = FormSchema.safeParse(data);

  // If form validation fails, return errors early. Otherwise, continue.
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields - complete them so we can get you your credential!"
    };
  }

  try {
    // send email
    const collectionPageURL = `${appHost}/lcw-experience-badge/collect?recipientName=${validatedFields.data.recipientName}`
    const htmlForEmail = getPopulatedEmail(collectionPageURL, validatedFields.data.recipientName)
    await sendEmail({
      html: htmlForEmail, 
      to: validatedFields.data.email, 
      from: process.env.EMAIL_FROM as string, 
      subject: "You've got a credential waiting!"
    })
    return {...data, success: true, collectionPageURL};
  } catch (error) {
    console.log(error)
    return {
      message: 'Error: Failed to issue.',
      success: false,
      ...data
    };
  }
  
}





