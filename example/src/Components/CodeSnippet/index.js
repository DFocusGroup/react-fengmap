import React from 'react'
import PropTypes from 'prop-types'

import styles from './index.less'

function CodeSnippet({ children }) {
  return <code className={styles.codeRef}>{children}</code>
}

CodeSnippet.propTypes = {
  children: PropTypes.any
}

export default CodeSnippet
