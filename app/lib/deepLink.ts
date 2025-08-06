'use server';

import fs from 'fs';

const exchangeHost = process.env.EXCHANGE_HOST
const timeToLive = 300000  // 5 minutes
let tenants : any
try {
  tenants = JSON.parse(fs.readFileSync('./secrets.json', 'utf8')).tenants;
} catch (err) {
  console.error('Error reading secrets file:', err);
}


export async function confirmDeepLinkStillValid(deepLink:string):Promise<boolean> {
  const parsedDeepLink = new URL(deepLink)
  const vcRequestUrl = parsedDeepLink.searchParams.get('vc_request_url') as string 
  const exchangeTestUrl = vcRequestUrl.split('/').slice(0, -1).join('/')
  const result = await postData(exchangeTestUrl)
  return result.verifiablePresentationRequest
}

export async function getDeepLink(vc:any, credName:string):Promise<any> {
  const tenancy = tenants[credName]
  const tenantName = tenancy.tenantName 
  const tenantAuthToken = tenancy.tenantToken

  const dataToPost = {
    tenantName,
    "data": [
      {
        "retrievalId": "single",
        timeToLive,
        deleteWhenCollected: true,
        vc
      }
    ]
  }
  // deeplinks look like this:
  //https://lcw.app/request.html?issuer=issuer.example.com&auth_type=bearer&challenge=50991c0d-e033-49c4-86aa-7f3620cf6937&vc_request_url=https://issuer.dcconsortium.org/exchange/e63007bc-6065-417c-8ae8-6b8fbc6a79df/50991c0d-e033-49c4-86aa-7f3620cf6937
    const result = await postData(`${exchangeHost}/exchange/setup`, dataToPost, tenantAuthToken)
    const deepLink = result[0].directDeepLink;
    return deepLink     
}

async function postData(url = "", data = {}, tenantAuthToken:string = "notused") {
  const response = await fetch(url, {
    method: "POST",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${tenantAuthToken}`
    },
    redirect: "follow",
    referrerPolicy: "no-referrer",
    body: JSON.stringify(data)
  });
  return response.json();
}





