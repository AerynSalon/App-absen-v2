import React from 'react';

interface HeaderProps {
  activeTab: 'attendance' | 'management';
  onTabChange: (tab: 'attendance' | 'management') => void;
}

const Header: React.FC<HeaderProps> = ({ activeTab, onTabChange }) => {
  const tabClasses = (tabName: 'attendance' | 'management') => 
    `px-4 py-2 text-sm font-medium rounded-md transition-colors duration-200 ${
      activeTab === tabName
        ? 'bg-pink-500 text-white'
        : 'text-gray-600 hover:bg-gray-200'
    }`;

  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-pink-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-6.857 2.143L12 21l-2.143-6.857L3 12l6.857-2.143L12 3z" />
            </svg>
            <h1 className="text-2xl font-bold text-gray-800 ml-3">Aeryn Salon | Absensi Staf</h1>
          </div>
          <nav className="flex items-center space-x-2">
            <button onClick={() => onTabChange('attendance')} className={tabClasses('attendance')}>
              Absensi
            </button>
            <button onClick={() => onTabChange('management')} className={tabClasses('management')}>
              Manajemen Staf
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;