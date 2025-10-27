import "./globals.css";
import Navbar from "./components/Navbar";

export const metadata = {
  title: "QuickPoll",
  description: "Real-time opinion polling app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-gray-50 text-gray-800">
        <Navbar />
        <main className="min-h-screen">{children}</main>
      </body>
    </html>
  );
}
