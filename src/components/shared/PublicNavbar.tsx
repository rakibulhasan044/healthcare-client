import Link from "next/link";
import { Button } from "../ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "../ui/sheet";
import { Menu } from "lucide-react";

const navItems = [
  { name: "Home", href: "/" },
  { name: "Consultation", href: "/consultation" },
  { name: "Health Plans", href: "/health-plans" },
  { name: "Diagnostics", href: "/diagnostics" },
  { name: "NGOs", href: "/ngos" },
];

const PublicNavbar = () => {
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
          <Link href="/login">
            <Button>Login</Button>
          </Link>
        </div>

        {/* Mobile menu */}
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger>
              <Button variant={"outline"}>
                <Menu />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-75 sm:w-100 px-4">
              <nav className="">
                <ul className=" flex flex-col font-bold space-y-4 mt-8">
                  {navItems.map((item) => (
                    <li key={item.name}>
                      <Link href={item.href}>{item.name}</Link>
                    </li>
                  ))}
                  <Link href="/login">
                    <Button>Login</Button>
                  </Link>
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
