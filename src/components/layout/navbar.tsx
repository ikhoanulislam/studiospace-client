
"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import {
  Aperture,
  Menu,
  X,
  ArrowUpRight,
  CalendarDays,
  LogOut,
  ChevronDown,
  User,
  LayoutDashboard,
  ShieldCheck,
  Plus,
  Building2,
  Sun,
  Moon,
} from "lucide-react";

const API_URL = "http://localhost:5002";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Explore Studios", href: "/studios" },
  { label: "How It Works", href: "/#how-it-works" },
  { label: "About Us", href: "/about" },
  { label: "Contact", href: "/contact" },
];

type UserData = {
  id?: string;
  name?: string;
  email?: string;
  avatar?: string;
  isHost?: boolean;
  role?: string;
};

export default function Navbar() {
  const pathname = usePathname();

  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [mounted, setMounted] = useState(false);

  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState<UserData | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  // Initialize and remember global theme
  useEffect(() => {
    const savedTheme = localStorage.getItem("studiospace-theme");
    const initialTheme = savedTheme === "dark" ? "dark" : "light";

    setTheme(initialTheme);

    document.documentElement.classList.toggle(
      "dark",
      initialTheme === "dark"
    );

    document.documentElement.style.colorScheme = initialTheme;

    setMounted(true);
  }, []);

  // Apply theme to the complete website
  const toggleTheme = () => {
    const nextTheme = theme === "dark" ? "light" : "dark";

    setTheme(nextTheme);

    document.documentElement.classList.toggle(
      "dark",
      nextTheme === "dark"
    );

    document.documentElement.style.colorScheme = nextTheme;

    localStorage.setItem("studiospace-theme", nextTheme);
  };

  // Check login session using HTTPOnly cookie
  useEffect(() => {
    let isActive = true;

    const checkUser = async () => {
      try {
        const userResponse = await fetch(`${API_URL}/api/auth/me`, {
          method: "GET",
          credentials: "include",
          cache: "no-store",
        });

        const userResult = await userResponse.json();

        if (!userResponse.ok || !userResult.data) {
          if (isActive) {
            setUser(null);
            setIsAdmin(false);
            sessionStorage.removeItem("user");
          }
          return;
        }

        const freshUser = userResult.data;

        if (!isActive) return;

        setUser(freshUser);
        sessionStorage.setItem("user", JSON.stringify(freshUser));

        const adminResponse = await fetch(
          `${API_URL}/api/admin/contacts`,
          {
            method: "GET",
            credentials: "include",
            cache: "no-store",
          }
        );

        if (isActive) {
          setIsAdmin(adminResponse.ok);
        }
      } catch (error) {
        console.error("Navbar verification error:", error);

        if (isActive) {
          setIsAdmin(false);
        }
      }
    };

    checkUser();

    return () => {
      isActive = false;
    };
  }, [pathname]);

  // Logout
  const handleLogout = async () => {
    try {
      await fetch(`${API_URL}/api/auth/logout`, {
        method: "POST",
        credentials: "include",
      });
    } catch (error) {
      console.error("Logout error:", error);
    }

    sessionStorage.removeItem("token");
    sessionStorage.removeItem("user");

    setUser(null);
    setIsAdmin(false);
    setIsProfileOpen(false);
    setIsOpen(false);

    window.location.assign("/");
  };

  // Active route checking
  const isLinkActive = (href: string) => {
    if (href === "/") return pathname === "/";
    if (href === "/#how-it-works") return false;

    return pathname === href || pathname.startsWith(`${href}/`);
  };

  const initials = user?.name
    ? user.name
        .split(" ")
        .map((part) => part[0])
        .join("")
        .slice(0, 2)
        .toUpperCase()
    : "U";

  const canManageStudios =
    user?.isHost === true ||
    user?.role === "admin" ||
    isAdmin;

  const desktopLinkClass = (href: string) =>
    `text-sm font-medium transition-colors ${
      isLinkActive(href)
        ? "font-bold text-[#F15A3B]"
        : "text-[#55534F] hover:text-[#F15A3B] dark:text-gray-300 dark:hover:text-[#F15A3B]"
    }`;

  return (
    <header className="sticky top-0 z-50 w-full border-b border-black/5 bg-[#F7F5F0]/95 backdrop-blur-xl dark:border-white/10 dark:bg-gray-950/95">
      <nav className="mx-auto flex h-20 max-w-360 items-center justify-between px-5 md:px-10 lg:px-16">

        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2.5"
          onClick={() => setIsOpen(false)}
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#F15A3B] text-white">
            <Aperture size={23} strokeWidth={1.8} />
          </div>

          <span className="text-xl font-bold tracking-tight text-[#171717] dark:text-white">
            Studio<span className="text-[#F15A3B]">Space</span>
            <span className="ml-1 text-[#F15A3B]">.</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-9 lg:flex">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              aria-current={
                isLinkActive(link.href) ? "page" : undefined
              }
              className={desktopLinkClass(link.href)}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Desktop Actions */}
        <div className="hidden items-center gap-5 lg:flex">

          {/* Theme Toggle */}
          <button
            type="button"
            onClick={toggleTheme}
            disabled={!mounted}
            aria-label="Toggle theme"
            title="Toggle Light/Dark Mode"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-black/10 bg-white text-[#171717] transition hover:border-[#F15A3B] dark:border-white/10 dark:bg-gray-800 dark:text-white"
          >
            {mounted && theme === "dark" ? (
              <Sun size={19} />
            ) : (
              <Moon size={19} />
            )}
          </button>

          {user ? (
            <>
              {/* Profile Dropdown */}
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="flex items-center gap-2 rounded-full border border-black/10 bg-white px-2 py-1.5 transition hover:border-[#F15A3B] dark:border-white/10 dark:bg-gray-800"
                >
                  {user.avatar ? (
                    <img
                      src={user.avatar}
                      alt="Profile"
                      className="h-9 w-9 rounded-full object-cover"
                    />
                  ) : (
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#F15A3B] text-sm font-bold text-white">
                      {initials}
                    </div>
                  )}

                  <span className="max-w-28 truncate text-sm font-semibold text-[#171717] dark:text-white">
                    {user.name || "My Account"}
                  </span>

                  <ChevronDown size={15} />
                </button>

                {isProfileOpen && (
                  <div className="absolute right-0 top-14 z-50 w-64 rounded-xl border border-black/10 bg-white p-2 shadow-xl dark:border-white/10 dark:bg-gray-900">

                    <Link
                      href="/profile"
                      onClick={() => setIsProfileOpen(false)}
                      className="block rounded-lg border-b border-black/5 px-3 py-3 transition hover:bg-[#F7F5F0] dark:border-white/10 dark:hover:bg-gray-800"
                    >
                      <p className="truncate text-sm font-semibold text-[#171717] dark:text-white">
                        {user.name || "User"}
                      </p>

                      <p className="truncate text-xs text-gray-500">
                        {user.email}
                      </p>

                      <p className="mt-2 text-xs font-semibold text-[#F15A3B]">
                        View Profile →
                      </p>
                    </Link>

                    {/* Admin Dashboard */}
                    {isAdmin && (
                      <Link
                        href="/admin"
                        onClick={() => setIsProfileOpen(false)}
                        className="my-1 flex items-center gap-3 rounded-lg bg-[#FCE8E2] px-3 py-3 text-sm font-semibold text-[#F15A3B] transition hover:bg-[#F9DAD0]"
                      >
                        <LayoutDashboard size={18} />
                        Admin Dashboard
                        <ShieldCheck size={15} className="ml-auto" />
                      </Link>
                    )}

                    {/* Host Options */}
                    {canManageStudios && (
                      <>
                        <Link
                          href="/host/dashboard"
                          onClick={() => setIsProfileOpen(false)}
                          className="flex items-center gap-3 rounded-lg px-3 py-3 text-sm text-[#333] transition hover:bg-[#F7F5F0] hover:text-[#F15A3B] dark:text-gray-200 dark:hover:bg-gray-800"
                        >
                          <LayoutDashboard size={17} />
                          Dashboard
                        </Link>

                        <Link
                          href="/add-studio"
                          onClick={() => setIsProfileOpen(false)}
                          className="flex items-center gap-3 rounded-lg px-3 py-3 text-sm text-[#333] transition hover:bg-[#F7F5F0] hover:text-[#F15A3B] dark:text-gray-200 dark:hover:bg-gray-800"
                        >
                          <Plus size={17} />
                          Add New Studio
                        </Link>

                        <Link
                          href="/my-listings"
                          onClick={() => setIsProfileOpen(false)}
                          className="flex items-center gap-3 rounded-lg px-3 py-3 text-sm text-[#333] transition hover:bg-[#F7F5F0] hover:text-[#F15A3B] dark:text-gray-200 dark:hover:bg-gray-800"
                        >
                          <Building2 size={17} />
                          My Studio Listings
                        </Link>
                      </>
                    )}

                    {/* My Bookings */}
                    <Link
                      href="/my-bookings"
                      onClick={() => setIsProfileOpen(false)}
                      className="flex items-center gap-3 rounded-lg px-3 py-3 text-sm text-[#333] transition hover:bg-[#F7F5F0] hover:text-[#F15A3B] dark:text-gray-200 dark:hover:bg-gray-800"
                    >
                      <CalendarDays size={17} />
                      My Bookings
                    </Link>

                    {/* Logout */}
                    <button
                      type="button"
                      onClick={handleLogout}
                      className="flex w-full items-center gap-3 rounded-lg px-3 py-3 text-left text-sm text-red-600 transition hover:bg-red-50 dark:hover:bg-red-950/30"
                    >
                      <LogOut size={17} />
                      Logout
                    </button>
                  </div>
                )}
              </div>

              <Link
                href="/host/apply"
                className="flex items-center gap-2 rounded-full bg-[#171717] px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-[#F15A3B] dark:bg-[#F15A3B]"
              >
                Become a Host
                <ArrowUpRight size={16} />
              </Link>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="text-sm font-semibold text-[#171717] transition-colors hover:text-[#F15A3B] dark:text-white"
              >
                Log in
              </Link>

              <Link
                href="/host/apply"
                className="flex items-center gap-2 rounded-full bg-[#171717] px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-[#F15A3B] dark:bg-[#F15A3B]"
              >
                Become a Host
                <ArrowUpRight size={16} />
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? "Close menu" : "Open menu"}
          aria-expanded={isOpen}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-black/10 text-[#171717] dark:border-white/10 dark:text-white lg:hidden"
        >
          {isOpen ? <X size={21} /> : <Menu size={21} />}
        </button>
      </nav>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="border-t border-black/5 bg-[#F7F5F0] px-5 py-6 dark:border-white/10 dark:bg-gray-950 lg:hidden">
          <div className="flex flex-col gap-5">

            {/* Mobile Theme Toggle */}
            <button
              type="button"
              onClick={toggleTheme}
              disabled={!mounted}
              className="flex w-full items-center gap-3 rounded-xl border border-black/10 px-4 py-3 text-sm font-semibold text-[#171717] dark:border-white/10 dark:text-white"
            >
              {mounted && theme === "dark" ? (
                <>
                  <Sun size={19} />
                  Switch to Light Mode
                </>
              ) : (
                <>
                  <Moon size={19} />
                  Switch to Dark Mode
                </>
              )}
            </button>

            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setIsOpen(false)}
                aria-current={
                  isLinkActive(link.href) ? "page" : undefined
                }
                className={`text-base font-medium ${
                  isLinkActive(link.href)
                    ? "font-bold text-[#F15A3B]"
                    : "text-[#171717] hover:text-[#F15A3B] dark:text-gray-200"
                }`}
              >
                {link.label}
              </Link>
            ))}

            {user ? (
              <>
                {/* Mobile Profile */}
                <Link
                  href="/profile"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-3 border-t border-black/10 pt-5 dark:border-white/10"
                >
                  {user.avatar ? (
                    <img
                      src={user.avatar}
                      alt="Profile"
                      className="h-10 w-10 rounded-full object-cover"
                    />
                  ) : (
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#F15A3B] font-bold text-white">
                      {initials}
                    </div>
                  )}

                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-[#171717] dark:text-white">
                      {user.name || "My Account"}
                    </p>

                    <p className="truncate text-xs text-gray-500">
                      {user.email}
                    </p>

                    <p className="mt-1 text-xs font-semibold text-[#F15A3B]">
                      View Profile →
                    </p>
                  </div>

                  <User size={18} className="ml-auto text-[#F15A3B]" />
                </Link>

                {/* Mobile Admin Dashboard */}
                {isAdmin && (
                  <Link
                    href="/admin"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center gap-3 rounded-xl bg-[#FCE8E2] px-4 py-3 font-semibold text-[#F15A3B]"
                  >
                    <LayoutDashboard size={19} />
                    Admin Dashboard
                    <ShieldCheck size={16} className="ml-auto" />
                  </Link>
                )}

                {/* Mobile Host Options */}
                {canManageStudios && (
                  <>
                    <Link
                      href="/host/dashboard"
                      onClick={() => setIsOpen(false)}
                      className="flex items-center gap-3 text-sm font-medium text-[#171717] hover:text-[#F15A3B] dark:text-gray-200"
                    >
                      <LayoutDashboard size={18} />
                      Dashboard
                    </Link>

                    <Link
                      href="/add-studio"
                      onClick={() => setIsOpen(false)}
                      className="flex items-center gap-3 text-sm font-medium text-[#171717] hover:text-[#F15A3B] dark:text-gray-200"
                    >
                      <Plus size={18} />
                      Add New Studio
                    </Link>

                    <Link
                      href="/my-listings"
                      onClick={() => setIsOpen(false)}
                      className="flex items-center gap-3 text-sm font-medium text-[#171717] hover:text-[#F15A3B] dark:text-gray-200"
                    >
                      <Building2 size={18} />
                      My Studio Listings
                    </Link>
                  </>
                )}

                {/* Mobile My Bookings */}
                <Link
                  href="/my-bookings"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-3 text-sm font-medium text-[#171717] hover:text-[#F15A3B] dark:text-gray-200"
                >
                  <CalendarDays size={18} />
                  My Bookings
                </Link>

                <Link
                  href="/host/apply"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center justify-center gap-2 rounded-full bg-[#171717] py-3 text-sm font-semibold text-white dark:bg-[#F15A3B]"
                >
                  Become a Host
                  <ArrowUpRight size={16} />
                </Link>

                <button
                  type="button"
                  onClick={handleLogout}
                  className="flex items-center justify-center gap-2 rounded-full border border-red-200 py-3 text-sm font-semibold text-red-600"
                >
                  <LogOut size={17} />
                  Logout
                </button>
              </>
            ) : (
              <div className="flex gap-3 border-t border-black/10 pt-5 dark:border-white/10">
                <Link
                  href="/login"
                  onClick={() => setIsOpen(false)}
                  className="flex-1 rounded-full border border-black/10 py-3 text-center text-sm font-semibold text-[#171717] dark:border-white/10 dark:text-white"
                >
                  Log in
                </Link>

                <Link
                  href="/host/apply"
                  onClick={() => setIsOpen(false)}
                  className="flex-1 rounded-full bg-[#171717] py-3 text-center text-sm font-semibold text-white dark:bg-[#F15A3B]"
                >
                  Become a Host
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
