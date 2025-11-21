import React from "react";

export default function NotFound() {
  return (
    <main className="container mx-auto px-4 py-10">
      <section className="ocean-card p-6" role="alert" aria-live="assertive">
        <header>
          <h1 className="text-2xl font-semibold text-[var(--ocean-text)]">404 – Page Not Found</h1>
          <p className="text-gray-600 mt-2">The page you’re looking for doesn’t exist.</p>
        </header>
      </section>
    </main>
  );
}
