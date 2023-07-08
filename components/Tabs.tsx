"use client";
import { ICategory } from "@/types";
import { debounce } from "@/utils";
import Link from "next/link";
import {
  useParams,
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";

type Props = {
  categories: ICategory[];
};

const Tabs = ({ categories }: Props) => {
  const params = useParams();
  const pathname = usePathname();
  const router = useRouter();
  const isActiveLink = (slug: string) => {
    return slug === params.category ? true : false;
  };
  function handleOnSearch(e: Event) {
    const value = e.target?.value;
    if (!value) {
      if(params.category){
        router.push(`/category/${params.category}`)
      }else{
        router.push("/");
      }
      return;
    }
    if (params.category) {
      router.push(`/category/${params.category}/?search=${value}`);
      return
    } 
    router.push(`/?search=${value}`);
  }
  return (
    <div className="my-8 flex items-center justify-between border-b-2 border-gray-100">
      <ul className="flex items-center">
        <li
          className={
            "mr-6 pb-4 rounded-sm " +
            `${
              pathname === "/"
                ? " text-primary border-b-4 border-b-primary"
                : " border-white text-gray-400"
            }`
          }
        >
          <Link href="/">Recent</Link>
        </li>
        {categories.map((category: ICategory) => {
          return (
            <li
              key={category.id}
              className={
                "mr-6 pb-4 rounded-sm" +
                `${
                  isActiveLink(category.attributes.Slug)
                    ? " border-b-primary text-primary border-b-4"
                    : " text-gray-400"
                }`
              }
            >
              <Link href={`/category/${category.attributes.Slug}`} className="">
                {category.attributes.Title}
              </Link>
            </li>
          );
        })}
      </ul>
      <div className="flex items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 101 101"
          id="search"
          className="w-6"
        >
          <path d="M63.3 59.9c3.8-4.6 6.2-10.5 6.2-17 0-14.6-11.9-26.5-26.5-26.5S16.5 28.3 16.5 42.9 28.4 69.4 43 69.4c6.4 0 12.4-2.3 17-6.2l20.6 20.6c.5.5 1.1.7 1.7.7.6 0 1.2-.2 1.7-.7.9-.9.9-2.5 0-3.4L63.3 59.9zm-20.4 4.7c-12 0-21.7-9.7-21.7-21.7s9.7-21.7 21.7-21.7 21.7 9.7 21.7 21.7-9.7 21.7-21.7 21.7z"></path>
        </svg>
        <input
          type="text"
          onChange={debounce(handleOnSearch, 500)}
          placeholder="Search"
          className="outline-none px-2 py-1 ml-1"
        />
      </div>
    </div>
  );
};

export default Tabs;
