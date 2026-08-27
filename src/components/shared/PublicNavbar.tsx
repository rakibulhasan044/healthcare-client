import Link from "next/link";
import { Button } from "../ui/button";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "../ui/sheet";
import { Menu } from "lucide-react";
import { getCookie } from "@/services/auth/tokenHandler";
import LogoutButton from "./LogoutButton";

const PublicNavbar = async () => {
  const navItems = [
    { name: "Home", href: "/" },
    { name: "Consultation", href: "/consultation" },
    { name: "Health Plans", href: "/health-plans" },
    { name: "Diagnostics", href: "/diagnostics" },
    { name: "Medicine", href: "/medicine" },
    { name: "NGOs", href: "/ngos" },
  ];

  const accessToken = await getCookie("accessToken");

  const isLoggedIn = accessToken ? true : false;

  return (
    <header className="sticky top-0 z-50 w-full border-b backdrop-blur dark:bg-background bg-background/95 px-4">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div>
          <Link
            href="/"
            className="flex items-center justify-center text-xl font-bold text-primary"
          >
            HC DOC
          </Link>
        </div>
        <nav className="hidden md:block">
          <ul className=" flex gap-6">
            {navItems.map((item) => (
              <li key={item.name}>
                <Link href={item.href}>{item.name}</Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="hidden md:block">
          {isLoggedIn ? (
            <LogoutButton />
          ) : (
            <Link href="/login">
              <Button>Login</Button>
            </Link>
          )}
        </div>

        {/* Mobile menu */}
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger>
              <Menu />
            </SheetTrigger>
            <SheetContent side="right" className="w-75 sm:w-100 px-4">
              <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
              <nav className="">
                <ul className=" flex flex-col font-bold space-y-4 mt-8">
                  {navItems.map((item) => (
                    <li key={item.name}>
                      <Link href={item.href}>{item.name}</Link>
                    </li>
                  ))}
                  {isLoggedIn ? (
                    <div className="div">
                      <LogoutButton  />
                    </div>
                  ) : (
                    <Link href="/login">
                      <Button>Login</Button>
                    </Link>
                  )}
                </ul>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default PublicNavbar;
