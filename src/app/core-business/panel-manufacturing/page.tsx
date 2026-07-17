import { Metadata } from "next";
import { businessPages } from "../data";
import ClientPage from "../components/ClientPage";

const pageData = businessPages["panel-manufacturing"];

export const metadata: Metadata = {
  title: "Panel Manufacturing & Integration – PT Tirta Surya Cipta",
  description: pageData.hero.description,
};

export default function PanelManufacturingPage() {
  return <ClientPage slug="panel-manufacturing" />;
}
