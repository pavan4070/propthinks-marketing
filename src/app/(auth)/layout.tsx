export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Auth pages (login/signup) have their own layout without Header/Footer
  return <>{children}</>;
}
