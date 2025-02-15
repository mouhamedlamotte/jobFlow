import Footer from "@/app/_components/core/footer";
import Header from "@/app/_components/core/header";

export default function PublicPagesLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <main className="flex-1">{children}</main>
    </>
  );
}
