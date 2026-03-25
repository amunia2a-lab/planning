export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body style={{ margin: 0, background: "transparent" }}>
        {children}
      </body>
    </html>
  );
}