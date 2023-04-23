/* eslint-disable react/prop-types */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-redeclare */
import Select from 'react-select'

const SelectType: React.FC<{ width: any, options: any, onChange: any }> = (props) => {
  const colourStyles = {
    menuList: (styles: any) => ({
      ...styles,
      background: '#333333',
      color: '#FFF'
    }),
    option: (styles: any) => ({
      ...styles,
      backgroundColor: '#333333',
      zIndex: 1
    }),
    menu: (base: any) => ({
      ...base,
      marginLeft: '0',
      width: props.width,
      zIndex: 100
    }),
    control: (styles: any) => ({
      ...styles,
      width: props.width,
      backgroundColor: '#333333',
      border: 'none',
      borderRadius: '4px',
      boxShadow: 'none',
      margin: '7px 0 17px 0'
    }),
    singleValue: (styles: any) => ({
      ...styles,
      color: '#FFF'
    })
  }

  return (
    <>
      <Select
        isSearchable={true}
        onChange={(e: any) => {
          props.onChange(e.value)
        }}
        options={props.options}
        styles={colourStyles}
        placeholder={'Selecione...'}
      />
    </>
  )
}

export default SelectType
