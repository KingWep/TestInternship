import { useState, useRef, useEffect, useMemo, useCallback } from 'react';
import { useOrdersQuery } from '../../../../queries/orders/useOrderQueries';
import { useProductsQuery } from '../../../../queries/products/useProductQueries';
import { useNavigate } from 'react-router-dom';

const NOTIFICATIONS_KEY = 'admin_notifications';
const STOCK_STATES_KEY = 'admin_stock_states';
const RETENTION_MS = 7 * 24 * 60 * 60 * 1000;

export function useNotifications() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [notifications, setNotifications] = useState([]);
  const [isInitialized, setIsInitialized] = useState(false);

  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  const { data: orders = [] } = useOrdersQuery();
  const { data: products = [] } = useProductsQuery();

  useEffect(() => {
    try {
      const raw = localStorage.getItem(NOTIFICATIONS_KEY);
      const stored = raw ? JSON.parse(raw) : [];
      const safeStored = Array.isArray(stored) ? stored : [];
      const now = Date.now();

      const valid = safeStored.filter((notification) => {
        if (
          !notification ||
          !notification.id ||
          !notification.createdAt
        ) {
          return false;
        }

        const createdAt = new Date(notification.createdAt).getTime();

        if (Number.isNaN(createdAt)) {
          return false;
        }

        return now - createdAt <= RETENTION_MS;
      });

      setNotifications(valid);
      localStorage.setItem(
        NOTIFICATIONS_KEY,
        JSON.stringify(valid)
      );
    } catch (error) {
      console.error(
        'Error loading notifications from localStorage',
        error
      );

      setNotifications([]);
    } finally {
      setIsInitialized(true);
    }
  }, []);

  useEffect(() => {
    if (!isInitialized) return;

    try {
      localStorage.setItem(
        NOTIFICATIONS_KEY,
        JSON.stringify(notifications)
      );
    } catch (error) {
      console.error(
        'Error saving notifications to localStorage',
        error
      );
    }
  }, [notifications, isInitialized]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener(
        'mousedown',
        handleClickOutside
      );
    };
  }, []);

  useEffect(() => {
    if (!isInitialized) return;

    if (!Array.isArray(orders) && !Array.isArray(products)) {
      return;
    }

    setNotifications((prev) => {
      const existingIds = new Set(
        prev.map((notification) => notification.id)
      );

      const updated = [...prev];
      let hasChanges = false;

      if (Array.isArray(orders)) {
        orders.forEach((order) => {
          if (!order?.id) return;

          const stableId = `order-${order.id}`;

          if (existingIds.has(stableId)) {
            return;
          }

          if (!order.createdAt) {
            return;
          }

          updated.push({
            id: stableId,
            type: 'order',
            orderId: order.id,
            orderNo: order.orderNo || order.id,
            totalAmount: order.totalAmount || 0,
            createdAt: order.createdAt,
            read: false,
          });

          existingIds.add(stableId);
          hasChanges = true;
        });
      }

      if (Array.isArray(products) && products.length > 0) {
        let stockStates = {};

        try {
          const raw = localStorage.getItem(STOCK_STATES_KEY);
          const parsed = raw ? JSON.parse(raw) : {};

          if (
            parsed &&
            typeof parsed === 'object' &&
            !Array.isArray(parsed)
          ) {
            stockStates = parsed;
          }
        } catch (error) {
          stockStates = {};
        }

        let stockStatesChanged = false;

        products.forEach((product) => {
          if (!product?.id) return;

          const productId = product.id;
          const stock = Number(product.stockQuantity ?? 0);

          let currentState = 'normal';

          if (stock === 0) {
            currentState = 'out_of_stock';
          } else if (stock > 0 && stock < 10) {
            currentState = 'low_stock';
          }

          const isFirstObservation = !(
            productId in stockStates
          );

          if (isFirstObservation) {
            stockStates[productId] = currentState;
            stockStatesChanged = true;
            return;
          }

          const previousState = stockStates[productId];

          if (currentState === previousState) {
            return;
          }

          stockStates[productId] = currentState;
          stockStatesChanged = true;

          if (currentState === 'low_stock') {
            const timestamp = Date.now();
            const notificationId =
              `product-low-stock-${productId}-${timestamp}`;

            updated.push({
              id: notificationId,
              type: 'low_stock',
              productId,
              name: product.name || '',
              stockQuantity: stock,
              createdAt: new Date(timestamp).toISOString(),
              read: false,
            });

            existingIds.add(notificationId);
            hasChanges = true;
          }

          if (currentState === 'out_of_stock') {
            const timestamp = Date.now();
            const notificationId =
              `product-out-stock-${productId}-${timestamp}`;

            updated.push({
              id: notificationId,
              type: 'out_of_stock',
              productId,
              name: product.name || '',
              stockQuantity: 0,
              createdAt: new Date(timestamp).toISOString(),
              read: false,
            });

            existingIds.add(notificationId);
            hasChanges = true;
          }
        });

        if (stockStatesChanged) {
          try {
            localStorage.setItem(
              STOCK_STATES_KEY,
              JSON.stringify(stockStates)
            );
          } catch (error) {
            console.error(
              'Error saving stock states',
              error
            );
          }
        }
      }

      if (!hasChanges) {
        return prev;
      }

      updated.sort(
        (a, b) =>
          new Date(b.createdAt).getTime() -
          new Date(a.createdAt).getTime()
      );

      return updated;
    });
  }, [orders, products, isInitialized]);

  const filteredNotifications = useMemo(() => {
    return notifications.filter((notification) => {
      const matchesType =
        typeFilter === 'all' ||
        notification.type === typeFilter;

      const matchesRead =
        activeTab === 'all' ||
        notification.read === false;

      return matchesType && matchesRead;
    });
  }, [
    notifications,
    activeTab,
    typeFilter,
  ]);

  const unreadCount = useMemo(() => {
    return notifications.filter(
      (notification) => !notification.read
    ).length;
  }, [notifications]);

  const markAsRead = useCallback((id) => {
    setNotifications((prev) => {
      const updated = prev.map((notification) =>
        notification.id === id
          ? {
              ...notification,
              read: true,
            }
          : notification
      );

      try {
        localStorage.setItem(
          NOTIFICATIONS_KEY,
          JSON.stringify(updated)
        );
      } catch (error) {
        console.error(
          'Error saving notification read state',
          error
        );
      }

      return updated;
    });
  }, []);

  const markAllAsRead = useCallback(() => {
    setNotifications((prev) => {
      const updated = prev.map((notification) => ({
        ...notification,
        read: true,
      }));

      try {
        localStorage.setItem(
          NOTIFICATIONS_KEY,
          JSON.stringify(updated)
        );
      } catch (error) {
        console.error(
          'Error saving notification read state',
          error
        );
      }

      return updated;
    });
  }, []);

  const toggleDropdown = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  const handleNotificationClick = useCallback(
    (notification) => {
      markAsRead(notification.id);
      setIsOpen(false);

      if (notification.type === 'order') {
        navigate('/admin/orders');
        return;
      }

      navigate('/admin/products');
    },
    [markAsRead, navigate]
  );

  return {
    isOpen,
    dropdownRef,
    activeTab,
    setActiveTab,
    typeFilter,
    setTypeFilter,
    filteredNotifications,
    unreadCount,
    markAsRead,
    markAllAsRead,
    toggleDropdown,
    handleNotificationClick,
  };
}