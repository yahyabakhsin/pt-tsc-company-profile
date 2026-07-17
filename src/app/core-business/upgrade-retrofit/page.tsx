import { Metadata } from "next";
import { businessPages } from "../data";
import ClientPage from "../components/ClientPage";

const pageData = businessPages["upgrade-retrofit"];

export const metadata: Metadata = {
  title: "Upgrade, Retrofit & Optimization – PT Tirta Surya Cipta",
  description: pageData.hero.description,
};

export default function UpgradeRetrofitPage() {
  return <ClientPage slug="upgrade-retrofit" />;
}
