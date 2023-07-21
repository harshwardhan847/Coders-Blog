// "use client"
import { AxiosResponse } from "axios";
import Tabs from "@/components/Tabs";
import { IArticle, ICategory, ICollectionResponse, IQueryOptions } from "@/types";
import { fetchArticles, fetchCategories } from "@/app/api";
import qs from "qs";
import ArticleList from "@/components/ArticleList";
import Pagination from "@/components/Pagination";
import { capitalizeFirstLetter, makeCategory } from "@/utils";

export async function generateMetadata({ params }: Props) {
  const formattedCategory = (): string => {
    return capitalizeFirstLetter(makeCategory(params.category));
  };
  return {
    title: `Coders Blog ${formattedCategory()}`,
    description: "Spread your coding knowledge to others.",
  };
}
type Props = {
  params: {
    category: string;
  };
  searchParams:{
    page: number;
    search:string;
  }
};

const Category = async ({ params,searchParams }: Props) => {
  console.log("params" + params);
  const data: AxiosResponse<ICollectionResponse<ICategory[]>> =
    await fetchCategories();
  const categories: ICollectionResponse<ICategory[]> = data.data;
  const options:IQueryOptions = {
    populate: ["author.avatar"],
    sort: ["id:desc"],
    filters: {
      category: {
        Slug: params.category,
      },
    },
    pagination: {
      page: searchParams.page ? searchParams.page : 1,
      pageSize: 4,
    },
  };
  if(searchParams.search){
    options.filters = {
      Title:{
        $containsi: searchParams.search,
      },
      body:{
        $containsi: searchParams.search,
      }
    }
  }
  const queryString = qs.stringify(options);
  const articlesData: AxiosResponse<ICollectionResponse<IArticle[]>> =
    await fetchArticles(queryString);
  const articles: ICollectionResponse<IArticle[]> = articlesData.data;
  const { page, pageCount } = articles.meta.pagination;
  console.log("page: " + page);
  return (
    <>
      <Tabs categories={categories.data} />
      <ArticleList articles={articles.data} />
      <Pagination
        page={page}
        pageCount={pageCount}
        redirectUrl={`${params.category}/`}
      />
    </>
  );
};

export default Category;
