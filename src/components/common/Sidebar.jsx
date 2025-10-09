import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Calendar, 
  Zap, 
  Users, 
  Settings 
} from 'lucide-react';

const Sidebar = () => {
  const location = useLocation();
  
  const menuItems = [
    { 
      path: '/dashboard', 
      name: 'Dashboard', 
      icon: LayoutDashboard,
      active: location.pathname === '/dashboard' || location.pathname === '/',
      available: true
    },
    { 
      path: '/bookings', 
      name: 'Bookings', 
      icon: Calendar,
      active: location.pathname.startsWith('/bookings'),
      available: true
    },
    { 
      path: '/stations', 
      name: 'Stations', 
      icon: Zap,
      active: location.pathname.startsWith('/stations'),
      available: true
    },
    { 
      path: '/users', 
      name: 'Users', 
      icon: Users,
      active: location.pathname.startsWith('/users'),
      available: true
    },
  ];

  return (
    <aside className="bg-white border-r border-gray-200 w-64 min-w-64 max-w-64 h-full shadow-sm flex-shrink-0 flex flex-col">
      {/* Logo/Brand Section */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-black rounded flex items-center justify-center">
            <Zap className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-lg font-semibold text-gray-900">EV Admin</h1>
            <p className="text-xs text-gray-500">Charge Point Manager</p>
          </div>
        </div>
      </div>

      {/* Navigation Menu */}
      <nav className="p-4 flex-1 overflow-y-auto">
        <ul className="space-y-1">
          {menuItems.map((item) => {
            if (item.available) {
              return (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className={`flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-150 ${
                      item.active
                        ? 'bg-black text-white'
                        : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                    }`}
                  >
                    <item.icon className="w-5 h-5" />
                    <span>{item.name}</span>
                  </Link>
                </li>
              );
            } else {
              return (
                <li key={item.path}>
                  <div className="flex items-center justify-between px-3 py-2 rounded-lg text-sm font-medium text-gray-400 cursor-not-allowed opacity-60 pointer-events-none">
                    <div className="flex items-center space-x-3">
                      <item.icon className="w-5 h-5" />
                      <span>{item.name}</span>
                    </div>
                    <span className="text-xs bg-gray-200 text-gray-500 px-2 py-1 rounded-full font-medium">
                      Coming Soon
                    </span>
                  </div>
                </li>
              );
            }
          })}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;