export {};

declare global {
  interface Window {
    gtag: any;
    Intercom: any;
    dataLayer: any;
    intercomSettings: any;
    fbq: any; 
  }
}
