import React from 'react'
import ReactDOM from 'react-dom'

import { destoryGlobalSpinner } from './helpers/view'

import Document from './Document'

require('es6-shim')

ReactDOM.render(<Document />, document.getElementById('root'))

destoryGlobalSpinner()
