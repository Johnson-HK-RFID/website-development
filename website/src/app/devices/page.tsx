import { pageMetadata } from "@/lib/metadata";
import { Catalog } from "@/components/catalog";
import { ContactBand, PageIntro } from "@/components/shared";
export const metadata = pageMetadata("/devices", "Connected devices", "Cameras, sensors, gateways, gas systems, HookCam and RFID field systems with engineering and integration support.");
export default function DevicesPage() { return <><PageIntro label="DEVICES" title={<>Hardware is the start.<br />Integration makes it work.</>} description="Cameras, sensors, gateways and related field systems, supported by engineering from deployment to commissioning." /><Catalog kind="devices" /><section className="page-panel"><div className="wrap"><h2>The right device for the right conditions.</h2><p className="note">This is a guide to our device categories. Specific models, technical specifications and suitability are confirmed against your site requirements.</p></div></section><ContactBand title="Let’s connect the right hardware." /></>; }
