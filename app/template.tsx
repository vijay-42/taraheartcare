/** Re-mounts on every navigation, so each new page eases into place (see .page-enter in globals.css). */
export default function Template({ children }: { children: React.ReactNode }) {
  return <div className="page-enter">{children}</div>;
}
