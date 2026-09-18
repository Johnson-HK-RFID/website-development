"use client";
import { useCopy } from "@/i18n/copy";

export default function ErrorPage({ reset }: {
    reset: () => void;
}) {
 const t = useCopy(); return <section className="not-found wrap"><h1>{t("Something didn\u2019t connect.")}</h1><p>{t("We couldn\u2019t load this page. Please try again.")}</p><button className="button" onClick={reset}>{t("Try again")}</button></section>; }
