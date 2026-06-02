import type { AppProps } from 'next/app';
import { QuizStoreProvider } from '@/modules/quiz';
import { MainLayout } from '@/layouts/MainLayout';
import '@/styles/globals.css';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <QuizStoreProvider>
      <MainLayout>
        <Component {...pageProps} />
      </MainLayout>
    </QuizStoreProvider>
  );
}
