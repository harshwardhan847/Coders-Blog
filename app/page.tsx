
import { fetchArticles, fetchCategories } from "./api";
import { IArticle, ICategory, ICollectionResponse, IQueryOptions } from "../types/index";
import { AxiosResponse } from "axios";
import Tabs from "@/components/Tabs";
import ArticleList from "@/components/ArticleList";
import qs from "qs";
import Pagination from "@/components/Pagination";
type Props = {
  params:{};
  searchParams:{
    page: number;
    search: string;
  };
};

async function Home({params,searchParams}: Props) {
  const data: AxiosResponse<ICollectionResponse<ICategory[]>> =
    await fetchCategories();
  const categories: ICollectionResponse<ICategory[]> = data.data;
  
  const options:IQueryOptions = {
    populate: ["author.avatar"],
    sort: ["id:desc"],
    pagination: {
      page: searchParams.page ? +searchParams.page : 1,
      pageSize: 10,
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
  return (
    <>
      <Tabs categories={categories.data} />
      <main>
        {/* Articles */}
        <ArticleList articles={articles.data} />
      </main>
      <Pagination page={page} pageCount={pageCount} redirectUrl="" />
    </>
  );
}

export default Home;
