import Link from "next/link";
import { Container } from "../shared/container";
import { Cpu, Mail, Phone, MapPin } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  const services = [
    { name: "Industrial Automation", href: "/projects" },
    { name: "PLC Programming", href: "/projects" },
    { name: "HMI & SCADA Systems", href: "/projects" },
    { name: "VSD / Inverter System", href: "/projects" },
    { name: "Electrical Control Panels", href: "/projects" },
  ];

  const company = [
    { name: "About Us", href: "/about" },
    { name: "Projects Portfolio", href: "/projects" },
    { name: "Contact & Support", href: "/contact" },
  ];

  return (
    <footer className="border-t border-border bg-[#05070a] text-gray-400 py-12 md:py-16">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12">
          {/* Company Brief */}
          <div className="flex flex-col space-y-4">
            <Link href="/" className="flex items-center space-x-2 text-white font-bold tracking-wider">
              <Cpu className="h-6 w-6 text-primary" />
              <span>PT <span className="text-primary">TSC</span></span>
            </Link>
            <p className="text-sm text-gray-500 leading-relaxed">
              Specialist in industrial system automation, PLC programming, SCADA development, and electrical integrations for high-performance operations.
            </p>
          </div>

          {/* Engineering Services */}
          <div>
            <h4 className="text-white text-sm font-semibold tracking-wider uppercase mb-4">
              Services
            </h4>
            <ul className="space-y-2 text-sm">
              {services.map((item) => (
                <li key={item.name}>
                  <Link href={item.href} className="hover:text-primary transition-colors">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white text-sm font-semibold tracking-wider uppercase mb-4">
              Company
            </h4>
            <ul className="space-y-2 text-sm">
              {company.map((item) => (
                <li key={item.name}>
                  <Link href={item.href} className="hover:text-primary transition-colors">
                    {item.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/admin/login" className="hover:text-primary transition-colors text-xs text-gray-600">
                  Admin Login Gate
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="flex flex-col space-y-3 text-sm">
            <h4 className="text-white text-sm font-semibold tracking-wider uppercase mb-1">
              PT TSC Office
            </h4>
            <div className="flex items-start space-x-2">
              <MapPin className="h-5 w-5 text-primary shrink-0 mt-0.5" />
              <span className="text-gray-500">
                Kawasan Industri Surabaya, Blok C-12, Surabaya, Jawa Timur, Indonesia
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <Phone className="h-4 w-4 text-primary shrink-0" />
              <span>+62 31 123 4567</span>
            </div>
            <div className="flex items-center space-x-2">
              <Mail className="h-4 w-4 text-primary shrink-0" />
              <a href="mailto:info@tirtasuryacipta.com" className="hover:text-primary transition-colors">
                info@tirtasuryacipta.com
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-border/30 mt-12 pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-gray-600">
          <p>&copy; {currentYear} PT Tirta Surya Cipta. All rights reserved.</p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <Link href="/" className="hover:underline">Privacy Policy</Link>
            <Link href="/" className="hover:underline">Terms of Service</Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}
export default Footer;
