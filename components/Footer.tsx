import Link from "next/link";
import { Facebook, Instagram, Twitter, Linkedin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#F7F9FB] text-[#4B5563] p-4 text-center">
      <div className="mb-4">
        <Link href="/" className=" hover:underline">
          Home
        </Link>
        {" | "}
        <Link href="/about" className=" hover:underline">
          About
        </Link>
        {" | "}
        <Link href="/contact" className=" hover:underline">
          Contact
        </Link>
      </div>
      <div className="flex justify-center space-x-4 mb-4">
        <Link
          href="https://facebook.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Facebook className="h-6 w-6  hover:text-blue-500" />
        </Link>
        <Link
          href="https://instagram.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Instagram className="h-6 w-6  hover:text-pink-500" />
        </Link>
        <Link
          href="https://twitter.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Twitter className="h-6 w-6  hover:text-blue-400" />
        </Link>
        <Link
          href="https://linkedin.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Linkedin className="h-6 w-6 hover:text-blue-700" />
        </Link>
      </div>
      <p>
        &copy; {new Date().getFullYear()} Your Company Name. All rights
        reserved.
      </p>
    </footer>
  );
}
