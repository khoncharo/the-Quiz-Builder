import Link from 'next/link';
import { type ReactNode } from 'react';
import { ROUTES } from '@/routes';

interface IMainLayoutProps {
  children: ReactNode;
}

export function MainLayout({ children }: IMainLayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white border-b px-6 py-3 flex items-center justify-center">
        <Link href={ROUTES.QUIZZES} className="font-semibold text-blue-600 text-lg tracking-tight">
          Quiz Builder
        </Link>
      </nav>
      <div>{children}</div>
    </div>
  );
}
