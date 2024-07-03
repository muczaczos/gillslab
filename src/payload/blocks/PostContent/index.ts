import type { Block } from 'payload/types'

const PostContent: Block = {
  slug: 'postContent',
  fields: [
    {
      name: 'postContent',
      type: 'richText',
    },
  ],
}
export default PostContent
