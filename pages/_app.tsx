import "@mantine/core/styles.css";
import Head from "next/head";
import { MantineProvider } from "@mantine/core";
import { theme } from "../theme";

import posthog from "posthog-js"
import { PostHogProvider } from 'posthog-js/react'

if (typeof window !== 'undefined') { // checks that we are client-side
  let NEXT_PUBLIC_POSTHOG_KEY:string = process.env.NEXT_PUBLIC_POSTHOG_KEY!;
  let NEXT_PUBLIC_POSTHOG_HOST:string = process.env.NEXT_PUBLIC_POSTHOG_HOST!;
  posthog.init(NEXT_PUBLIC_POSTHOG_KEY, {
    api_host: NEXT_PUBLIC_POSTHOG_HOST || 'https://eu.i.posthog.com',
    person_profiles: 'always', // or 'identified_only' to create profiles for identified users only
    loaded: (posthog) => {
      if (process.env.NODE_ENV === 'development') posthog.debug() // debug mode in development
    },
  })
}

export default function App({ Component, pageProps }: any) {
  return (
    <PostHogProvider client={posthog}>
      <MantineProvider theme={theme}>
        <Head>
          <title>Parking</title>
          <meta
            name="viewport"
            content="minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no"
          />
          <link rel="shortcut icon" href="/favicon.svg" />
        </Head>
        <Component {...pageProps} />
      </MantineProvider>
    </PostHogProvider>
  );
}
