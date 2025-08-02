
export const vcTemplate = {
    "@context": [
        "https://www.w3.org/ns/credentials/v2",
        "https://purl.imsglobal.org/spec/ob/v3p0/context-3.0.2.json"
    ],
    "id": "urn:uuid:951b475e-b795-43bc-ba8f-a2d01efd2eb1",
    "type": [
        "VerifiableCredential",
        "OpenBadgeCredential"
    ],
    "issuer": {
        "id": "did:key:z6MkhVTX9BF3NGYX6cc7jWpbNnR7cAjH8LUffabZP8Qu4ysC",
        "type": ["Profile"],
        "name": "Digital Credentials Consortium",
        "url": "https://digitalcredentials.mit.edu/",
        "image": {
            "id": "https://github.com/user-attachments/assets/dec7ea33-912f-4fc8-af44-9d3f114bea0b",
            "type": "Image"
        }
    },
    "validFrom": "2020-02-26T00:00:00Z",
    "name": "DCC Summit Presenter",
    "credentialSubject": {
        "name": "",
        "type": ["AchievementSubject"],
        "achievement": {
            "id": "urn:uuid:142e9fe0-d7cd-46f2-bcde-78e8d0acfaad",
            "type": ["Achievement"],
            "achievementType": "Badge",
            "criteria": {
              "narrative": "presented"
            },
            "image": {
              "id": "https://github.com/user-attachments/assets/3042a8c8-4835-4340-91b0-aa2cec3b2cf2",
              "type": "Image"
            },
            "description": "presented.",
            "name": "DCC Summit Presenter"
        }
    }
}


