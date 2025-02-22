import "@/styles/globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Provider from "@/redux/provider";
import { Navbar, Footer } from "@/components/common";
import { Cookies, Setup } from "@/components/utils";
import Script from "next/script";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Laced",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      {/* <body className={inter.className}> */}
      <body className={`${inter.className} antialiased`}>
        <Provider>
          {/* <Layout> */}
          <Setup />
          {/* <Cookies view={!preferencesIsSet ? true : false} /> */}
          <Cookies />
          <div className="bg-[#FAF9F8] min-h-screen flex flex-col">
            <Navbar />
            <div className="flex-grow">{children}</div>
            <Footer />
          </div>
          {/* </Layout> */}
        </Provider>
      </body>
      {/* <Script src="https://static.yoomoney.ru/checkout-js/v1/checkout.js" /> */}
    </html>
  );
}
