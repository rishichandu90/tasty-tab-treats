
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar: React.FC = () => {
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <nav className="py-4 border-b border-amber-200">
      <div className="container px-4 mx-auto flex flex-wrap items-center justify-between">
        <div className="w-full flex justify-center md:justify-start">
          <ul className="flex flex-wrap items-center justify-center space-x-1 md:space-x-4">
            <li>
              <Link 
                to="/" 
                className={`nav-link ${isActive('/') ? 'active' : ''}`}
              >
                Home
              </Link>
            </li>
            <li>
              <Link 
                to="/all-foods" 
                className={`nav-link ${isActive('/all-foods') ? 'active' : ''}`}
              >
                All Food Items
              </Link>
            </li>
            <li>
              <Link 
                to="/rishi-foods" 
                className={`nav-link ${isActive('/rishi-foods') ? 'active' : ''}`}
              >
                Rishi's Food
              </Link>
            </li>
            <li>
              <Link 
                to="/atthamma-foods" 
                className={`nav-link ${isActive('/atthamma-foods') ? 'active' : ''}`}
              >
                Atthamma's Food
              </Link>
            </li>
            <li>
              <Link 
                to="/amma-foods" 
                className={`nav-link ${isActive('/amma-foods') ? 'active' : ''}`}
              >
                Amma's Food
              </Link>
            </li>
            <li>
              <Link 
                to="/admin" 
                className={`nav-link ${isActive('/admin') ? 'active' : ''}`}
              >
                Admin
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
