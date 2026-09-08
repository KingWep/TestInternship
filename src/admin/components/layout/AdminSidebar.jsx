import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
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

export default function AdminSidebar({ sidebarState, setSidebarState }) {
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
      title: "តើអ្នកពិតជាចង់ចាកចេញមែនទេ?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "ចាកចេញ",
      cancelButtonText: "បោះបង់",
    }).then((result) => {
      if (result.isConfirmed) {
        logout();
        navigate("/login");
      }
    });
  };

  // Close sidebar on mobile on resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setSidebarState(0);
      } else {
        setSidebarState((prev) => (prev === 0 ? 2 : prev));
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [setSidebarState]);

  // Close sidebar on mobile when navigating
  useEffect(() => {
    if (window.innerWidth < 768) {
      setSidebarState(0);
    }
  }, [location.pathname, setSidebarState]);

  const handleToggle = () => {
    if (window.innerWidth < 768) {
      if (sidebarState === 0) setSidebarState(1);
      else if (sidebarState === 1) setSidebarState(2);
      else setSidebarState(0);
    } else {
      if (sidebarState === 2) setSidebarState(1);
      else setSidebarState(2);
    }
  };

  const isFull = sidebarState === 2;
  const isHidden = sidebarState === 0;
  const menuSections = [
    {
      title: "ចម្បង",
      items: [
        { label: "ផ្ទាំងគ្រប់គ្រង", path: "/admin", icon: LayoutDashboard },
        { label: "ការបញ្ជាទិញ", path: "/admin/orders", icon: ClipboardList },
        { label: "ទម្រង់លក់", path: "/admin/sale-form", icon: PlusCircle },
      ],
    },
    {
      title: "កាតាឡុក",
      items: [
        { label: "ផលិតផល", path: "/admin/products", icon: ShoppingBag },
        { label: "ប្រភេទ", path: "/admin/categories", icon: Layers },
        { label: "ស្លាយ", path: "/admin/slides", icon: Image },
      ],
    },
    {
      title: "ប្រព័ន្ធ",
      items: [
        { label: "អ្នកប្រើប្រាស់", path: "/admin/users", icon: Users },
        {
          label: "អ្នកដឹកជញ្ជូន",
          path: "/admin/delivery-providers",
          icon: Truck,
        },
        { label: "QR Code", path: "/admin/qr-code", icon: QrCode },
        { label: "ការកំណត់", path: "/admin/settings", icon: Settings },
      ],
    },
  ];

  return (
    <>
      {/* Mobile Overlay */}
      <div
        className={`md:hidden fixed inset-0 bg-blue-950/60 z-40 backdrop-blur-sm transition-opacity duration-300 ${
          sidebarState !== 0
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setSidebarState(0)}
      />

      <aside
        className={`
        fixed md:relative z-50 h-full text-slate-300 flex flex-col border-r border-blue-950/80 
        transition-[width,transform] duration-300 ease-[cubic-bezier(0.2,0,0,1)] select-none
        ${sidebarState === 0 ? "-translate-x-full md:translate-x-0 w-[80px]" : "translate-x-0"}
        ${sidebarState === 1 ? "w-[80px]" : ""}
        ${sidebarState === 2 ? "w-64" : ""}
      `}
        style={{ backgroundColor: "#0b132b" }}
      >
        {/* Toggle Button */}
        <button
          onClick={handleToggle}
          className="absolute -right-6 top-1/2 -translate-y-1/2 bg-blue-600 text-white flex items-center justify-center w-6 h-24 rounded-r-xl shadow-lg hover:bg-blue-500 transition-colors duration-200 focus:outline-none z-10"
          aria-label="Toggle Sidebar"
        >
          {isFull ? <ChevronsLeft size={20} /> : <ChevronsRight size={20} />}
        </button>

        {/* Logo Section */}
        <div className="p-6 h-[76px] font-bold text-lg text-white border-b border-blue-900/60 flex items-center overflow-hidden shrink-0">
          {/* Logo */}
          <div className="w-12 h-12 shrink-0 rounded-xl overflow-hidden flex items-center justify-center border border-blue-800 bg-blue-900 shadow-inner">
            {logoUrl && !imgError ? (
              <img
                src={logoUrl}
                alt={shopName}
                className="object-cover w-full h-full"
                onError={() => setImgError(true)}
              />
            ) : (
              <img
                src="/images/ShoppingJunction.png"
                alt={shopName}
                className="object-cover w-full h-full"
              />
            )}
          </div>

          {/* Text Container (Shop Name & User Name) */}
          <div
            className={`grid transition-[grid-template-columns,opacity] duration-300 ease-[cubic-bezier(0.2,0,0,1)] overflow-hidden ${
              isFull
                ? "grid-cols-[1fr] opacity-100 ml-4"
                : "grid-cols-[0fr] opacity-0 ml-0"
            }`}
          >
            <div className="overflow-hidden whitespace-nowrap relative w-full flex flex-col justify-center">
              {/* Shop Name */}
              {isLoading || shopName.length <= 12 ? (
                <span
                  className="text-white text-xl font-semibold leading-tight truncate"
                  title={shopName}
                >
                  {isLoading ? "..." : shopName}
                </span>
              ) : (
                <div className="flex w-max animate-marquee-reverse-custom" title={shopName}>
                  <span className="text-white text-xl font-semibold leading-tight pr-8">
                    {shopName}
                  </span>
                  <span className="text-white text-xl font-semibold leading-tight pr-8" aria-hidden="true">
                    {shopName}
                  </span>
                </div>
              )}

              {/* User Name */}
              <span className="text-blue-300/80 text-xs font-normal leading-tight mt-0.5 truncate">
                Hello {user?.name ? `, ${user.name}` : ""}
              </span>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-6 overflow-y-auto overflow-x-hidden scroll-smooth overscroll-contain [scrollbar-width:thin] [scrollbar-color:rgb(30_58_138)_transparent] [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-blue-900/60 [&::-webkit-scrollbar-thumb]:rounded-full hover:[&::-webkit-scrollbar-thumb]:bg-blue-700">
          {menuSections.map((section, idx) => (
            <div key={idx} className="space-y-1">
              <div
                className={`grid transition-[grid-template-rows,opacity,margin] duration-300 ease-[cubic-bezier(0.2,0,0,1)] ${
                  isFull
                    ? "grid-rows-[1fr] opacity-100 mb-2"
                    : "grid-rows-[0fr] opacity-0 mb-0"
                }`}
              >
                <div className="overflow-hidden">
                  <h2 className="px-4 text-xs font-semibold text-blue-400/70 tracking-wider whitespace-nowrap uppercase">
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
                    className={`flex items-center px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 relative group overflow-hidden ${
                      isActive
                        ? "bg-blue-600 text-white shadow-md shadow-blue-900/50 font-semibold"
                        : "hover:bg-blue-900/40 hover:text-white text-blue-200/70"
                    }`}
                  >
                    <div className="flex items-center min-w-0">
                      <Icon size={18} className="shrink-0" />
                      <div
                        className={`grid transition-[grid-template-columns,opacity] duration-300 ease-[cubic-bezier(0.2,0,0,1)] ${
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
                      <div className="absolute left-[calc(100%+8px)] px-2.5 py-1.5 bg-blue-900 text-white text-xs rounded-lg opacity-0 pointer-events-none group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-200 z-50 whitespace-nowrap shadow-xl border border-blue-800">
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
        <div className="p-4 border-t border-blue-900/60 shrink-0">
          <button
            onClick={handleLogout}
            className="w-full flex items-center px-4 py-3 rounded-xl text-sm font-medium text-rose-400 hover:bg-rose-500/10 hover:text-rose-300 transition-colors duration-200 relative group overflow-hidden"
            title="ចាកចេញ (Logout)"
          >
            <div className="flex items-center min-w-0">
              <LogOut size={18} className="shrink-0" />
              <div
                className={`grid transition-[grid-template-columns,opacity] duration-300 ease-[cubic-bezier(0.2,0,0,1)] ${
                  isFull
                    ? "grid-cols-[1fr] opacity-100 ml-3"
                    : "grid-cols-[0fr] opacity-0 ml-0"
                }`}
              >
                <span className="whitespace-nowrap overflow-hidden leading-normal">
                  ចាកចេញ
                </span>
              </div>
            </div>

            {!isFull && sidebarState !== 0 && (
              <div className="absolute left-[calc(100%+8px)] px-2.5 py-1.5 bg-blue-900 text-white text-xs rounded-lg opacity-0 pointer-events-none group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-200 z-50 whitespace-nowrap shadow-xl border border-blue-800">
                <div>ចាកចេញ</div>
              </div>
            )}
          </button>
        </div>
      </aside>
    </>
  );
}
