const defaultBehaviors = {nonTextBehavior: 'remove'}

export const websiteUrl = 'https://sanity-nextjs-landing-pages-web-psdhncy1.netlify.com/'

export function assemblePostUrl (doc) {
  return websiteUrl + doc.current
  /* const [year, month] = doc.publishedAt.split('T')[0].split('-')
  return `${websiteUrl}/blog/${year}/${month}/${doc.slug.current}` */
}

export function blocksToText (blocks, opts = {}) {
  if (typeof blocks !== 'array') {
    return blocks
  }
  const options = Object.assign({}, defaultBehaviors, opts)
  return blocks
    .map(block => {
      if (block._type !== 'block' || !block.children) {
        return options.nonTextBehavior === 'remove' ? '' : `[${block._type} block]`
      }

      return block.children.map(child => child.text).join('')
    })
    .join('\n\n')
}
