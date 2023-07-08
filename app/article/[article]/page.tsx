import { fetchArticle } from '@/app/api';
import { IArticle, ICollectionResponse } from '@/types';
import { AxiosResponse } from 'axios';
import QueryString from 'qs';
import React from 'react'

type Props = {
    params:{
        article:string;};
        
}

const Article = async ({params}: Props) => {
    console.log(params.article);
    const queryString = QueryString.stringify({
        populate:['Image','author.avatar'],
        filters:{
            slug:{
                $eq:params.article
            }
        }
    })
    const {data:article}:AxiosResponse<ICollectionResponse<IArticle[]>> = await fetchArticle(queryString);
  return (
    article.data.length===0?<div>Not Found</div>:<div>
        {article.data[0].attributes.Title}
    </div>
  )
}

export default Article