import React from 'react'
import PropTypes from 'prop-types'
import { Table } from 'antd'

import styles from './index.css'

export default function PropsDoc({ data }) {
  return (
    <div>
      <h3>Props</h3>
      <Table
        className={styles.docTable}
        scroll={{ x: true }}
        columns={[
          {
            title: 'Prop',
            dataIndex: 'prop',
            key: 'prop',
            width: 150
          },
          {
            title: 'Type',
            dataIndex: 'type',
            key: 'type',
            width: 170
          },
          {
            title: 'Description',
            dataIndex: 'description',
            key: 'description',
            render: txt => txt
          }
        ]}
        dataSource={data}
        pagination={false}
        rowKey="prop"
      />
    </div>
  )
}

PropsDoc.propTypes = {
  data: PropTypes.array
}
