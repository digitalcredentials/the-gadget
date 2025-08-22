# The Gadget

A React app for issuing Verifiable Credentials to the Learner Credential Wallet using the VC-API exchange protocol.

The Gadget makes it a bit easier to set up issuance of credentials for specific projects. So, for example, this was initially set up to issue three credentials:

* DCC Summit Attendance
* DCC Summit Presenter
* LCW Experience Badge

You can therefore see that each has its own directory in the app directory:

* [app/summit-presenter](./app/summit-presenter/)
* [app/summit-attendance](./app/summit-attendance/)
* [app/lcw-experience-badge](./app/lcw-experience-badge/)

We've also added an 'example' directory to make it a bit easier to get started on your own badge:

* [app/example](./app/example/)

Note that the experience badge uses a different flow than the summit badges. Read on to find out more.

Each of the credential directories contains a few thing that can be customized for the specific credential:

### [app/example/page.tsx](./app/example/page.tsx)

This is the landing page for issuing a copy of the credential.

### [app/example/form.tsx](./app/example/form.tsx)

The form in which to enter whatever is needed to issue an instance of the credential, e.g, the recipient's name.

This form is embedded in the above landing page.

### [app/example/handleFormSubmission.ts](./app/example/handleFormSubmission.ts)

A function to handle submission of the form, so basically the code that takes the form data (e.g, recipient name),
constructs the Verifible Credential using that data to populate a VC template,
 sets up a deeplink from which to collect the populated VC, constructs the email notification to send, including The link to the collection page in the email. And adds the deeplink as 
a request parameter on that link to the collection page. 

NOTE: there is an alternate flow, where the deeplink isn't constructed until collection time, but this is not
at all secure because anyone can change the credential data. Look at the [app/lcw-experience-badge](./app/lcw-experience-badge) directory for an example.

### [app/example/getPopulatedEmail.ts](./app/example/getPopulatedEmail.ts)

A function that returns the html to send out in the notification email. It expects whatever data
is needed to populate the template will be passed in on the function call.

### [app/example/getPopulatedVC.ts](./app/example/getPopulatedVC.ts)

A function that returns the verifiable credentil to be issued, with the specific recipient's details already added to the VC. These details are passed into the function when calling it.

### [app/example/collect/page.tsx](./app/example/collect/page.tsx)

A page from which the credential can be collected. A link to this page is included in the email sent out to 
recipients.

To add a new credential, just duplicate one of the existing credential directories, like [app/example/](./app/example), and customize as you like.

You'll also need to set a tenant for each credential:

## Tenancy

You can configure the app to sign each credential with a different signing key (DID).

You'll need to setup tenancy in your [DCC workflow-coordinator](https://github.com/digitalcredentials/workflow-coordinator) and [DCC signing-service](https://github.com/digitalcredentials/signing-service). The READMEs for each explain how to do so.

Once you've got your tenants set up, take a look at [secrets.example.json](./secrets.example.json) file. Rename that file to secrets.json and amend as needed. You'll see that you basically need to make an entry in the tenants section, using the name of the credential as a key, and providing the tenant name and token for each.

You'll also have to set the credential name in the handleFormSubmission.ts file for the specific credential. Set the credName appropriately. See [handleFormSubmission.ts](./app/summit-presenter/handleFormSubmission.ts) for an example.

## CC and BCC

In that same [secrets.example.json](./secrets.example.json) file you can set a cc and bcc field for each credential definition. If set, any credentials sent for that definition will be cc'd and/or bcc'd to the provided addresses.

## Authentication

A rudimentary authentication system has been included that simply checks for emails and passwords in a file called secrets.json

You can see the structure to follow in the [secrets.example.json](./secrets.example.json) file. Rename that file to secrets.json and amend as needed.

In particular, though, you'll need to generate a new AUTH_SECRET which you can do (on a mac) with:

```openssl rand -base64 32``

Once you've got the value, set that in your .env file or in the 'environment' part of your docker compose (like we do in the sample compose files we provide in this repo) or however you set your environment variables, but essentially:

AUTH_SECRET=your-secret-key

## Requirements

You'll need running instances of the [DCC workflow-coordinator](https://github.com/digitalcredentials/workflow-coordinator) which in turn needs an instance of the [DCC transaction-manager](https://github.com/digitalcredentials/transaction-manager) and the [DCC signing-service](https://github.com/digitalcredentials/signing-service). Configure the workflow-coordinator's url in the EXCHANGE_HOST environment variable. See [env.example](./.env.example).

To hopefully make things a bit easier, we've also included two sample docker compose files that start up all the services you need as well as the gadget itself. There is one compose file for localhost and one to run on a server with a domain name. 

## NextJS Stuff

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

