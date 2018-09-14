import 'core-js/es6/symbol'
import 'core-js/es6/set'
import 'core-js/es6/map'
import 'core-js/es6/promise'
import 'core-js/es6/array'
import 'core-js/es6/string'
import 'core-js/es7/array'
import 'core-js/es7/string'
import React from 'react'
import ReactDOM from 'react-dom'

import { destoryGlobalSpinner } from './helpers/view'

import Document from './Document'

ReactDOM.render(<Document />, document.getElementById('root'))

destoryGlobalSpinner()
