import React, { Fragment } from 'react'
import Link from 'next/link'
import Image from 'next/image'
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

  return (
    <>
      <div className={classes.heroImage}></div>
      <h1>H1 hero</h1>
    </>
  )
}
