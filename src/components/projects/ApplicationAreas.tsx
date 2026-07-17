"use client";

import { FadeUp } from "@/components/shared/FadeUp";

export function ApplicationAreas() {
  const areas = [
    { num: "01", title: "Pumping Systems", desc: "Reliable control and automation solutions for pumping operations, booster, submersible pumps, circulation pumps, process pump, and distribution systems." },
    { num: "02", title: "Drives and Motor Control", desc: "Motor control solutions designed to improve operational efficiency, starting performance, speed regulation, and equipment protection" },
    { num: "03", title: "Booster Pump Systems", desc: "Integrated booster pump solutions for stable pressure control, automatic pump sequencing, and dependable water distribution performance." },
    { num: "04", title: "Water Treatment Systems", desc: "Automation and control systems for water treatment processes, including pumping, filtration, dosing and distribution application." },
    { num: "05", title: "HVAC Systems", desc: "Electrical and automation support for HVAC equipment such as chilled water pumps, ventilation systems, and air handling units." },
    { num: "06", title: "Fans and Blower", desc: "Control systems for fan and blower applications requiring stable airflow, speed control, and improved operational efficiency." },
    { num: "07", title: "Compressors", desc: "Automation and motor control solutions for compressor systems to support dependable operation, controlled performance, and better reliability." },
    { num: "08", title: "Conveyor Systems", desc: "Motor control and automation integration for conveyor systems to improve startup performance, operational stability, and efficiency." },
    { num: "09", title: "Utility Systems", desc: "Engineering solutions for critical utility system including water supply, distribution pumping, and supporting infrastructure." },
    { num: "10", title: "Process Manufacturing System", desc: "Automation and electrical solutions that support process-driven manufacturing operations, helping improve consistency and performance." }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
      {areas.map((area, i) => (
        <FadeUp key={area.num} delay={i * 50}>
          <div className="flex items-start gap-5">
            <div className="w-10 h-10 rounded-lg bg-[#59D66F] text-[#071A14] font-bold flex items-center justify-center shrink-0">
              {area.num}
            </div>
            <div>
              <h3 className="text-white font-bold text-sm mb-1.5">{area.title}</h3>
              <p className="text-gray-400 text-xs leading-relaxed max-w-sm">
                {area.desc}
              </p>
            </div>
          </div>
        </FadeUp>
      ))}
    </div>
  );
}
