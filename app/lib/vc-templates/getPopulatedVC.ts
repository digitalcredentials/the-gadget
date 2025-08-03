
import { lcwExperienceBadge } from "./lcwExperienceBadge"

const getPopulatedVC = (recipientName: string) => {
  const vc = JSON.parse(JSON.stringify(lcwExperienceBadge))
  vc.credentialSubject.name = recipientName
  vc.validFrom = (new Date()).toISOString();
  return vc
}

export { getPopulatedVC };
