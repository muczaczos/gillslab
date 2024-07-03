import React from 'react'
import { draftMode } from 'next/headers'
import Image from 'next/image'
import Link from 'next/link'

import { Page, Post } from '../../../payload/payload-types'
import { fetchDoc } from '../../_api/fetchDoc'
import { fetchDocs } from '../../_api/fetchDocs'
import { Gutter } from '../../_components/Gutter'
import { HR } from '../../_components/HR'
import PostsCards from './PostsCards'

import classes from './index.module.scss'

const Posts = async () => {
  const { isEnabled: isDraftMode } = draftMode()
  let page: Page | null = null //Page for layout
  let posts: Post[] | null = null

  let pages = []
  try {
    //fetch page and categories
    //1 fetch page with slug 'posts'
    page = await fetchDoc<Page>({
      collection: 'pages',
      slug: 'posts',
      draft: isDraftMode,
      /*drafts allow you to build on top of versions functionality
        to make changes to your collection, documents and globals but
        publish only when you're ready. It allows you to check out
        how something is currently working. 
      */
    })
    posts = await fetchDocs<Post>('posts')

    for (let i = 0; i < posts.length; i++) {
      pages[i] = await fetchDoc<Page>({
        collection: 'posts',
        slug: posts[i].slug,
        draft: isDraftMode,
      })
    }
  } catch (error) {}

  return (
    <Gutter>
      <div className={classes.imageTitle}>
        <Image alt="Planet of mushrooms" src="/media/earth-1.jpg" height="500" width="500" />
        <h2 className={classes.title}>Nice to see you on our blog... 🙋‍♂️</h2>
      </div>
      <p className={classes.heroText}>
        You can find here many informations about mushrooms and their cultivating. Master the art of
        mushrooms cultivation for a bountiful harvest. 🍄 Change your planet to
        planet-of-mushrooms.com 🌎
      </p>
      <div className={classes.gap}></div>
      <PostsCards posts={posts} pages={pages} />
      <HR />
    </Gutter>
  )
}

export default Posts
