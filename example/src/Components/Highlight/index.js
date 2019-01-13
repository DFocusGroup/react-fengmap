import React from 'react'
import PropTypes from 'prop-types'

import { default as SyntaxHighlighter } from 'react-syntax-highlighter/dist/esm/prism'
import { darcula } from 'react-syntax-highlighter/dist/styles/prism'

export default class Highlight extends React.Component {
  static propTypes = {
    language: PropTypes.string.isRequired,
    children: PropTypes.string
  }

  render() {
    const { language, children } = this.props
    return (
      <SyntaxHighlighter language={language} style={darcula}>
        {children}
      </SyntaxHighlighter>
    )
  }
}
