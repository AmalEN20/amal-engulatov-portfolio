import {
  OnePagePortfolio,
  type PortfolioTypeStyle,
} from "./components/OnePagePortfolio";

const typeStyles = new Set<PortfolioTypeStyle>(["geist", "instrument", "plex"]);

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ type?: string | string[] }>;
}) {
  const requestedType = (await searchParams).type;
  const typeValue = Array.isArray(requestedType) ? requestedType[0] : requestedType;
  const typeStyle = typeStyles.has(typeValue as PortfolioTypeStyle)
    ? (typeValue as PortfolioTypeStyle)
    : "instrument";

  return <OnePagePortfolio typeStyle={typeStyle} />;
}
