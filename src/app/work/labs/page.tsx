import Link from "next/link";
import { getLabsItems } from "@/content/labs";

export default function LabsPage() {
  const items = getLabsItems();

  return (
    <div className="pt-14">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <Link
          href="/work"
          className="text-sm text-muted-foreground hover:text-foreground"
          data-cursor="link"
        >
          ← Work
        </Link>
        <h1 className="mt-6 text-3xl font-semibold tracking-tight">Labs</h1>
        <p className="mt-2 text-muted-foreground">
          Proyectos de especulación y experimentos.
        </p>
        <ul className="mt-12 space-y-4">
          {items.map((item) => (
            <li key={item.slug}>
              <Link
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block rounded-lg border border-border bg-card p-4 transition-colors hover:border-primary hover:text-primary"
                data-cursor="view"
              >
                <span className="font-medium">{item.title}</span>
                <span className="ml-2 text-sm text-muted-foreground">
                  — {item.description}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
