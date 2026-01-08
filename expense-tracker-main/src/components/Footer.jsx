import React from "react";
import { Link } from "react-router";
import {
  
  Linkedin,
  Twitter,
  Instagram,
} from "lucide-react";
export default function Footer() {
  return (
    // <footer className=" bg-blue-600 text-white text-center py-4 mt-10">
    //   <p className="text-sm">
    //     &copy; {new Date().getFullYear()} Smart Tracker. All rights reserved.
    //   </p>
    //   <p className="text-xs mt-2">
    //     Made with ❤️ by RAJVEER PRATAP SINGH
    //   </p>
    // </footer>

    // footer
          
                <footer className="relative border-t border-indigo-100/60 bg-white/70 backdrop-blur-xl">
                  <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-6 py-10 sm:flex-row">
                    <div className="text-sm text-gray-500">
                      © {new Date().getFullYear()} Smart Expense Manager
                    </div>
                    <nav className="flex flex-wrap items-center justify-center gap-5 text-sm">
                      <Link
                        to="/about"
                        className="text-gray-600 hover:text-gray-900 hover:underline"
                      >
                        About
                      </Link>
                      <Link
                        to="/pricing"
                        className="text-gray-600 hover:text-gray-900 hover:underline"
                      >
                        Pricing
                      </Link>
                      <Link
                        to="/contact"
                        className="text-gray-600 hover:text-gray-900 hover:underline"
                      >
                        Contact
                      </Link>
                      <Link
                        to="/privacy"
                        className="text-gray-600 hover:text-gray-900 hover:underline"
                      >
                        Privacy Policy
                      </Link>
                    </nav>
                    <div className="flex items-center gap-4">
                      <a
                        href="https://www.linkedin.com/in/rajveersingh9554"
                        target="_blank"
                        rel="noreferrer"
                        aria-label="LinkedIn"
                        className="text-gray-500 transition-colors hover:text-indigo-600"
                      >
                        <Linkedin className="h-5 w-5" />
                      </a>
                      <a
                        href="https://www.twitter.com"
                        target="_blank"
                        rel="noreferrer"
                        aria-label="Twitter"
                        className="text-gray-500 transition-colors hover:text-indigo-600"
                      >
                        <Twitter className="h-5 w-5" />
                      </a>
                      <a
                        href="https://www.instagram.com/__rajveer_pra_14/"
                        target="_blank"
                        rel="noreferrer"
                        aria-label="Instagram"
                        className="text-gray-500 transition-colors hover:text-indigo-600"
                      >
                        <Instagram className="h-5 w-5" />
                      </a>
                    </div>
                  </div>
                </footer>
  )
}
