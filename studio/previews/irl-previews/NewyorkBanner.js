import React from 'react'
import PropTypes from 'prop-types'
import Moveable from 'react-moveable'
import RadioButtons from 'part:@sanity/components/selects/radio'
import styles from './NewyorkBanner.css'
import client from 'part:@sanity/base/client'
import urlBuilder from '../../imageUrl'

const urlFor = source => urlBuilder(client.config()).source(source)
class NewyorkBanner extends React.PureComponent {
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
          <img className={styles.bannerImage} src={image ? urlBuilder(image).url() : '/static/example1.png'} />
        </div>
        <div className={styles.taglineWrapper}>
          <span className={styles.tagline}>{tagline}</span>
        </div>
      </div>
    )
  }
}

export default NewyorkBanner
