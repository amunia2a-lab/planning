export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body style={{ margin: 0, background: "#f7f6f3" }}>
        {children}
      </body>
    </html>
  );
}