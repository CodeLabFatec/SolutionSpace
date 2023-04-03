/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import React, { useEffect } from 'react'
import { Container, Content } from './dropzone-styles'
import { uniqueId } from 'lodash'
import Upload from './upload/upload'
import FileList from './file-list/file-list'
import GlobalStyle from './dropzone-global-styles'
import { filesize } from 'filesize'
const DropZone: React.FC<{ uploadedFiles: any[]; setUploadedFiles: any }> = (props) => {
  useEffect(() => {}, [props])

  const handleDelete = async (id: any) => {
    props.setUploadedFiles(props.uploadedFiles.filter((file: any) => file.id !== id))
  }

  const handleUpload = async (files: any[]) => {
    const filesUpload: any[] = files.map((file) => ({
      file,
      id: uniqueId(),
      name: file.name,
      readableSize: filesize(file.size),
      preview: URL.createObjectURL(file),
      progress: 0,
      uploaded: false,
      error: false,
      type: null,
      base64: null,
      url: null
    }))

    const newArray = [...props.uploadedFiles]
    await processUpload(filesUpload)
    filesUpload.forEach((item) => newArray.push(item))
    props.setUploadedFiles(newArray)
  }

  const processUpload = async (files: any[]) => {
    for (let i = 0; i < files.length; i++) {
      const file = files[i]
      const base64File = await getBase64(file.file)
      file.url = base64File
      file.preview = base64File
      file.uploaded = true
      file.progress = 100
      file.base64 = base64File?.split(';')[1].replace('base64,', '')
      file.type = base64File?.split(';')[0].split(':')[1]
    }
  }

  const getBase64 = async (file: Blob): Promise<string | undefined> => {
    const reader = new FileReader()
    reader.readAsDataURL(file)

    return await new Promise((resolve, reject) => {
      reader.onload = () => {
        resolve(reader.result as any)
      }
      reader.onerror = (error) => {
        reject(error)
      }
    })
  }

  return (
    <Container>
      <Content>
        <Upload onUpload={handleUpload} />
        {!!props.uploadedFiles.length && <FileList files={props.uploadedFiles} onDelete={handleDelete} />}
      </Content>
      <GlobalStyle />
    </Container>
  )
}

export default DropZone
