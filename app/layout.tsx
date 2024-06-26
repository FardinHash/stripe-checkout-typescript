import type { Metadata } from "next";

import Link from "next/link";

import "../styles.css";

interface LayoutProps {
  children: React.ReactNode;
}

export const metadata: Metadata = {
  title: {
    default: "TypeScript Next.js Stripe Example",
    template: "%s | Next.js + TypeScript Example",
  },
  twitter: {
    card: "summary_large_image",
    description:
      "Full-stack TypeScript example using Next.js, react-stripe-js, and stripe-node.",
    images: [
      {
        url: "https://nextjs-typescript-react-stripe-js.vercel.app/social_card.png",
      },
    ],
    site: "@StripeDev",
    title: "TypeScript Next.js Stripe Example",
  },
};

export default function RootLayout({ children }: LayoutProps) {
  return (
    <html lang="en">
      <body>
        <div className="container">
        <header>
            <div className="header-content">
              <Link href="/" className="logo" style={{ fontWeight: 'bold', fontSize: '1.2em' }}>
                SENDOUT.AI
              </Link>
            </div>
          </header>
          {children}
        </div>
        <div className="banner">
          <span>
            This is a{" "}
            <a
              href="https://github.com/stripe-samples"
              target="_blank"
              rel="noopener noreferrer"
            >
              Sample Stripe Checkout
            </a>
            .{" View code on "}
            <a
              href="https://github.com/FardinHash/stripe-checkout-typescript"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </a>
            .
          </span>
        </div>
      </body>
    </html>
  );
}
