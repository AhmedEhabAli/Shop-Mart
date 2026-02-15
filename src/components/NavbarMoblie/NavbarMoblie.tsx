"use client";

import Link from "next/link";
import { useState } from "react";
import { User2, Menu, X } from "lucide-react";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
import LogOut from "../LogOut/LogOut";
import CartIcon from "../CartIcon/CartIcon";
import WishlistIcon from "../WishlistIcon/WishlistIcon";
import { CartRes } from "@/interfaces/CartInterface";
import { WishlistRes } from "@/interfaces/WishlistInterface";
import { Session } from "next-auth";

export default function NavbarMobile({
  session,
  cartData,
  wishlistData,
}: {
  session: Session | null;
  cartData: CartRes | null;
  wishlistData: WishlistRes | null;
}) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const menuItems = ["products", "brands", "categories"];

  return (
    <nav className="bg-gray-100 shadow-md fixed top-0 left-0 w-full z-50">
      <div className="container flex items-center justify-between px-4 py-3">
        <Link href="/" className="text-2xl font-bold">
          ShopMart
        </Link>

        <div className="hidden sm:flex items-center gap-6">
          <NavigationMenu>
            <NavigationMenuList className="flex gap-4">
              {menuItems.map((item) => (
                <NavigationMenuItem key={item}>
                  <NavigationMenuLink asChild>
                    <Link href={`/${item}`} className="text-lg font-medium">
                      {item.charAt(0).toUpperCase() + item.slice(1)}
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        <div className="hidden sm:flex items-center gap-6">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              {session ? (
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-black text-white font-semibold cursor-pointer overflow-hidden">
                  {session.user?.name
                    ? session.user.name
                        .split(" ")
                        .slice(0, 2)
                        .map((n) => n[0])
                        .join("")
                        .toUpperCase()
                    : "U"}
                </div>
              ) : (
                <User2 className="cursor-pointer" />
              )}
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              {session ? (
                <>
                  <DropdownMenuItem asChild>
                    <Link href="/allorders">Orders</Link>
                  </DropdownMenuItem>
                  <LogOut />
                </>
              ) : (
                <>
                  <DropdownMenuItem asChild>
                    <Link href="/login">Login</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/registerform">Register</Link>
                  </DropdownMenuItem>
                </>
              )}
            </DropdownMenuContent>
          </DropdownMenu>

          {session && (
            <div className="flex gap-4">
              <CartIcon
                serverCartNum={cartData?.numOfCartItems ?? 0}
                userId={cartData?.data?.cartOwner || ""}
              />
              <WishlistIcon serverWishlistNum={wishlistData?.count ?? 0} />
            </div>
          )}
        </div>

        <div className="sm:hidden flex items-center gap-3">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              {session ? (
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-black text-white font-semibold cursor-pointer overflow-hidden">
                  {session.user?.name
                    ? session.user.name
                        .split(" ")
                        .slice(0, 2)
                        .map((n) => n[0])
                        .join("")
                        .toUpperCase()
                    : "U"}
                </div>
              ) : (
                <User2 className="cursor-pointer" />
              )}
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              {session ? (
                <>
                  <DropdownMenuItem asChild>
                    <Link href="/allorders">Orders</Link>
                  </DropdownMenuItem>
                  <LogOut />
                </>
              ) : (
                <>
                  <DropdownMenuItem asChild>
                    <Link href="/login">Login</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/registerform">Register</Link>
                  </DropdownMenuItem>
                </>
              )}
            </DropdownMenuContent>
          </DropdownMenu>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="p-2 rounded-md hover:bg-gray-200 transition cursor-pointer"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="sm:hidden bg-gray-100 w-full px-4 py-4 border-t border-gray-200 transition-all duration-300 ease-in-out flex flex-col gap-4">
          <NavigationMenu>
            <NavigationMenuList className="flex flex-col gap-3 items-start">
              {menuItems.map((item) => (
                <NavigationMenuItem key={item}>
                  <NavigationMenuLink asChild>
                    <Link
                      onClick={() => setMobileOpen(!mobileOpen)}
                      href={`/${item}`}
                      className="text-lg font-medium "
                    >
                      {item.charAt(0).toUpperCase() + item.slice(1)}
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>

          {session && (
            <div
              className="flex gap-6 mt-2"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              <CartIcon
                serverCartNum={cartData?.numOfCartItems ?? 0}
                userId={cartData?.data?.cartOwner || ""}
              />
              <WishlistIcon serverWishlistNum={wishlistData?.count ?? 0} />
            </div>
          )}
        </div>
      )}
    </nav>
  );
}
