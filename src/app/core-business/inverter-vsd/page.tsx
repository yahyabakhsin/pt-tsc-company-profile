import { Metadata } from "next";
import { businessPages } from "../data";
import ClientPage from "../components/ClientPage";

const pageData = businessPages["inverter-vsd"];

export const metadata: Metadata = {
  title: "Inverter & VSD Implementation – PT Tirta Surya Cipta",
  description: pageData.hero.description,
};

export default function InverterVsdPage() {
  return <ClientPage slug="inverter-vsd" />;
}
