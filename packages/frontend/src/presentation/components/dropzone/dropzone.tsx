/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import React, { useState } from 'react'
import { Container, Content } from './dropzone-styles'
import { uniqueId } from 'lodash'
import Upload from './upload/upload'
import FileList from './file-list/file-list'
import GlobalStyle from './dropzone-global-styles'
import { filesize } from 'filesize'
const DropZone: React.FC = () => {
  const [uploadedFiles, setUploadedFiles] = useState<any[]>([])

  const handleDelete = async (id: any) => {
    setUploadedFiles(uploadedFiles.filter((file: any) => file.id !== id))
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
      url: null
    }))

    const newArray = [...uploadedFiles]
    await processUpload(filesUpload)
    filesUpload.forEach((item) => newArray.push(item))
    setUploadedFiles(newArray)
  }

  const processUpload = async (files: any[]) => {
    for (let i = 0; i < files.length; i++) {
      const file = files[i]
      const base64File = await getBase64(file.file)
      file.url = base64File
      file.preview = base64File
      file.uploaded = true
      file.progress = 100
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
        {!!uploadedFiles.length && <FileList files={uploadedFiles} onDelete={handleDelete} />}
      </Content>
      <GlobalStyle />
    </Container>
  )
}

export default DropZone
