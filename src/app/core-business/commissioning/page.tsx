import { Metadata } from "next";
import { businessPages } from "../data";
import ClientPage from "../components/ClientPage";

const pageData = businessPages["commissioning"];

export const metadata: Metadata = {
  title: "Commissioning & Troubleshooting – PT Tirta Surya Cipta",
  description: pageData.hero.description,
};

export default function CommissioningPage() {
  return <ClientPage slug="commissioning" />;
}
