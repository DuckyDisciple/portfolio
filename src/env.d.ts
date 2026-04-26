/// <reference types="astro/client" />

interface GrecaptchaEnterprise {
  ready: (callback: () => void) => void;
  execute: (siteKey: string, options: { action: string }) => Promise<string>;
}

interface Window {
  grecaptcha: GrecaptchaEnterprise;
}
