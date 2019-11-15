/* eslint-disable react/no-unused-prop-types, react/no-multi-comp, react/no-did-mount-set-state, react/forbid-prop-types */
import React from 'react'
import PropTypes from 'prop-types'
import Spinner from 'part:@sanity/components/loading/spinner'
import sanityClient from 'part:@sanity/base/client'
import imageUrlBuilder from '@sanity/image-url'
import getIt from 'get-it'
import promise from 'get-it/lib/middleware/promise'
import styles from './BusinessCard.css'

const fileType = 'png'
const cardServiceHost = 'https://json-to-pdf.sanity-io.now.sh' // 'http://localhost:3000'
const cardServiceBaseUrl = `${cardServiceHost}/api/business-card`
const request = getIt([promise()])

const builder = imageUrlBuilder(sanityClient)

const urlFor = source => {
  return builder.image(source)
}

let memoizedDocument = null

const arrayBufferToBase64 = arrbuf => {
  return btoa(
    new Uint8Array(arrbuf).reduce(
      (data, byte) => data + String.fromCharCode(byte),
      ''
    )
  )
}

class BusinessCard extends React.PureComponent {
  static propTypes = {
    displayedDocument: PropTypes.object
  }

  static defaultProps = {
    displayedDocument: null
  }

  static getDerivedStateFromProps (nextProps, prevState) {
    const nextDoc = JSON.stringify(nextProps.displayedDocument)
    if (memoizedDocument !== nextDoc) {
      memoizedDocument = nextDoc
      return {
        refetchData: true
      }
    }
    return null
  }

  state = {
    businessCardImage: null,
    cardServiceUrls: null,
    refetchData: true,
    isFlipped: false,
    error: null
  }

  componentDidMount () {
    const {displayedDocument} = this.props
    const document = displayedDocument
    memoizedDocument = JSON.stringify(document)
    this.fetchData()
  }

  componentDidUpdate (prevProps, prevState) {
    if (this.state.refetchData) {
      this.fetchData()
    }
  }

  assembleCardServiceUrls = () => {
    const {displayedDocument} = this.props
    const document = displayedDocument
    if (!displayedDocument || !displayedDocument.name || !displayedDocument.contactInfo) {
      return
    }
    return sanityClient
      .fetch('*[_id == "global-config"][0]')
      .then(siteConfig => {
        if (siteConfig.logo) {
          const siteLogoImageUrl = urlFor(siteConfig.logo)
            .width(500)
            .url()
          document.imageUrl = siteLogoImageUrl
        }
        const stringifiedDoc = JSON.stringify(document)
        return {
          png: `${cardServiceBaseUrl}?fileType=png&document=${stringifiedDoc}`,
          pdf: `${cardServiceBaseUrl}?fileType=pdf&document=${stringifiedDoc}`
        }
      })
  }

  fetchData = async () => {
    const cardServiceUrls = await this.assembleCardServiceUrls()
    request({url: cardServiceUrls.png, rawBody: true})
      .then(response => {
        const base64 = arrayBufferToBase64(response.body)
        this.setState({
          businessCardImage: `data:image/${fileType};base64,${base64}`,
          refetchData: false,
          cardServiceUrls
        })
      })
      .catch(error => {
        this.setState({error})
      })
  }

  handleCardFlip = () => {
    const flipped = this.state.isFlipped
    this.setState({
      isFlipped: !flipped
    })
  }

  render () {
    const {displayedDocument} = this.props
    const {businessCardImage, cardServiceUrls, isFlipped, error} = this.state
    const {name = 'Missing name'} = displayedDocument

    if (error) {
      return (
        <div>
          <p>Ooops. Got an error while fetching preview :/</p>
          <pre>{JSON.stringify(error, null, 2)}</pre>
        </div>
      )
    }
    if (!businessCardImage) {
      return <Spinner message='Fetching business card' />
    }

    return (
      <div className={styles.root}>
        <h3>{`Business card for: ${name}`}</h3>
        {name && (
          <div className={styles.cardScene} onClick={this.handleCardFlip}>
            <div
              className={`${styles.card} ${isFlipped ? styles.isFlipped : ''}`}
            >
              <div className={styles.cardFace}>
                <img src={businessCardImage} />
              </div>
              <div className={`${styles.cardFace} ${styles.cardBack}`} />
            </div>
          </div>
        )}
        <div className={styles.downloadLink}>
          <a href={cardServiceUrls.pdf}>Download PDF</a>
        </div>
      </div>
    )
  }
}

export default BusinessCard
