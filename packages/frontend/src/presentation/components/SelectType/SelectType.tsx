/* eslint-disable react/prop-types */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-redeclare */
import Select from 'react-select'

const options = [
  { value: 'Desenvolvimento', label: 'Desenvolvimento' },
  { value: 'PO', label: 'PO' },
  { value: 'Q&A', label: 'Q&A' }
]

const SelectType: React.FC<{ onChange: any }> = (props) => {
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
      marginLeft: '25px',
      width: '685px',
      zIndex: 100
    }),
    control: (styles: any) => ({
      ...styles,
      width: '685px',
      backgroundColor: '#333333',
      border: 'none',
      borderRadius: '4px',
      boxShadow: 'none',
      margin: '10px 0 55px 25px'
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
        options={options}
        styles={colourStyles}
        placeholder={'Selecione...'}
      />
    </>
  )
}

export default SelectType
