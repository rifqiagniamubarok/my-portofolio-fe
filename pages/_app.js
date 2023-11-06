import '@/styles/globals.css';
import { NextUIProvider } from '@nextui-org/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import NextNProgress from 'nextjs-progressbar';

const queryClient = new QueryClient();
export default function App({ Component, pageProps }) {
  return (
    <QueryClientProvider client={queryClient}>
      <NextUIProvider>
        <NextNProgress color="#2193B0" height={2} showOnShallow={true} />
        <Component {...pageProps} />
      </NextUIProvider>
    </QueryClientProvider>
  );
}
