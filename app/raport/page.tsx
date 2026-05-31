'use client';
import { useEffect } from 'react';

export default function RaportRedirect() {
  useEffect(() => {
    window.location.replace('/login');
  }, []);
  return (
    <div className="min-h-screen bg-tosca-900 text-white flex items-center justify-center font-bold">
      Loading...
    </div>
  );
}
