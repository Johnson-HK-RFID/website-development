"use client";
export default function ErrorPage({ reset }: { reset: () => void }) { return <section className="not-found wrap"><h1>Something didn’t connect.</h1><p>We couldn’t load this page. Please try again.</p><button className="button" onClick={reset}>Try again</button></section>; }
