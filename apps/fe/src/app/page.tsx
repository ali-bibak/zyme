import { loadAboutPage } from "@/sanity/data";

export default async function Home() {
  const data = await loadAboutPage("en");
  console.log(data);
  return <div className="text-white">hh</div>;
}
