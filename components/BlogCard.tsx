import { IArticle } from "@/types";
import { formatDate, sliceText } from "@/utils";
import Image from "next/image";
import Link from "next/link";
import React from "react";

type Props = {
  article: IArticle;
};

const BlogCard = ({ article }: Props) => {
  return (
    <div>
      <Link href={`/article/${article.attributes.slug}`}>
        <h1 className="text-xl text-gray-600 font-bold hover:decoration-2 hover:underline hover:cursor-pointer hover:decoration-primary">
          {article.attributes.Title}
        </h1>
      </Link>
      <div className="flex items-center my-4">
        <div className="rounded-lg overflow-hidden flex items-center justify-center object-contain mr-2">
          <Image
            src={`${process.env.API_BASE_URL}${article.attributes.author.data.attributes.avatar.data.attributes.url}`}
            alt={article.attributes.author.data.attributes.username}
            height={80}
            width={40}
            className="w-12 h-12 object-cover"
          />
        </div>
        {/* {console.log(article.attributes.author.data.attributes.avatar)} */}
        <span className="font-bold text-sm text-gray-600">
          {article.attributes.author.data.attributes.username} on &nbsp;
        <span className="text-gray-400">{formatDate(article.attributes.createdAt)}</span>
        </span>
      </div>
      <div>{sliceText(article.attributes.body,250)}</div>
    </div>
  );
};

export default BlogCard;
