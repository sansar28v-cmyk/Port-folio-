import { createFileRoute } from "@tanstack/react-router";
import { lazy, Suspense } from "react";
import { Header } from "@/components/site/Header";
import { Hero } from "@/components/site/Hero";
import { About } from "@/components/site/About";

import { Capabilities } from "@/components/site/Capabilities";
import { Services } from "@/components/site/Services";
import { Contact } from "@/components/site/Contact";
import { Showcase } from "@/components/site/Showcase";

const Cursor = lazy(() => import("@/components/site/Cursor").then((m) => ({ default: m.Cursor })));
const SmoothScroll = lazy(() =>
  import("@/components/site/SmoothScroll").then((m) => ({ default: m.SmoothScroll })),
);

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <main className="relative">
      <Suspense fallback={null}>
        <SmoothScroll />
        <Cursor />
      </Suspense>

      <Header />

      <div id="top" />
      <Hero />
      <About />
        <Showcase />

      <Capabilities />
      <Services />
      <Contact />
    </main>
  );
}
