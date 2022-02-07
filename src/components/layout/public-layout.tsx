import { FC } from 'react';
import { Header } from '@components/header';

export const PublicLayout: FC = ({ children }) => (
  <main className="flex min-h-screen flex-col gap-y-12">
    <Header />
    <section className="min-h- flex w-full items-center">{children}</section>
  </main>
);
