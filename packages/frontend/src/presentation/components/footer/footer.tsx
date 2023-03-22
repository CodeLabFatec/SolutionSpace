import Styles from './footer-styles.scss'

import React from 'react'

const Footer: React.FC = () => {
  return (
    <div className={Styles.footer}>
      <hr />
      <p>Desenvolvido por CodeLab - 2023</p>
    </div>
  )
}

export default Footer
