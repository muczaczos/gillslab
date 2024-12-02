import React, { Fragment } from 'react'
import Image from 'next/image'
import Link from 'next/link'

import { Post } from '../../../payload/payload-types'
import { Gutter } from '../../_components/Gutter'
import { Media } from '../../_components/Media'
import RichText from '../../_components/RichText'
import { formatDateTime } from '../../_utilities/formatDateTime'

import classes from './index.module.scss'

export const PostHero: React.FC<{
  post: Post
}> = ({ post }) => {
  const {
    id,
    title,
    categories,
    meta: { image: metaImage, description } = {},
    publishedAt,
    populatedAuthors,
  } = post

  const serverURL = process.env.PAYLOAD_PUBLIC_SERVER_URL || 'http://localhost:3000';

  console.log(serverURL + "/media/" + post.meta.image.filename)

  const imageLink = serverURL + "/media/" + post.meta.image.filename

  return (
    <>
      <div
        className="h-96 bg-cover bg-center"
        style={{
          backgroundImage: `url(${imageLink})`,
        }}
      ></div>
      <h1>H1 hero</h1>
    </>
  )
}
