/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react'
import Dropzone from 'react-dropzone'
import UploadMessage2, { DropContainer, UploadMessage } from './upload-styles'

const Upload: React.FC<{ onUpload: any }> = (props) => {
  const renderDragMessage = (isDragActive: boolean, isDragReject: boolean) => {
    if (!isDragActive) {
      return <UploadMessage2 success={true} texto='Arraste arquivos aqui...'></UploadMessage2>
    }
    if (isDragReject) {
      return <UploadMessage2 success={false} texto='Arquivo não suportado'></UploadMessage2>
    }
    return <UploadMessage2 success={true} texto='Solte os arquivos aqui'></UploadMessage2>
  }

  return (
    <Dropzone
      accept={{ 'image/*': ['.jpeg', '.png'], 'video/*': ['.mp4', '.MP4', '.mkv'], 'audio/*': ['.mp3'] }}
      onDropAccepted={props.onUpload}
    >
      {({ getRootProps, getInputProps, isDragActive, isDragReject }) => (
        <DropContainer {...getRootProps()} isDragActive={isDragActive} isDragReject={isDragReject}>
          <input {...getInputProps()} />
          {renderDragMessage(isDragActive, isDragReject)}
        </DropContainer>
      )}
    </Dropzone>
  )
}

export default Upload
