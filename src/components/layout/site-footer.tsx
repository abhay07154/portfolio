export function SiteFooter({ domain }: { domain: string }) {
  return (
    <footer className="site-footer page-container">
      <p>© {new Date().getFullYear()} Abhay Upadhyay</p>
      <p>
        viewing as <strong>{domain}</strong>
      </p>
    </footer>
  );
}
