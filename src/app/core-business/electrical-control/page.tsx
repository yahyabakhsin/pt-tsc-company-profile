import { Metadata } from "next";
import { businessPages } from "../data";
import ClientPage from "../components/ClientPage";

const pageData = businessPages["electrical-control"];

export const metadata: Metadata = {
  title: "Electrical & Control System Engineering – PT Tirta Surya Cipta",
  description: pageData.hero.description,
};

export default function ElectricalControlPage() {
  return <ClientPage slug="electrical-control" />;
}
