export const navigation = [
  { label: "TRACI", href: "/traci" }, { label: "Solutions", href: "/solutions" },
  { label: "Devices", href: "/devices" }, { label: "Services", href: "/services" },
  { label: "Partners", href: "/partners" }, { label: "Industries", href: "/industries" },
  { label: "About", href: "/about" }
];

export type Solution = {
  slug: string; title: string; shortTitle: string; category: string; number: string;
  description: string; intro: string; focus: string[]; scope: string[]; related: string[];
};

export const solutions: Solution[] = [
  { slug: "gas-monitoring", title: "Gas Monitoring", shortTitle: "Gas", category: "Site safety", number: "01",
    description: "Connect gas monitoring with site alerts and operational evidence.",
    intro: "Bring gas monitoring into the connected site. Embuilded combines field engineering, gas systems and TRACI's telemetry, alert and evidence capabilities around the needs of your environment.",
    focus: ["Gas systems", "Telemetry & events", "Alerts & evidence"],
    scope: ["Site conditions and monitoring objectives", "Sensor placement, connectivity and power", "Alert destinations and evidence requirements", "Commissioning and maintenance responsibilities"], related: ["outrigger-monitoring", "worker-tracking"] },
  { slug: "hookcam", title: "HookCam", shortTitle: "HookCam", category: "Site visibility", number: "02",
    description: "Bring connected camera systems closer to lifting operations.",
    intro: "Make camera deployment part of a considered lifting-operation workflow. Embuilded supplies and integrates HookCam-related field systems, with engineering support for positioning, connectivity and commissioning.",
    focus: ["Connected cameras", "Field integration", "Operational visibility"],
    scope: ["Lifting environment and camera position", "Network availability and power arrangements", "Viewing and evidence workflows", "Installation, commissioning and ongoing support"], related: ["site-vision", "outrigger-monitoring"] },
  { slug: "outrigger-monitoring", title: "Outrigger Monitoring", shortTitle: "Outrigger", category: "Site safety", number: "03",
    description: "Connect outrigger monitoring to the wider operational workflow.",
    intro: "Develop an outrigger monitoring approach around the equipment, working environment and operational requirements. Connect field-system events with the appropriate TRACI workflows and integrations.",
    focus: ["Field sensors", "Operational events", "Rules & workflows"],
    scope: ["Equipment and monitoring objectives", "Available field interfaces and connectivity", "Event handling and escalation workflows", "Commissioning and service requirements"], related: ["hookcam", "gas-monitoring"] },
  { slug: "worker-tracking", title: "Worker Tracking", shortTitle: "Worker", category: "Site safety", number: "04",
    description: "Connect worker-related field events with site operations.",
    intro: "Plan a worker tracking system around the site's operational needs. Embuilded brings together field devices, connectivity and integration, with TRACI supporting events, workflows and reporting.",
    focus: ["Connected field devices", "Site events", "Reporting"],
    scope: ["Operational purpose and site coverage", "Device and connectivity requirements", "Access controls and data-handling requirements", "Reporting and platform integration"], related: ["rfid-asset-tracking", "site-vision"] },
  { slug: "site-vision", title: "Site Vision", shortTitle: "Vision", category: "Site visibility", number: "05",
    description: "Put site cameras, visual intelligence and evidence into context.",
    intro: "Connect CCTV field engineering with the software and AI capabilities your operation needs. Embuilded handles site surveys, camera positioning, networks and integration, while partners can retain their own platforms.",
    focus: ["CCTV engineering", "Partner integration", "Evidence capture"],
    scope: ["Viewing objectives and camera coverage", "Cabling, PoE and network design", "AI or platform integration requirements", "Evidence access and maintenance"], related: ["hookcam", "worker-tracking"] },
  { slug: "rfid-asset-tracking", title: "RFID / Asset Tracking", shortTitle: "Asset", category: "Asset operations", number: "06",
    description: "Connect physical assets to useful operational records.",
    intro: "Bring RFID and related field systems into your asset workflow. Embuilded combines connected hardware, site integration and TRACI's event and reporting capabilities to support a project-specific approach.",
    focus: ["RFID systems", "Asset events", "Integration & reporting"],
    scope: ["Asset types and identification workflow", "Reader placement and field connectivity", "System integration and event requirements", "Deployment and lifecycle support"], related: ["worker-tracking", "site-vision"] }
];

export const services = [
  { id: "field-engineering", number: "01", title: "Field Engineering", lead: "Make the field work.", description: "Practical engineering, from the first site survey to commissioning and maintenance.", items: ["Site surveys and camera positioning", "CCTV deployment, cabling and mounting", "PoE, 4G/5G and LoRaWAN network design", "Commissioning and maintenance"], engagement: "Engineering only" },
  { id: "connected-hardware", number: "02", title: "Connected Hardware + Engineering", lead: "Connect the right hardware.", description: "Field devices and the engineering needed to bring them into your operation.", items: ["Cameras, sensors and gateways", "Gas systems and HookCam", "RFID and related field systems", "Supply, deployment and system integration"], engagement: "Hardware + engineering" },
  { id: "managed-services", number: "03", title: "Managed Device & Software Services", lead: "Keep the system connected.", description: "Managed device infrastructure and software integration, built around your platform.", items: ["TRACI Cloud and lightweight PWA", "Device health and remote diagnostics", "OTA and device configuration", "API, MQTT and webhook integration"], engagement: "Managed device service" }
];

export const capabilities = [
  ["Device connectivity", "Bring field devices into a connected architecture."],
  ["Health & lifecycle", "Manage device health and the operating lifecycle."],
  ["Telemetry & events", "Bring operational signals into a common workflow."],
  ["Alerts", "Route relevant events into an alerting process."],
  ["Evidence capture", "Connect operational events with supporting evidence."],
  ["Rules & workflows", "Shape event handling around operating requirements."],
  ["Reporting", "Make operational records available for review."],
  ["API integration", "Connect with the systems your teams already use."],
  ["Multi-site operations", "Support connected operations across sites."]
];

export const plugins = ["TRACI Safety", "TRACI Vision", "TRACI Asset", "TRACI BCDS", "TRACI SSSS"];
export const industries = [
  { slug: "construction", title: "Construction", description: "Connected field systems for the changing conditions of a construction site.", focus: "Site visibility · Connected devices · Field engineering", solutions: ["gas-monitoring", "hookcam", "site-vision"] },
  { slug: "infrastructure", title: "Infrastructure", description: "Device connectivity and operational evidence across infrastructure environments.", focus: "Field connectivity · Multi-site operations · Evidence", solutions: ["site-vision", "outrigger-monitoring", "rfid-asset-tracking"] },
  { slug: "property-facilities", title: "Property & facilities", description: "Connect building systems, asset information and day-to-day operations.", focus: "Asset workflows · Cameras · Managed services", solutions: ["rfid-asset-tracking", "site-vision"] },
  { slug: "industrial", title: "Industrial", description: "Bring field hardware and system integration into industrial operations.", focus: "Sensors · Operational events · Integration", solutions: ["gas-monitoring", "rfid-asset-tracking", "worker-tracking"] }
];

export const devices = [
  { title: "Cameras & CCTV", category: "Vision", description: "Field cameras with positioning, network and commissioning support.", solution: "site-vision", icon: "camera" },
  { title: "HookCam systems", category: "Vision", description: "Connected camera systems for lifting-operation environments.", solution: "hookcam", icon: "camera" },
  { title: "Gas systems", category: "Monitoring", description: "Gas-related field systems integrated around site requirements.", solution: "gas-monitoring", icon: "sensor" },
  { title: "Sensors & gateways", category: "Connectivity", description: "Field sensing and gateways connecting devices with operational systems.", solution: "outrigger-monitoring", icon: "network" },
  { title: "RFID systems", category: "Identification", description: "Identification hardware for connected asset workflows.", solution: "rfid-asset-tracking", icon: "tag" },
  { title: "Worker field systems", category: "Identification", description: "Connected field devices for worker-related site workflows.", solution: "worker-tracking", icon: "worker" }
];

export const caseStudies: { title: string; slug: string; description: string }[] = [];
export const solutionCategories = ["All solutions", ...new Set(solutions.map(s => s.category))];
