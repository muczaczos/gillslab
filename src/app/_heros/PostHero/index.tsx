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

  const serverURL = process.env.PAYLOAD_PUBLIC_SERVER_URL || 'http://localhost:3000'

  console.log(serverURL + '/media/' + post.meta.image.filename)

  const imageLink = serverURL + '/media/' + post.meta.image.filename

  return (
    <div className="p-3 h-1/2">
      <div
        className="rounded-3xl w-full h-full bg-center bg-no-repeat bg-fit bg-cover relative"
        style={{
          backgroundImage: `linear-gradient(to top, rgba(0, 0, 0, 0.9), rgba(0, 0, 0, 0)), url(${imageLink})`,
        }}
      >

        <div className="flex h-full items-end p-4">
          {/* Warstwa przyciemniająca */}
          <h1 className="text-customWhite text-2xl z-10">{post.title}</h1>
        </div>
      </div>
    </div>
  )
}
