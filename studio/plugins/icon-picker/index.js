/**
 * CUSTOM SANITY STUDIO INPUT COMPONENT FOR FONT-AWESOME
 *
 * This is a proof of concept custom input component that loads the whole free library of font awesome icons and makes them
 * searchable in a downshift component. If they're selected the font name will be saved as a string on the document.
 *
 * Install dependencies in your studio folder with:
 * yarn add @fortawesome/fontawesome-svg-core @fortawesome/react-fontawesome @fortawesome/free-solid-svg-icons downshift
 *
 * Use as a custom input component in your shcema:
 *
 * import IconPicker from '../path/to/InputPicker.js'
 *
 * {
 *   name: 'icon',
 *   type: 'string',
 *   title: 'Icon',
 *   description: 'Choose icon for this service',
 *   inputComponent: IconPicker
 * }
 */

import React from 'react'
import {library} from '@fortawesome/fontawesome-svg-core'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import * as Icons from '@fortawesome/free-solid-svg-icons'

import Downshift from 'downshift'
import PatchEvent, {set, unset} from 'part:@sanity/form-builder/patch-event'
import FormField from 'part:@sanity/components/formfields/default'

const createPatchFrom = value => console.log(value) || PatchEvent.from(value === '' ? unset() : set(value))

const iconList = Object
  .keys(Icons)
  .filter(key => key !== 'fas' && key !== 'prefix')

const icons = iconList.map(icon => Icons[icon])

library.add(...icons)

const IconPicker = props => {
  const {type, value, onChange} = props

  return <div>
    <FormField label={type.title} description={type.description}>
      <Downshift
        itemToString={item => (item ? item.value : '')}
        onChange={selection => onChange(createPatchFrom(selection.value))}
        initialSelectedItem={{value}}
      >{({
          getInputProps,
          getItemProps,
          getLabelProps,
          getMenuProps,
          isOpen,
          inputValue,
          highlightedIndex,
          selectedItem
        }) => (<div>
          <label {...getLabelProps()}>Search for an icon: </label>
          <input {...getInputProps()} />
          <ul {...getMenuProps()}>
            {isOpen
              ? Object.values(Icons)
                .map(({iconName}) => iconName)
                .filter(Boolean)
                .map(icon => ({value: icon}))
                .filter(item => !inputValue || item.value.includes(inputValue))
                .map((item, index) => (
                  <li
                    {...getItemProps({
                      key: item.value,
                      index,
                      item,
                      style: {
                        backgroundColor:
                        highlightedIndex === index ? 'lightgray' : 'white',
                        fontWeight: selectedItem === item ? 'bold' : 'normal'
                      }
                    })}
                  >
                    <span><FontAwesomeIcon icon={item.value} />{' '}{item.value}</span>
                  </li>
                ))
              : null}
          </ul>
        </div>)}</Downshift>{value && <span>Selected icon: <FontAwesomeIcon icon={value} /></span>}
    </FormField>
  </div>
}

export default IconPicker
