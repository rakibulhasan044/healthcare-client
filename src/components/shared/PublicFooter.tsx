"use client";

import Link from "next/link";
import { StaggerContainer, StaggerItem, FadeUp } from "@/components/shared/Animations";

function PublicFooter() {
  return (
    <footer className="border-t bg-background">
      <div className="container mx-auto px-4 py-8">
        <StaggerContainer className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <StaggerItem>
            <h3 className="font-bold mb-2">BookMyDoc</h3>
            <p className="text-sm text-muted-foreground">
              Your health is our priority. We are here to provide the best
              medical services.
            </p>
          </StaggerItem>
          <StaggerItem>
            <h3 className="font-semibold mb-2">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="#" className="text-muted-foreground hover:text-foreground">Home</Link></li>
              <li><Link href="#" className="text-muted-foreground hover:text-foreground">About Us</Link></li>
              <li><Link href="#" className="text-muted-foreground hover:text-foreground">Services</Link></li>
              <li><Link href="#" className="text-muted-foreground hover:text-foreground">Contact</Link></li>
            </ul>
          </StaggerItem>
          <StaggerItem>
            <h3 className="font-semibold mb-2">Support</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="#" className="text-muted-foreground hover:text-foreground">FAQ</Link></li>
              <li><Link href="#" className="text-muted-foreground hover:text-foreground">Help Center</Link></li>
              <li><Link href="#" className="text-muted-foreground hover:text-foreground">Terms of Service</Link></li>
              <li><Link href="#" className="text-muted-foreground hover:text-foreground">Privacy Policy</Link></li>
            </ul>
          </StaggerItem>
          <StaggerItem>
            <h3 className="font-semibold mb-2">Contact Us</h3>
            <p className="text-sm text-muted-foreground">
              123 Medical Lane<br />
              Health City, HC 12345<br />
              contact@bookmydoc.com
            </p>
          </StaggerItem>
        </StaggerContainer>
        <FadeUp delay={0.4} className="mt-8 border-t pt-4 text-center text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} BookMyDoc. All Rights Reserved.
        </FadeUp>
      </div>
    </footer>
  );
}
export default PublicFooter;
