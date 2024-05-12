import Link from "next/link";
import useAuctionItems from "@/hooks/useAuctionItems";

const GoToButtons = ({ currenItemId }: { currenItemId: string }) => {
  const { auctionItems } = useAuctionItems();

  const currentIndex = auctionItems.findIndex(
    (item) => item.id === currenItemId
  );
  const nextItemId =
    currentIndex >= 0 && currentIndex < auctionItems.length - 1
      ? auctionItems[currentIndex + 1].id
      : undefined;
  const previousItemId =
    currentIndex > 0 ? auctionItems[currentIndex - 1].id : undefined;

  return (
    <div className="flex gap-2">
      {previousItemId && (
        <Link href={`/${previousItemId}`} passHref>
          <button
            className="btn btn-circle btn-outline btn-sm"
            disabled={!previousItemId}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
              />
            </svg>
          </button>
        </Link>
      )}
      {nextItemId && (
        <Link href={`/${nextItemId}`} passHref>
          <button
            className="btn btn-circle btn-outline btn-sm"
            disabled={!nextItemId}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
              />
            </svg>
          </button>
        </Link>
      )}
    </div>
  );
};

export default GoToButtons;
