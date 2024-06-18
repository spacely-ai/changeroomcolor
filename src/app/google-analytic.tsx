import Script from "next/script";

// https://developers.google.com/analytics/devguides/collection/gtagjs/pages
export const pageview = (url: string) => {
  if (typeof window === "undefined" || !window.gtag) {
    return;
  }
  window.gtag("config", process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID, {
    page_path: url
  });
};

// https://developers.google.com/analytics/devguides/collection/gtagjs/events
export const event = (action: string, body: any = {}) => {
  if (typeof window === "undefined" || !window.gtag) {
    return;
  }
  window?.gtag("event", action, body);
};

const GoogleAnalytics = () => (
  <>
    <Script
      async
      src={`https://www.googletagmanager.com/gtag/js? 
      id=${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}`}
    ></Script>
    <Script
      id="google-analytics"
      dangerouslySetInnerHTML={{
        __html: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', '${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}');
        `
      }}
    ></Script>
  </>
);
export default GoogleAnalytics;
