import React, { useState } from 'react';
import { Link } from 'react-router-dom';
// import './Header.css';

const Header = ({ user, onMenuClick, onLogout }) => {
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const toggleProfileMenu = () => {
    setShowProfileMenu(!showProfileMenu);
  };

  const handleLogout = async () => {
    try {
      await onLogout();
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <header className="admin-header">
      <div className="header-content">
        {/* Mobile menu button */}
        <button
          className="menu-toggle"
          onClick={onMenuClick}
          aria-label="Toggle sidebar"
        >
          <i className="fas fa-bars"></i>
        </button>

        {/* Header title */}
        <div className="header-title">
          <h1>Admin Dashboard</h1>
        </div>

        {/* Header actions */}
        <div className="header-actions">
          {/* Search */}
          <div className="header-search">
            <input
              type="text"
              placeholder="Search..."
              className="search-input"
            />
            <button className="search-btn">
              <i className="fas fa-search"></i>
            </button>
          </div>

          {/* Notifications */}
          <div className="header-notification">
            <button className="notification-btn">
              <i className="fas fa-bell"></i>
              <span className="notification-badge">3</span>
            </button>
          </div>

          {/* User Profile */}
          <div className="header-profile">
            <button
              className="profile-btn"
              onClick={toggleProfileMenu}
            >
              <div className="profile-avatar">
                {user?.profile?.avatar ? (
                  <img
                    src={user.profile.avatar}
                    alt={user.username}
                  />
                ) : (
                  <div className="avatar-placeholder">
                    {user?.username?.charAt(0).toUpperCase()}
                  </div>
                )}
              </div>
              <div className="profile-info">
                <span className="profile-name">
                  {user?.profile?.firstName
                    ? `${user.profile.firstName} ${user.profile.lastName || ''}`.trim()
                    : user?.username
                  }
                </span>
                <span className="profile-role">
                  {user?.role?.charAt(0).toUpperCase() + user?.role?.slice(1)}
                </span>
              </div>
              <i className="fas fa-chevron-down"></i>
            </button>

            {/* Profile dropdown menu */}
            {showProfileMenu && (
              <div className="profile-menu">
                <Link
                  to="/admin/profile"
                  className="profile-menu-item"
                  onClick={() => setShowProfileMenu(false)}
                >
                  <i className="fas fa-user"></i>
                  Profile
                </Link>
                <Link
                  to="/admin/settings"
                  className="profile-menu-item"
                  onClick={() => setShowProfileMenu(false)}
                >
                  <i className="fas fa-cog"></i>
                  Settings
                </Link>
                <div className="profile-menu-divider"></div>
                <button
                  className="profile-menu-item logout-btn"
                  onClick={handleLogout}
                >
                  <i className="fas fa-sign-out-alt"></i>
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile overlay for profile menu */}
      {showProfileMenu && (
        <div
          className="profile-menu-overlay"
          onClick={() => setShowProfileMenu(false)}
        />
      )}
    </header>
  );
};

export default Header;
