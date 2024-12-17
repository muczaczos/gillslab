import React from 'react'
import { FaHeart } from 'react-icons/fa'
import { IoArrowBackOutline, IoHeart, IoHeartOutline, IoShareOutline } from 'react-icons/io5'
import { PiShareFatFill } from 'react-icons/pi'

import { Post } from '../../../payload/payload-types'
import { Gutter } from '../../_components/Gutter'

export const PostHero: React.FC<{
  post: Post
}> = ({ post }) => {
  const { title, meta: { image: metaImage } = {}, publishedAt } = post

  const serverURL = process.env.PAYLOAD_PUBLIC_SERVER_URL || 'http://localhost:3000'

  function formatDateWithComma(dateString: string) {
    const date = new Date(dateString)

    const day = date.toLocaleDateString('en-GB', { day: '2-digit' })
    const month = date.toLocaleDateString('en-GB', { month: 'short' })
    const year = date.toLocaleDateString('en-GB', { year: 'numeric' })

    return `${day} ${month}, ${year}`
  }

  let imageLink
  if (typeof post.meta.image === 'object' && post.meta.image !== null) {
    imageLink = serverURL + '/media/' + post.meta.image.filename
  }

  return (
    <Gutter>
      <div className="pt-3 relative md:flex md:items-center">
        <div
          className="rounded-3xl w-full md:w-1/3 pb-5 pt-96 md:pt-[500px] bg-center bg-no-repeat bg-cover relative"
          style={{
            backgroundImage: `linear-gradient(to top, rgba(0, 0, 0, 0.9), rgba(0, 0, 0, 0)), url(${imageLink})`,
          }}
        >
          <div className="flex h-full items-end px-4 pb-10">
            <div className="flex flex-col z-10">
              <h1 className="md:hidden text-customWhite text-2xl">{title}</h1>
              <p className="md:hidden text-gray-300 text-sm pt-2">
                {formatDateWithComma(publishedAt)} <span className="text-customWhite">•</span>{' '}
                Categories
              </p>
            </div>
          </div>

          {/* Kółeczka w prawym dolnym rogu */}
          <div className="absolute bottom-[-20px] left-5 flex space-x-4 z-20">
            <div className="w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center">
              <IoArrowBackOutline className="text-primary text-3xl font-bold" />
            </div>
          </div>
          <div className="absolute bottom-[-20px] right-5 flex space-x-4 z-20">
            <div className="w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center">
              <IoShareOutline className="text-primary text-3xl" />
            </div>

            <div className="w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center">
              <IoHeartOutline className="text-primary text-3xl" />
            </div>
          </div>
        </div>
        <div className="hidden md:block z-10 pl-16 w-2/3">
          <h1 className="hidden md:block text-primary text-8xl">{title}</h1>
          <p className="hidden md:block text-customGray font-semibold text-2xl pt-2">
            {formatDateWithComma(publishedAt)} <span className="text-customGray">•</span>{' '}
            Categories
          </p>
        </div>
      </div>
    </Gutter>
  )
}
