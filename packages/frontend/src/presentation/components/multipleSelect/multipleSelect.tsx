/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-confusing-void-expression */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import React, { useState } from 'react'
import Select from 'react-select'
import makeAnimated from 'react-select/animated'

import Styles from './multipleSelect.scss'

const animatedComponents = makeAnimated()

const options = [
  { value: 'produto 01', label: 'Produto 01' },
  { value: 'produto 02', label: 'Produto 02' },
  { value: 'produto 03', label: 'Produto 03' },
  { value: 'produto 04', label: 'Produto 04' },
  { value: 'produto 05', label: 'Produto 05' },
  { value: 'produto 06', label: 'Produto 06' },
  { value: 'produto 07', label: 'Produto 07' },
  { value: 'produto 08', label: 'Produto 08' }
]

export const MultiSelect = () => {
  const [selectedOptions, setSelectedOptions] = useState([])

  const colourStyles = {
    menuList: (styles: any) => ({
      ...styles,
      background: '#333333',
      color: '#FFF'
    }),
    option: (styles: any, { isFocused, isSelected }: any) => ({
      ...styles,
      background: isFocused ? '#535252' : isSelected ? '#535252' : undefined,
      zIndex: 1
    }),
    menu: (base: any) => ({
      ...base,
      zIndex: 100
    }),
    control: (styles: any, state: { isFocused: any }) => ({
      ...styles,
      borderColor: state.isFocused ? '#535252' : 'none',
      backgroundColor: '#333333',
      border: 'none',
      borderRadius: '4px',
      color: '#FFF'
    }),
    multiValueLabel: (style: any) => ({
      ...style,
      backgroundColor: '#535252',
      color: '#FFF'
    }),
    multiValueRemove: (style: any) => ({
      ...style,
      backgroundColor: '#535252'
    })
  }
  return (
    <>
      <Select
        defaultValue={[]}
        components={animatedComponents}
        isMulti
        options={options}
        onChange={(item: any) => setSelectedOptions(item)}
        className={Styles.select}
        isClearable={true}
        isSearchable={true}
        isDisabled={false}
        isLoading={false}
        isRtl={false}
        closeMenuOnSelect={false}
        styles={colourStyles}
        placeholder='Selecione...'
      />
      {/* 
      <button onClick={handleSelect}>Imprimir itens</button> */}
    </>
  )
}
