'use client';

import React from 'react';

export default function TopBar() {
  return (
    <div className="bg-[#1D2B44] py-2.5 border-b border-[#2A3D5A]">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="flex justify-center items-center text-sm gap-8 flex-wrap">
          {/* Contact info - centered */}
          <div className="flex gap-8 items-center flex-wrap justify-center">
            <a href="mailto:info@cassation.cd" className="flex items-center gap-2 text-[#F8F9FA]/80 hover:text-[#C0962E] transition-colors duration-300">
              <span className="text-[#C0962E]">✉</span>
              <span>info@cassation.cd</span>
            </a>
            <a href="tel:+243818887777" className="flex items-center gap-2 text-[#F8F9FA]/80 hover:text-[#C0962E] transition-colors duration-300">
              <span className="text-[#C0962E]">☎</span>
              <span>+243 818 887 777</span>
            </a>
            <div className="flex items-center gap-2 text-[#F8F9FA]/60">
              <span className="text-[#C0962E]">🕐</span>
              <span>Lun-Ven: 8h00 - 16h00</span>
            </div>
          </div>

          {/* Right side - Social media */}
          <div className="flex gap-4">
            <a 
              href="https://facebook.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-[#F8F9FA]/60 hover:text-[#C0962E] transition-colors duration-300"
              aria-label="Facebook"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </a>
            <a 
              href="https://twitter.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-[#F8F9FA]/60 hover:text-[#C0962E] transition-colors duration-300"
              aria-label="Twitter"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2s9 5 20 5a9.5 9.5 0 00-9-5.5c4.75 2.25 7-7 7-7a10.6 10.6 0 01-9-5.5z"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
