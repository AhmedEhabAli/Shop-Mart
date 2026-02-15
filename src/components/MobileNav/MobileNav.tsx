"use client";

import { Menu, ShoppingCart, User2 } from "lucide-react";
import { useState } from "react";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import LogOut from "../LogOut/LogOut";
export default function MobileNav() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Menu
        className="sm:hidden cursor-pointer"
        onClick={() => setOpen(!open)}
      />

      {open && (
        <div className="sm:hidden absolute top-full left-0 w-full bg-gray-100 shadow-md px-4 pb-4 z-50">
          <NavigationMenu>
            <NavigationMenuList className="flex flex-col gap-3 items-start">
              {["products", "brands", "categories"].map((item) => (
                <NavigationMenuItem key={item}>
                  <NavigationMenuLink asChild>
                    <Link href={`/${item}`} onClick={() => setOpen(false)}>
                      {item}
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
          <div className=" flex items-center gap-6">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <User2 className="cursor-pointer" />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuItem asChild>
                  <Link href="/profile">Profile</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/login">Login</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/register">Register</Link>
                </DropdownMenuItem>
                <LogOut />
              </DropdownMenuContent>
            </DropdownMenu>

            <Link href="/cart">
              <ShoppingCart />
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
