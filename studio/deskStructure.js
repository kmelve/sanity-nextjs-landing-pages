import React from 'react'
import S from '@sanity/desk-tool/structure-builder'
import {MdDashboard, MdSettings} from 'react-icons/lib/md'
import IrlPreview from './previews/irl-previews/IrlPreview'
import NewyorkBanner from './previews/irl-previews/NewyorkBanner'
import OsakaBanner from './previews/irl-previews/OsakaBanner'
import BusinessCard from './previews/pdf/BusinessCard'
import SEO from './previews/seo/SeoPreviews'

const newyorkStyles = {
  transform:
    'scale(1.16485, 1.16485) matrix3d(0.827658, 0.201854, 0, 0.000572104, -0.0151594, 0.713259, 0, -0.000307195, 0, 0, 1, 0, -8.84197, -23.6928, 0, 1)',
  top: '126px',
  left: '179px',
  width: '306px',
  height: '206px'
}

const osakaStyles = {
  'transform': 'rotate(0deg) scale(1, 1) matrix3d(0.307621, 0.0458806, 0, 0.000449804, 0.0088296, 0.999547, 0, -0.000267565, 0, 0, 1, 0, 16.3371, -13.7042, 0, 1)',
  'top': '39px',
  'left': '59px',
  'width': '391px',
  'height': '263px'
}

const OSAKA = ({displayedDocument}) => (
  (
    <IrlPreview
      initialStyles={osakaStyles}
      backgroundImage='/static/osaka.png'
    >
      <OsakaBanner image={displayedDocument.illustration} tagline={displayedDocument.heading} />
    </IrlPreview>)
)

const NY = ({displayedDocument}) => (
  <IrlPreview
    initialStyles={newyorkStyles}
    backgroundImage='/static/newyork.png'
  >
    <NewyorkBanner image={displayedDocument.illustration} tagline={displayedDocument.heading} />
  </IrlPreview>)
// We filter document types defined in structure to prevent
// them from being listed twice
const hiddenDocTypes = listItem =>
  !['page', 'route', 'site-config', 'ad', 'person'].includes(listItem.getId())

export default () =>
  S.list()
    .title('Site')
    .items([
      S.listItem()
        .title('Site config')
        .icon(MdSettings)
        .child(
          S.editor()
            .id('config')
            .schemaType('site-config')
            .documentId('global-config')
        ),
      S.listItem()
        .title('Pages')
        .icon(MdDashboard)
        .schemaType('page')
        .child(S.documentTypeList('page').title('Pages')),
      S.listItem()
        .title('Routes')
        .schemaType('route')
        .child(
          S.documentTypeList('route').title('Routes')
            .child(documentId =>
              S.document()
                .documentId(documentId)
                .schemaType('route')
                .views([
                  S.view.form(),
                  S.view.component(SEO).title('SEO')
                ])
            )
        ),
      S.listItem()
        .title('People')
        .schemaType('person')
        .child(
          S.documentTypeList('person')
            .title('People')
            .child(documentId =>
              S.document()
                .documentId(documentId)
                .schemaType('person')
                .views([S.view.form(), S.view.component(BusinessCard)])
            )
        ),
      S.listItem()
        .title('Ads')
        .schemaType('ad')
        .child(
          S.documentTypeList('ad')
            .title('Ads')
            .child(documentId =>
              S.document()
                .documentId(documentId)
                .schemaType('ad')
                .views([
                  S.view.form(),
                  S.view.component(NY).title('New York'),
                  S.view.component(OSAKA).title('Osaka')
                ])
            )
        ),
      ...S.documentTypeListItems().filter(hiddenDocTypes)
    ])
