/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-redeclare */
import Select from 'react-select'

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

const SelectType = () => {
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
      <Select options={options} styles={colourStyles} placeholder={'Selecione...'} />
    </>
  )
}

export default SelectType
