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

  function formatDateWithComma(dateString) {
    const date = new Date(dateString)

    // Pobieramy części daty
    const day = date.toLocaleDateString('en-GB', { day: '2-digit' })
    const month = date.toLocaleDateString('en-GB', { month: 'short' })
    const year = date.toLocaleDateString('en-GB', { year: 'numeric' })

    // Składamy wynik z przecinkiem po miesiącu
    return `${day} ${month}, ${year}`
  }

  var imageLink
  if (typeof post.meta.image === 'object' && post.meta.image !== null) {
    imageLink = serverURL + '/media/' + post.meta.image.filename
  }

  return (
    <div className="p-3 h-1/2">
      <div
        className="rounded-3xl w-full h-full bg-center bg-no-repeat bg-fit bg-cover relative"
        style={{
          backgroundImage: `linear-gradient(to top, rgba(0, 0, 0, 0.9), rgba(0, 0, 0, 0)), url(${imageLink})`,
        }}
      >
        <div className="flex h-full items-end px-4 pb-10">
          {/* Warstwa przyciemniająca */}
          <div className="flex flex-col">
            <h1 className="text-customWhite text-2xl z-10">{post.title}</h1>
            <p className="text-gray-300 text-sm pt-2">
              {formatDateWithComma(post.publishedAt)} <span className="text-customWhite">•</span>{' '}
              Categories
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
