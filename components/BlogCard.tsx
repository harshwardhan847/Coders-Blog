import { IArticle } from "@/types";
import Image from "next/image";
import Link from "next/link";
import React from "react";

type Props = {
  article: IArticle;
};

const BlogCard = ({ article }: Props) => {
  console.log(article);
  return (
    <div>
      <Link href="#">
        <h1 className="text-xl text-gray-600 font-bold hover:decoration-2 hover:underline hover:cursor-pointer hover:decoration-primary">
          {article.attributes.Title}
        </h1>
      </Link>
      <div className="flex items-center my-4">
        <div>
          <Image
            src={`${process.env.API_BASE_URL}/${article.attributes.author.data.attributes.avatar.data.attributes.formats.thumbnail.url}`}
            alt={article.attributes.author.data.attributes.firstName}
            height={40}
            width={40}
          />
        </div>
        <span className="font-bold text-sm text-gray-600">
          {article.attributes.author.data.attributes.firstName}{" "}
          {article.attributes.author.data.attributes.lastName} on
        <span className="text-gray-400">{article.attributes.createdAt}</span>
        </span>
      </div>
    </div>
  );
};

export default BlogCard;
