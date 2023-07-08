import { IArticle } from "@/types";
import BlogCard from "./BlogCard";
import BlogCardWithImage from "./BlogCardWithImage";

type Props = {
  articles: IArticle[];
};
const ArticleList = ({ articles }: Props) => {
  
  return (
    <section className="grid lg:grid-cols-2 gap-16 mt-16">
      {articles.map((article: IArticle, index: number) => {
        return (
          <>
            {index === 1 ? (
              <BlogCardWithImage key={article.id} article={article} />
              ) : (
              <BlogCard key={article.id} article={article}/>
            )}
          </>
        );
      })}
    </section>
  );
};

export default ArticleList;
