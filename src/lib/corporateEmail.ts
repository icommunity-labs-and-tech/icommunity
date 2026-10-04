// Mirror of supabase/functions/_shared/freeEmail.ts (server is the source of truth).
const FREE_EMAIL_DOMAINS = new Set([
  "gmail.com", "googlemail.com", "hotmail.com", "hotmail.es", "hotmail.co.uk", "outlook.com", "outlook.es",
  "live.com", "live.es", "msn.com", "yahoo.com", "yahoo.es", "yahoo.co.uk", "ymail.com", "icloud.com", "me.com",
  "mac.com", "aol.com", "gmx.com", "gmx.es", "gmx.net", "gmx.de", "web.de", "mail.com", "protonmail.com",
  "proton.me", "pm.me", "zoho.com", "zohomail.com", "yandex.com", "yandex.ru", "mail.ru", "tutanota.com",
  "tuta.io", "hey.com", "fastmail.com", "qq.com", "163.com", "126.com", "terra.es", "telefonica.net",
  "movistar.es", "orange.es", "wanadoo.es", "ya.com", "libero.it", "laposte.net", "free.fr", "t-online.de",
  "rocketmail.com", "inbox.com", "mailinator.com", "guerrillamail.com", "10minutemail.com", "tempmail.com",
  "yopmail.com", "temp-mail.org",
]);

export const isCorporateEmail = (email: string): boolean => {
  const domain = email.split("@")[1]?.toLowerCase().trim();
  return !!domain && !FREE_EMAIL_DOMAINS.has(domain);
};
