/* eslint-disable react/prop-types */
/* eslint-disable @typescript-eslint/no-unused-vars */
import styled, { css } from 'styled-components'
import Styles from './teste.scss'

type IObjectKeys = Record<string, string>

interface IMessageColors extends IObjectKeys {
  default: string
  error: string
  success: string
}

const dragActive = css`
  border-color: #78e5d5;
`

const dragReject = css`
  border-color: #e57878;
`

export const DropContainer = styled.div.attrs({
  className: 'dropzone'
})`
  border-radius: 4px;
  cursor: pointer;
  font-size: 17px;

  transition: height 0.2s ease;

  ${(props: any) => props.isDragActive && dragActive};
  ${(props: any) => props.isDragReject && dragReject};
`

const messageColors: IMessageColors = {
  default: '#999',
  error: '#e57878',
  success: '#78e5d5'
}

export const UploadMessage = styled.p`
  display: flex;
  color: ${(props: any) => messageColors[props.type || 'default']};
  justify-content: center;
  align-items: center;
  padding: 15px 0;
`

const UploadMessage2: React.FC<{ texto: string; success: boolean }> = (props) => {
  return (
    <>
      {props.success ? (
        <p className={Styles.estiloSuccess}>{props.texto}</p>
      ) : (
        <p className={Styles.estiloError}>{props.texto}</p>
      )}
    </>
  )
}

export default UploadMessage2
