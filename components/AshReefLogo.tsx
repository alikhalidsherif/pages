'use client';

import Image from 'next/image';

export default function AshReefLogo() {
  return (
    <div className="w-full h-full relative hover:opacity-80 transition-opacity">
      <Image
        src="/logo.svg"
        alt="AshReef Labs Logo"
        width={120}
        height={120}
        className="w-full h-full"
        priority
      />
    </div>
  );
}
