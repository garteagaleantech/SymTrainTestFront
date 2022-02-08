import { FC } from 'react';
import { Header } from '@components/header';

export const AuthLayout: FC = ({ children }) => (
  <main className="min-h-screen">
    <div className="fixed top-0 left-0 z-10 w-full">
      <Header />
    </div>
    <section className="mt-16 w-full">{children}</section>
  </main>
);
