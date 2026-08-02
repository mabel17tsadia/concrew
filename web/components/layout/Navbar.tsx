"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function Navbar() {
    const pathname = usePathname();
    const router = useRouter();

    async function handleLogout() {
        await supabase.auth.signOut();
        router.push("/login");
    }

    const navItems = [
        { href: "/dashboard", label: "Dashboard" },
        { href: "/conferences", label: "Conferences" },
        { href: "/people", label: "People" },
        { href: "/connections", label: "Connections" },
        { href: "/profile", label: "Profile" },
    ];

    return (
        <header className="border-b border-slate-200 bg-white/95 backdrop-blur">
            <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
                <Link
                    href="/dashboard"
                    className="text-2xl font-bold tracking-tight text-slate-900"
                >
                    ConCrew
                </Link>

                <nav className="flex items-center gap-6">
                    {navItems.map((item) => {
                        const isActive =
                            pathname === item.href ||
                            (item.href !== "/dashboard" && pathname.startsWith(item.href));

                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={`relative text-sm font-medium transition ${isActive
                                        ? "text-slate-900"
                                        : "text-slate-500 hover:text-slate-900"
                                    }`}
                            >
                                {item.label}
                                {isActive && (
                                    <span className="absolute -bottom-1 left-0 h-0.5 w-full rounded-full bg-slate-900" />
                                )}
                            </Link>
                        );
                    })}
                </nav>

                <button
                    type="button"
                    onClick={handleLogout}
                    className="rounded-full border border-slate-300 px-4 py-2 text-sm font-medium text-slate-900 transition hover:bg-slate-50"
                >
                    Log Out
                </button>
            </div>
        </header>
    );
}