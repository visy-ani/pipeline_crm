import '@/app/styles/globals.css'

export const metadata = {
  title: "CRM Kanban",
  description: "Kanban CRM with animations and confetti",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
