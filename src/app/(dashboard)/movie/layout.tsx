export default function DashboardLayout({
  children,
  modals,
}: {
  children: React.ReactNode;
  modals: React.ReactNode;
}) {
  return (
    <>
      {children}
      {modals}
    </>
  );
}