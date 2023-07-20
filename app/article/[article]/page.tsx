import { fetchArticle } from "@/app/api";
import { IArticle, ICollectionResponse } from "@/types";
import { capitalizeFirstLetter, formatDate, makeCategory } from "@/utils";
import { AxiosResponse } from "axios";
import Image from "next/image";
import QueryString from "qs";
import React from "react";
import { MDXRemote } from "next-mdx-remote/rsc";
export async function generateMetadata({ params }: Props) {
  const formattedCategory = (): string => {
    return capitalizeFirstLetter(makeCategory(params.article));
  };
  return {
    title: `Coders Blog - ${formattedCategory()}`,
    description: "Spread your coding knowledge to others.",
  };
}
type Props = {
  params: {
    article: string;
  };
};
const Article = async ({ params }: Props) => {
  console.log(params.article);
  const queryString = QueryString.stringify({
    populate: ["Image", "author.avatar"],
    filters: {
      slug: {
        $eq: params.article,
      },
    },
  });
  const { data: article }: AxiosResponse<ICollectionResponse<IArticle[]>> =
    await fetchArticle(queryString);
  return article.data.length === 0 ? (
    <div>Not Found</div>
  ) : (
    <div className="my-36 grid lg:grid-cols-3 gap-12 single-article ">
      <div className="col-span-2">
        <h1 className="text-3xl font-bold py-2 ">
          {article.data[0].attributes.Title}
        </h1>
        <div className="flex items-center my-4">
          <div className="rounded-lg overflow-hidden flex items-center justify-center object-contain mr-2">
            <Image
              src={`${process.env.API_BASE_URL}${article.data[0].attributes.author.data.attributes.avatar.data.attributes.url}`}
              alt={article.data[0].attributes.author.data.attributes.username}
              height={80}
              width={40}
              className="w-12 h-12 object-cover"
            />
          </div>
          {/* {console.log(article.data[0].attributes.author.data.attributes.avatar)} */}
          <span className="font-bold text-sm text-gray-600">
            {article.data[0].attributes.author.data.attributes.username} on
            &nbsp;
            <span className="text-gray-400">
              {formatDate(article.data[0].attributes.createdAt)}
            </span>
          </span>
        </div>
        <div className="text=lg text-gray-600 leading-8">
          <Image
            width={1000}
            height={1000}
            className="w-full my-12 mb-6 rounded-3xl"
            src={`${process.env.API_BASE_URL}${article.data[0].attributes.Image.data.attributes.url}`}
            alt={article.data[0].attributes.Title}
          />
        </div>
        <MDXRemote source={article.data[0].attributes.body} />
        
      </div>
      <div>Right</div>
    </div>
  );
};

export default Article;
