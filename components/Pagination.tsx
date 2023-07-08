"use client"
import { TDirection } from "@/types";
import { useParams,useRouter, useSearchParams } from "next/navigation";
import QueryString from "qs";

type Props = {
  page: number;
  pageCount: number;
  redirectUrl: string;
};

const Pagination = ({ page, pageCount, redirectUrl = "" }: Props) => {
  const router = useRouter();
  const isNextDissabled = (): boolean => {
    return page >= pageCount;
  };
  const isPrevDissabled = (): boolean => {
    return page <= 1;
  };

  const handlePaginate = async (direction: TDirection) => {
    if (direction === 1 && isNextDissabled()) {
      return;
    }
    if (direction === -1 && isPrevDissabled()) {
      return;
    }
    // router.replace()
    router.push(`${redirectUrl}?page=${page+direction}`)
    router.replace(`${redirectUrl}?page=${page+direction}`)
    
    
  };
  return (
    <div className="flex justify-center items-center mt-24 gap-8">
      <button
        onClick={() => handlePaginate(-1)}
        className={`bg-primary py-2 text-white w-24 rounded ${
          isPrevDissabled() && "disabled"
        }`}
      >
        Previous
      </button>
      <button
        onClick={() => handlePaginate(1)}
        className={`bg-primary py-2 text-white w-24 rounded ${
          isNextDissabled() && "disabled"
        }`}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
