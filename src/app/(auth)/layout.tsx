export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="relative flex items-center justify-center w-screen h-svh">
      {children}
    </main>
  );
}
