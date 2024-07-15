"use client";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { navLinks } from "@/utils/navLinks";
import { Menu } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function LeftSidebar() {
  const location = usePathname();

  return (
    <div className="block lg:hidden">
      <Sheet>
        <SheetTrigger asChild>
          <Menu />
        </SheetTrigger>
        <SheetContent side="left" className="bg-white">
          <SheetHeader>
            <SheetTitle>Menu</SheetTitle>
            <SheetDescription>Choose your route</SheetDescription>
          </SheetHeader>
          <div className="flex flex-col gap-2 py-5">
            {navLinks.map((nav) => (
              <SheetClose key={nav.path} asChild>
                <Link
                  href={nav.path}
                  className={`text-slate-700 hover:text-green-500 ${
                    location === nav.path && "font-extrabold text-green-600"
                  }`}
                >
                  {nav.route}
                </Link>
              </SheetClose>
            ))}
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
