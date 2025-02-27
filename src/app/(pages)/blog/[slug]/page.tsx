import React from 'react'
import { draftMode } from 'next/headers'
import { notFound } from 'next/navigation'

import { Post } from '../../../../payload/payload-types'
import { fetchComments } from '../../../_api/fetchComments'
import { fetchDoc } from '../../../_api/fetchDoc'
import { Blocks } from '../../../_components/Blocks'
import { PremiumContent } from '../../../_components/PremiumContent'
import { PostHero } from '../../../_heros/PostHero'

// Force this page to be dynamic so that Next.js does not cache it
// See the note in '../../../[slug]/page.tsx' about this
export const dynamic = 'force-dynamic'

export default async function Posts({ params: { slug } }) {
  const { isEnabled: isDraftMode } = draftMode()

  let post: Post | null = null

  try {
    post = await fetchDoc<Post>({
      collection: 'posts',
      slug,
      draft: isDraftMode,
    })
  } catch (error) {}

  if (!post) {
    notFound()
  }

  const comments = await fetchComments({
    doc: post?.id,
  })

  const { layout, relatedPosts, enablePremiumContent } = post

  return (
    <React.Fragment>
      <PostHero post={post} />
      <Blocks blocks={layout} />
      {enablePremiumContent && <PremiumContent postSlug={slug as string} disableTopPadding />}
      <Blocks
        disableTopPadding
        blocks={[
          {
            blockType: 'comments',
            blockName: 'Comments',
            relationTo: 'posts',
            introContent: [
              {
                type: 'h4',
                children: [
                  {
                    text: 'Comments',
                  },
                ],
              },
              {
                type: 'p',
                children: [
                  {
                    text: 'Authenticated users can leave comments on this post ',
                  },
                  {
                    type: 'link',
                    url: '/admin/collections/comments',
                    children: [
                      {
                        text: '',
                      },
                    ],
                  },
                  {
                    text: '.',
                  },
                ],
              },
            ],
            doc: post,
            comments,
          },
          {
            blockType: 'relatedPosts',
            blockName: 'Related Posts',
            relationTo: 'posts',
            introContent: [
              {
                type: 'h4',
                children: [
                  {
                    text: 'Related posts',
                  },
                ],
              },
              {
                type: 'p',
                children: [
                  {
                    text: '',
                  },
                  {
                    type: 'link',
                    url: `/admin/collections/posts/${post.id}`,
                    children: [
                      {
                        text: '',
                      },
                    ],
                  },
                  {
                    text: '',
                  },
                ],
              },
            ],
            docs: relatedPosts,
          },
        ]}
      />
    </React.Fragment>
  )
}
