"use client";

import Image from 'next/image';
import Link from 'next/link';

interface LogoProps {
  size?: 'small' | 'medium' | 'large';
  showText?: boolean;
}

export default function Logo({ size = 'medium', showText = true }: LogoProps) {
  const sizes = {
    small: 30,
    medium: 40,
    large: 60
  };

  const imageSize = sizes[size];

  return (
    <Link href="/home" className="flex items-center gap-2">
      <div className="relative">
        <div className="w-[60px] h-[60px] flex items-center justify-center">
          <svg width={imageSize} height={imageSize} viewBox="0 0 600 600" xmlns="http://www.w3.org/2000/svg">
            <path d="M300 50L550 300L300 550L50 300L300 50Z" fill="none" stroke="#C9A55C" strokeWidth="40" />
            <path d="M150 150L50 50M450 150L550 50M150 450L50 550M450 450L550 550" fill="none" stroke="#C9A55C" strokeWidth="40" />
            <circle cx="50" cy="50" r="30" fill="#C9A55C" />
            <circle cx="550" cy="50" r="30" fill="#C9A55C" />
            <circle cx="50" cy="550" r="30" fill="#C9A55C" />
            <circle cx="550" cy="550" r="30" fill="#C9A55C" />
          </svg>
        </div>
      </div>
      {showText && (
        <span className="font-bold text-primary text-lg font-headline">
          Navem Market
        </span>
      )}
    </Link>
  );
}