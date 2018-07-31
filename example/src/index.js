import React from 'react'
import ReactDOM from 'react-dom'

import { destoryGlobalSpinner } from './helpers/view'

import Document from './Document'

ReactDOM.render(<Document />, document.getElementById('root'))

destoryGlobalSpinner()
