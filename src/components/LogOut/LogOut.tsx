"use client";
import { signOut } from "next-auth/react";
import { DropdownMenuItem } from "../ui/dropdown-menu";

export default function LogOut() {
  return (
    <DropdownMenuItem
      onClick={() =>
        signOut({
          callbackUrl: "/",
        })
      }
    >
      Logout
    </DropdownMenuItem>
  );
}
