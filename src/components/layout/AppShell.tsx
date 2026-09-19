import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { TopHeader } from './TopHeader';
import { MobileNav } from './MobileNav';
import { GlobalSearchModal } from '../common/GlobalSearchModal';
import { UploadModal } from '../common/UploadModal';
import { ScannerModal } from '../common/ScannerModal';
import { FocusModeModal } from '../common/FocusModeModal';
import { NotificationDrawer } from '../common/NotificationDrawer';
import { ToastContainer } from '../common/ToastContainer';

export const AppShell: React.FC = () => {
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-slate-50 dark:bg-[#0B0F19] text-slate-900 dark:text-slate-100 font-sans">
      {/* Sidebar for Desktop & Tablets */}
      <Sidebar onOpenNotifications={() => setIsNotificationsOpen(true)} />

      {/* Main content column */}
      <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden">
        <TopHeader onOpenNotifications={() => setIsNotificationsOpen(true)} />

        <main className="flex-1 overflow-y-auto pb-20 md:pb-6 relative">
          <Outlet />
        </main>
      </div>

      {/* Mobile Bottom Navigation */}
      <MobileNav />

      {/* Global Application Modals & Drawers */}
      <GlobalSearchModal />
      <UploadModal />
      <ScannerModal />
      <FocusModeModal />
      <NotificationDrawer
        isOpen={isNotificationsOpen}
        onClose={() => setIsNotificationsOpen(false)}
      />
      <ToastContainer />
    </div>
  );
};
