import { LucideIcon, Wrench, Settings, Shield, Cpu, Clock, MapPin, Calendar, HelpCircle } from "lucide-react";

export interface MockProject {
  slug: string;
  category: string;
  title: string;
  subtitle: string;
  description: string;
  year: string;
  location: string;
  industry: string;
  application: string;
  service: string;
  scope: string;
  status: string;
  challenge: string[];
  solution: string[];
  results: string[];
  highlights: string[];
  bgImage: string;
  galleryImages: string[];
}

export const mockProjects: MockProject[] = [
  {
    slug: "booster-pump-upgrade",
    category: "BUILDING UTILITIES",
    title: "Booster Pump System Upgrade & Automation",
    subtitle: "Integrated VSD system with new control panel and automation for building water supply reliability and energy efficiency.",
    description: "This project involved upgrading an existing booster pump system for a commercial building to improve water pressure stability, reduce energy consumption, and enhance operational reliability. We implemented a Variable Speed Drive (VSD) system with a new PLC-based control panel and automation logic to maintain consistent pressure based on demand while providing comprehensive monitoring and protection.",
    year: "2024",
    location: "Bekasi, Indonesia",
    industry: "Building Utilities",
    application: "Booster Pump System",
    service: "VSD & Automation",
    scope: "Design, Supply, Integration, Testing & Commissioning",
    status: "Completed",
    challenge: [
      "Inconsistent water pressure during peak usage.",
      "High energy consumption due to pumps running at constant speed.",
      "Frequent pump cycling causing mechanical stress and shorter equipment life.",
      "Limited monitoring and no centralized control."
    ],
    solution: [
      "Installed VSD to control pump speed based on demand.",
      "Developed PLC-based control logic to maintain stable pressure.",
      "Integrated HMI for real-time monitoring and status visualization.",
      "Implemented protection features and alarm notification system."
    ],
    results: [
      "35% energy savings compared to previous system.",
      "Improved pressure stability and system reliability.",
      "Reduced pump cycling and extended equipment lifespan.",
      "Centralized monitoring and user-friendly control interface."
    ],
    highlights: [
      "4 Pumps Integrated with VSD Control",
      "PLC + HMI Based Automation",
      "Real-Time Monitoring & Alarm System",
      "Energy Efficient Operation",
      "Improve Pressure Stability",
      "System Protection & Safety Interlock"
    ],
    bgImage: "/images/project-1a.jpg",
    galleryImages: [
      "/images/project-1a.jpg",
      "/images/project-1b.jpg",
      "/images/project-1c.jpg",
      "/images/project-1a.jpg"
    ]
  },
  {
    slug: "water-treatment-automation",
    category: "WATER TREATMENT",
    title: "Water Treatment Plant Automation",
    subtitle: "PLC and SCADA based automation for filtration backwash, chemical dosing, and monitoring system.",
    description: "Upgraded manual filtration and dosing controls to a fully automated PLC and SCADA system. The system automates filter backwashing sequences, precise chemical dosing based on flow rates, and aggregates historical data for quality reports.",
    year: "2024",
    location: "Karawang, Indonesia",
    industry: "Water Treatment",
    application: "Filtration & Dosing",
    service: "PLC & SCADA",
    scope: "Electrical Design, Programming & Commissioning",
    status: "Completed",
    challenge: [
      "Inconsistent chemical dosing levels due to manual adjustments.",
      "Filters clogging and causing flow restrictions.",
      "Lack of real-time monitoring for turbidity and pH."
    ],
    solution: [
      "Configured automated backwash cycles using differential pressure sensors.",
      "Installed flow proportional chemical dosing pumps.",
      "Deployed SCADA workstation for centralized plant control."
    ],
    results: [
      "Water quality compliance increased to 99.8%.",
      "Reduced chemical waste by 18%.",
      "Automated alerts for immediate troubleshooting."
    ],
    highlights: [
      "Automated Backwash Sequencing",
      "Flow-Proportional Dosing Control",
      "SCADA Central Monitoring Station",
      "Compliance & Quality Logging"
    ],
    bgImage: "/images/project-1b.jpg",
    galleryImages: [
      "/images/project-1b.jpg",
      "/images/project-1a.jpg",
      "/images/project-1c.jpg",
      "/images/project-1b.jpg"
    ]
  },
  {
    slug: "conveyor-system-automation",
    category: "MANUFACTURING",
    title: "Conveyor System Automation",
    subtitle: "Control panel integration and motor control system for conveyor line to improve performance and reliability.",
    description: "Designed and integrated a control system for a manufacturing conveyor line. We implemented speed synchronization across multiple sections, soft start/stop curves to protect fragile goods, and modern safety interlocks.",
    year: "2024",
    location: "Cikarang, Indonesia",
    industry: "Manufacturing",
    application: "Material Handling",
    service: "Control System",
    scope: "Control Panel Supply, Programming & Startup",
    status: "Completed",
    challenge: [
      "Material bottlenecks at transfer points.",
      "Frequent mechanical wear from abrupt starting.",
      "Safety system not meeting updated standards."
    ],
    solution: [
      "Programmed synchronized VSD motor speed curves.",
      "Integrated safety relay modules and emergency stop buttons.",
      "Designed a robust, dust-resistant control enclosure."
    ],
    results: [
      "Increased line throughput by 12%.",
      "Zero safety incidents since commissioning.",
      "Significantly lower mechanical maintenance downtime."
    ],
    highlights: [
      "VSD Multi-Motor Synchronization",
      "Category 3 Safety Architecture",
      "Intelligent Bottleneck Detection",
      "Dust & Splash Proof Panel Enclosure"
    ],
    bgImage: "/images/project-1c.jpg",
    galleryImages: [
      "/images/project-1c.jpg",
      "/images/project-1a.jpg",
      "/images/project-1b.jpg",
      "/images/project-1c.jpg"
    ]
  }
];
