import Router from '@/main/routes/router'
import '@/presentation/styles/global.scss'

import ReactDOMClient from 'react-dom/client'

const rootElement = document.getElementById('main') as Element

const root = ReactDOMClient.createRoot(rootElement)

root.render(<Router />)
