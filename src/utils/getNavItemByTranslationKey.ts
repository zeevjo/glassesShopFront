import { navbarinterface } from "interfaces";

export function getNavItemByTranslationKey(
  translationKey: string,
  navItems: navbarinterface[]
): navbarinterface | undefined {
  return navItems.find((item) => item.translateJsonKey === translationKey);
}

