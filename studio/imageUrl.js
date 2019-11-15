import imageUrlBuilder from '@sanity/image-url'
import sanityClient from 'part:@sanity/base/client'

const builder = imageUrlBuilder(sanityClient)

const urlFor = source => {
  return builder.image(source)
}

export default urlFor
