import { Metadata } from "next";
import { businessPages } from "../data";
import ClientPage from "../components/ClientPage";

const pageData = businessPages["technical-service"];

export const metadata: Metadata = {
  title: "Technical Service & Long-Term Support – PT Tirta Surya Cipta",
  description: pageData.hero.description,
};

export default function TechnicalServicePage() {
  return <ClientPage slug="technical-service" />;
}
