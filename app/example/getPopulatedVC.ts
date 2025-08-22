
export const vcTemplate = {
   "@context": [
       "https://www.w3.org/ns/credentials/v2",
       "https://purl.imsglobal.org/spec/ob/v3p0/context-3.0.3.json",
       "https://purl.imsglobal.org/spec/ob/v3p0/extensions.json",
       "https://w3id.org/security/suites/ed25519-2020/v1"
   ],
   "id": "urn:uuid:54BBF038-3826-4CD6-B1CC-B3612F239557",
   "type": [
       "VerifiableCredential",
       "OpenBadgeCredential"
   ],
   "credentialSubject": {
       "type": [
           "AchievementSubject"
       ],
       "activityStartDate": "2025-06-26T00:00:00Z",
       "activityEndDate": "2026-06-27T00:00:00Z",
       "identifier": [
           {
               "type": "IdentityObject",
               "identityHash": "Taylor Tuna",
               "identityType": "name",
               "hashed": false,
               "salt": "not-used"
           }
       ],
       "achievement": {
           "id": "urn:uuid:BFD1E03B-26C2-4151-82C6-12CC19982BBC",
           "type": [
               "Achievement"
           ],
           "image": {
               "id": "https://upload.wikimedia.org/wikipedia/commons/3/32/Verified-badge.png",
               "type": "Image"
           },
           "achievementType": "Badge",
           "criteria": {
               "id": "urn:uuid:C0571026-DDEB-4A7E-813D-8445663C7A35",
               "narrative": ""
           },
           "description": "A badge, a badge, a badge. Yeah, yeah, yeah.",
           "name": "What a Badge: 2025!"
       }
   },
   "validFrom": "2025-06-26T15:00:00Z",
   "issuer": {
       "id": "did:key:z6Mkp5vpKbxkd7RbtkvahigNzX2uNUsRc71bwtFLWMZuYFMa",
       "type": [
           "Profile"
       ],
       "name": "The Example People"
   }
}


const getPopulatedVC = (recipientName: string) => {
  const vc = JSON.parse(JSON.stringify(vcTemplate))
  vc.credentialSubject.identifier[0].identityHash = recipientName
  vc.credentialSubject.achievement.criteria.narrative = `${recipientName} attended the Digital Credentials Summit on June 26, 2025 in Delft, Netherlands. ${recipientName} gave a presentation to Summit attendees on an area of interest in the domain of digital credentials in higher education.`
  // we want the summit credentials date to be the date of the summit.
 // vc.validFrom = (new Date()).toISOString();
  return vc
}

export { getPopulatedVC };