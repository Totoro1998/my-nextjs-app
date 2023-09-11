import TablesPage from "@/components/pages/Tables";

export const runtime = "edge";

export const metadata = {
  title: "GuruSQL - SQL Tables",
  description:
    "GuruSQL gives the power to craft efficient, accurate SQL queries without any understanding of the SQL knowledge. Take advantage of GuruSQL and save yourself precious time while enhancing productivity!",
  icons: {
    icon: "/logo-icon.svg",
    shortcut: "/logo-icon.svg",
  },
};

export default function Generateor() {
  return <TablesPage />;
}
