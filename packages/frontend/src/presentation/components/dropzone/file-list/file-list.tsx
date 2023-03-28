import React from 'react'
import { CircularProgressbar } from 'react-circular-progressbar'
import { MdCheckCircle, MdError } from 'react-icons/md'
import { Container, FileInfo } from './file-list-styles'

const Preview: React.FC<{ preview: string }> = (props) => {
  const divStyle = {
    backgroundImage: 'url(' + props.preview + ')',
    width: '36px',
    height: '36px',
    borderRadius: '5px',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: '50% 50%',
    marginRight: '10px'
  }

  return <div style={divStyle}></div>
}

const FileList: React.FC<{ files: any[]; onDelete: any }> = (props) => {
  return (
    <Container>
      {props.files.map((uploadedFile) => (
        <li key={uploadedFile.id}>
          <FileInfo>
            <Preview preview={uploadedFile.preview} />
            <div>
              <strong>{uploadedFile.name}</strong>
              <span>
                {uploadedFile.readableSize}{' '}
                {!!uploadedFile.url && <button onClick={() => props.onDelete(uploadedFile.id)}>Excluir</button>}
              </span>
            </div>
          </FileInfo>

          <div>
            {!uploadedFile.uploaded && !uploadedFile.error && (
              <CircularProgressbar
                styles={{
                  root: { width: 24 },
                  path: { stroke: '#7159c1' }
                }}
                strokeWidth={10}
                value={uploadedFile.progress}
              />
            )}

            {uploadedFile.uploaded && <MdCheckCircle size={24} color='#78e5d5' />}
            {uploadedFile.error && <MdError size={24} color='#e57878' />}
          </div>
        </li>
      ))}
    </Container>
  )
}

export default FileList
