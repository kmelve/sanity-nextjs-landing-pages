import React from 'react'
import PropTypes from 'prop-types'
import styles from './OsakaBanner.css'
import client from 'part:@sanity/base/client'
import urlBuilder from '../../imageUrl'

const urlFor = source => urlBuilder(client.config()).source(source)
class OsakaBanner extends React.PureComponent {
  static propTypes = {
    tagline: PropTypes.string
  }

  static defaultProps = {
    tagline: ''
  }

  render () {
    const {tagline, image} = this.props
    return (
      <div className={styles.banner}>
        <div className={styles.imageWrapper}>
          <img className={styles.bannerImage} src={urlBuilder(image).width(600).height(400).url()} />
        </div>
        <div className={styles.taglineWrapper}>
          <span className={styles.tagline}>{tagline}</span>
        </div>
      </div>
    )
  }
}

export default OsakaBanner
