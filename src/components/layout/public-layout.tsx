import { FC } from 'react';
import { Header } from '@components/header';

export const PublicLayout: FC = ({ children }) => (
  <main className="min-h-screen">
    <Header />
    <section className="h-full w-full">{children}</section>
  </main>
);
