import { fetchArticles, fetchCategories } from "./api";
import { IArticle, ICategory, ICollectionResponse } from "../types/index";
import { AxiosResponse } from "axios";
import Tabs from "@/components/Tabs";
import ArticleList from "@/components/ArticleList";
import qs from 'qs'
type Props = {};


async function Home({}: Props) {
  const data: AxiosResponse<ICollectionResponse<ICategory[]>> =
    await fetchCategories();
  const categories: ICollectionResponse<ICategory[]> = data.data;
  const options = {
    populate:['author.avatar'],
    sort:['id:desc'],
  }
  const queryString = qs.stringify(options)
  console.log("string "+queryString);
  const articlesData:AxiosResponse<ICollectionResponse<IArticle[]>> = await fetchArticles(queryString);
  const articles:ICollectionResponse<IArticle[]> = articlesData.data;

  return (
    <>
      <Tabs categories={categories.data} />
      <main>
        {/* Articles */}
        <ArticleList articles={articles.data}/>
      </main>
    </>
  );
}

export default Home;
