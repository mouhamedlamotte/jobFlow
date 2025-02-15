import { SUPPORT_EMAIL } from "@/app/_constants/app";
import Link from "next/link";
import { AppLogo } from "./app-logo";

const Footer = () => {
  return (
    <footer className="border-t">
      <div className="container py-8">
        <div className="mb-4 flex flex-col items-center justify-between md:flex-row">
          <div className="mb-4 md:mb-0">
            <AppLogo />
          </div>
          <nav className="flex flex-wrap justify-center gap-4 md:justify-end">
            <a
              href={`mailto:${SUPPORT_EMAIL}`}
              className="text-sm font-medium hover:underline"
            >
              Support
            </a>
            <Link href="/#" className="text-sm font-medium hover:underline">
              Terms & Conditions
            </Link>
            <Link href="/#" className="text-sm font-medium hover:underline">
              Privacy Policy
            </Link>
          </nav>
        </div>
        <div className="text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} Your Company Name. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
