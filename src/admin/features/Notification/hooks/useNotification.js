import { useState, useRef, useEffect } from 'react';

export function useNotifications() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('all');
  const dropdownRef = useRef(null);

  // Sample or API-driven Notification Data
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      name: 'John Dow',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100',
      action: 'assigned a task "Design landing page" to you.',
      time: '2 mins ago',
      read: false,
    },
    {
      id: 2,
      name: 'Sarah Mitchell',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100',
      action: 'Mentioned you in a comment on "Q1 Marketing Campaign".',
      time: '15 mins ago',
      read: true,
    },
    {
      id: 3,
      name: 'Alex Johnson',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100',
      action: 'Moved the project "Website Redesign" to In Progress.',
      time: '2 hours ago',
      read: false,
    },
    {
      id: 1,
      name: 'John Dow',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100',
      action: 'assigned a task "Design landing page" to you.',
      time: '2 mins ago',
      read: false,
    },
    {
      id: 2,
      name: 'Sarah Mitchell',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100',
      action: 'Mentioned you in a comment on "Q1 Marketing Campaign".',
      time: '15 mins ago',
      read: true,
    },
    {
      id: 3,
      name: 'Alex Johnson',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100',
      action: 'Moved the project "Website Redesign" to In Progress.',
      time: '2 hours ago',
      read: false,
    },
    {
      id: 1,
      name: 'John Dow',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100',
      action: 'assigned a task "Design landing page" to you.',
      time: '2 mins ago',
      read: false,
    },
    {
      id: 2,
      name: 'Sarah Mitchell',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100',
      action: 'Mentioned you in a comment on "Q1 Marketing Campaign".',
      time: '15 mins ago',
      read: true,
    },
    {
      id: 3,
      name: 'Alex Johnson',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100',
      action: 'Moved the project "Website Redesign" to In Progress.',
      time: '2 hours ago',
      read: false,
    },
  ]);

  // Click outside listener logic
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Filtered notifications based on active tab
  const filteredNotifications = notifications.filter((item) => {
    if (activeTab === 'unread') return !item.read;
    return true;
  });

  const unreadCount = notifications.filter((n) => !n.read).length;

  const markAllAsRead = () => {
    setNotifications(notifications.map((n) => ({ ...n, read: true })));
  };

  const toggleDropdown = () => setIsOpen((prev) => !prev);

  return {
    isOpen,
    dropdownRef,
    activeTab,
    setActiveTab,
    filteredNotifications,
    unreadCount,
    markAllAsRead,
    toggleDropdown,
  };
}