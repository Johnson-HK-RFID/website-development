import { pageMetadata } from "@/lib/metadata";
import { Catalog } from "@/components/catalog";
import { ContactBand, PageIntro } from "@/components/shared";
export const metadata = pageMetadata("/solutions", "Connected solutions", "Explore Gas Monitoring, HookCam, Outrigger Monitoring, Worker Tracking, Site Vision and RFID / Asset Tracking.");
export default function SolutionsPage() { return <><PageIntro label="SOLUTIONS" title={<>Start with your site.<br />Connect what matters.</>} description="Practical combinations of field devices, engineering and TRACI capabilities, shaped around the environment you work in." /><Catalog kind="solutions" /><ContactBand title="Have a different challenge?" description="Start with your requirements. We’ll help shape the right approach." /></>; }
