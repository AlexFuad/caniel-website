import React, { useState } from 'react';
import { Sidebar } from './Sidebar';
import { TopNavbar } from './TopNavbar';

/**
 * MainLayout Component - Wrapper for admin pages with sidebar and navbar
 */
export function MainLayout({ children, title, subtitle }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex">
      {/* Sidebar */}
      <Sidebar
        isOpen={true}
        mobileIsOpen={mobileMenuOpen}
        onMobileClose={() => setMobileMenuOpen(false)}
      />

      {/* Main content */}
      <div className="flex-1 flex flex-col">
        {/* Top Navbar */}
        <TopNavbar
          title={title}
          subtitle={subtitle}
          onMenuToggle={() => setMobileMenuOpen(true)}
        />

        {/* Page content */}
        <main className="flex-1 p-4 lg:p-6 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
}

export default MainLayout;
