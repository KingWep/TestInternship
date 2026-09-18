import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { useTranslation } from "react-i18next";
import {
  LayoutDashboard,
  ShoppingBag,
  PlusCircle,
  ClipboardList,
  Users,
  Layers,
  Image,
  Settings,
  LogOut,
  ChevronsLeft,
  ChevronsRight,
  QrCode,
  Truck,
} from "lucide-react";
import Swal from "sweetalert2";
import { useSettingsQuery } from "../../../queries/settings/useSettingQueries";
import { Store } from "lucide-react";

export default function AdminSidebar({ sidebarState, setSidebarState }) {
  const { t } = useTranslation();
  const { user, logout } = useAuth();
  const shopCode = user?.shop?.code;
  const { data: settingData = {}, isLoading } = useSettingsQuery(shopCode);
  const [imgError, setImgError] = useState(false);
  const shopName = settingData?.shop_name || "Shop";
  const rawLogo = settingData?.logo;
  const baseUrl = import.meta.env.VITE_API_URL?.replace(/\/$/, "") || "";
  const logoUrl = rawLogo
    ? rawLogo.startsWith("http")
      ? rawLogo
      : `${baseUrl}${rawLogo.startsWith("/") ? "" : "/"}${rawLogo}`
    : "";
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    Swal.fire({
      title: t("common.logoutConfirmationTitle"),
      text: t("common.logoutConfirmationText"),
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: t("common.logout"),
      cancelButtonText: t("common.cancel"),
    }).then((result) => {
      if (result.isConfirmed) {
        logout();
        navigate("/login");
      }
    });
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setSidebarState(0);
      } else {
        setSidebarState((prev) => (prev === 0 ? 1 : prev));
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [setSidebarState]);

  useEffect(() => {
    if (window.innerWidth < 768) {
      setSidebarState(0);
    }
  }, [location.pathname, setSidebarState]);

  const handleToggle = () => {
    if (window.innerWidth < 768) {
      if (sidebarState === 2) setSidebarState(0);
      else setSidebarState(2);
    } else {
      if (sidebarState === 2) setSidebarState(1);
      else setSidebarState(2);
    }
  };

  const isFull = sidebarState === 2;
  const isHidden = sidebarState === 0;
  const menuSections = [
    {
      title: t("navigation.main"),
      items: [
        {
          label: t("navigation.dashboard"),
          path: "/admin",
          icon: LayoutDashboard,
        },
        {
          label: t("navigation.orders"),
          path: "/admin/orders",
          icon: ClipboardList,
        },
        {
          label: t("navigation.saleForm"),
          path: "/admin/sale-form",
          icon: PlusCircle,
        },
      ],
    },
    {
      title: t("navigation.catalog"),
      items: [
        {
          label: t("navigation.products"),
          path: "/admin/products",
          icon: ShoppingBag,
        },
        {
          label: t("navigation.categories"),
          path: "/admin/categories",
          icon: Layers,
        },
        {
          label: t("navigation.promotions"),
          path: "/admin/promotions",
          icon: Image,
        },
      ],
    },
    {
      title: t("navigation.system"),
      items: [
        { label: t("navigation.users"), path: "/admin/users", icon: Users },
        {
          label: t("navigation.deliveryProviders"),
          path: "/admin/delivery-providers",
          icon: Truck,
        },
        { label: t("navigation.qrCode"), path: "/admin/qr-code", icon: QrCode },
        {
          label: t("navigation.settings"),
          path: "/admin/settings",
          icon: Settings,
        },
      ],
    },
  ];

  return (
    <>
      {/* Mobile Overlay */}
      <div
        className={`md:hidden fixed inset-0 bg-[#44092e]/10 z-40 backdrop-blur-sm transition-opacity duration-300 ${
          sidebarState !== 0
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setSidebarState(0)}
      />

      <aside
        className={`
        fixed md:relative z-50 h-full text-white flex flex-col border-r border-[#870d4c]/30 
        transition-[width,transform] duration-300 ease-in-out select-none shadow-2xl md:shadow-none
        ${sidebarState === 0 ? "-translate-x-full md:translate-x-0 w-[80px]" : "translate-x-0"}
        ${sidebarState === 1 ? "w-[80px]" : ""}
        ${sidebarState === 2 ? "w-64" : ""}
      `}
        style={{ backgroundColor: "#44092e" }}
      >
        {/* Toggle Button - ប្រើពណ៌ប៊ូតុង Sign In */}
        <button
          onClick={handleToggle}
          className="absolute -right-5 top-1/2 -translate-y-1/2 bg-[#870d4c] text-white flex items-center justify-center w-5 h-20 hover:h-24 hover:w-6 hover:-right-6 rounded-r-xl shadow-lg hover:bg-[#9d1159] transition-all duration-300 ease-in-out focus:outline-none z-10"
          aria-label="Toggle Sidebar"
        >
          {isFull ? (
            <ChevronsLeft
              size={18}
              className="transition-transform duration-300"
            />
          ) : (
            <ChevronsRight
              size={18}
              className="transition-transform duration-300"
            />
          )}
        </button>

        {/* Logo Section */}
        <div className="p-6 h-[76px] font-bold text-lg text-white border-b border-[#870d4c]/30 flex items-center overflow-hidden shrink-0">
          <div className="w-12 h-12 shrink-0 rounded-xl overflow-hidden flex items-center justify-center border border-[#870d4c]/50 bg-white/5 shadow-inner">
            {logoUrl && !imgError ? (
              <img
                src={logoUrl}
                alt={shopName}
                className="object-cover w-full h-full transition-opacity duration-300"
                onError={() => setImgError(true)}
              />
            ) : (
              <div className="w-8 h-8 md:w-14 md:h-14 bg-red-100 text-red-800 rounded-md flex items-center justify-center shrink-0">
                <Store size={18} />
              </div>
            )}
          </div>

          <div
            className={`grid transition-[grid-template-columns,opacity] duration-300 ease-in-out overflow-hidden ${
              isFull
                ? "grid-cols-[1fr] opacity-100 ml-4"
                : "grid-cols-[0fr] opacity-0 ml-0"
            }`}
          >
            <div className="overflow-hidden whitespace-nowrap relative w-full flex flex-col justify-center">
              {isLoading || shopName.length <= 12 ? (
                <span
                  className="text-white text-xl font-bold leading-tight truncate"
                  title={shopName}
                >
                  {isLoading ? "N/A" : shopName}
                </span>
              ) : (
                <div
                  className="flex w-max animate-marquee-reverse-custom"
                  title={shopName}
                >
                  <span className="text-white text-xl font-bold leading-tight pr-8">
                    {shopName}
                  </span>
                  <span
                    className="text-white text-xl font-bold leading-tight pr-8"
                    aria-hidden="true"
                  >
                    {shopName}
                  </span>
                </div>
              )}
              <span className="text-white/60 text-xs font-medium leading-tight mt-0.5 truncate">
                Hello {user?.name ? `, ${user.name}` : ""}
              </span>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-6 overflow-y-auto overflow-x-hidden scroll-smooth overscroll-contain [scrollbar-width:thin] [scrollbar-color:rgba(135,13,76,0.5)_transparent] [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-[#870d4c]/50 [&::-webkit-scrollbar-thumb]:rounded-full hover:[&::-webkit-scrollbar-thumb]:bg-[#870d4c] transition-colors duration-300">
          {menuSections.map((section, idx) => (
            <div key={idx} className="space-y-1">
              <div
                className={`grid transition-[grid-template-rows,opacity] duration-300 ease-in-out ${
                  isFull
                    ? "grid-rows-[1fr] opacity-100 mb-2"
                    : "grid-rows-[0fr] opacity-0 mb-0"
                }`}
              >
                <div className="overflow-hidden">
                  <h2 className="px-4 text-[11px] font-bold text-white/50 tracking-widest whitespace-nowrap uppercase transition-colors duration-300">
                    {section.title}
                  </h2>
                </div>
              </div>

              {section.items.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    /* កែពណ៌ Active ឱ្យស៊ីជាមួយប៊ូតុង Sign In និងដក border ចេញដើម្បីកុំឱ្យលោត */
                    className={`flex items-center px-4 py-3 rounded-xl text-sm transition-colors duration-200 relative group overflow-hidden ${
                      isActive
                        ? "bg-[#870d4c] text-white font-semibold shadow-md"
                        : "hover:bg-[#870d4c]/40 hover:text-white text-white/70"
                    }`}
                  >
                    <div className="flex items-center min-w-0">
                      <Icon
                        size={18}
                        className={`shrink-0 transition-transform duration-200 ease-in-out ${isActive ? "" : "group-hover:scale-110"}`}
                      />
                      <div
                        className={`grid transition-[grid-template-columns,opacity] duration-300 ease-in-out ${
                          isFull
                            ? "grid-cols-[1fr] opacity-100 ml-3"
                            : "grid-cols-[0fr] opacity-0 ml-0"
                        }`}
                      >
                        <span className="whitespace-nowrap overflow-hidden leading-normal">
                          {item.label}
                        </span>
                      </div>
                    </div>

                    {!isFull && sidebarState !== 0 && (
                      <div className="absolute left-[calc(100%+8px)] px-2.5 py-1.5 bg-[#870d4c] text-white font-medium text-xs rounded-lg opacity-0 pointer-events-none group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-200 ease-out z-50 whitespace-nowrap shadow-xl">
                        {item.label}
                      </div>
                    )}
                  </Link>
                );
              })}
            </div>
          ))}
        </nav>

        {/* Footer / Logout */}
        <div className="p-4 border-t border-[#870d4c]/30 shrink-0">
          <button
            onClick={handleLogout}
            className="w-full flex items-center px-4 py-3 rounded-xl text-sm transition-colors duration-200 relative group overflow-hidden hover:bg-red-500/20 hover:text-red-400 text-white/70"
            title={t("common.logout")}
          >
            <div className="flex items-center min-w-0">
              <LogOut
                size={18}
                className="shrink-0 transition-transform duration-200 ease-in-out group-hover:-translate-x-1"
              />
              <div
                className={`grid transition-[grid-template-columns,opacity] duration-300 ease-in-out ${
                  isFull
                    ? "grid-cols-[1fr] opacity-100 ml-3"
                    : "grid-cols-[0fr] opacity-0 ml-0"
                }`}
              >
                <span className="whitespace-nowrap overflow-hidden leading-normal">
                  {t("common.logout")}
                </span>
              </div>
            </div>

            {!isFull && sidebarState !== 0 && (
              <div className="absolute left-[calc(100%+8px)] px-2.5 py-1.5 bg-red-600 text-white font-medium text-xs rounded-lg opacity-0 pointer-events-none group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-200 ease-out z-50 whitespace-nowrap shadow-xl">
                <div>{t("common.logout")}</div>
              </div>
            )}
          </button>
        </div>
      </aside>
    </>
  );
}
