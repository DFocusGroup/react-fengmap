import React from 'react'
import PropTypes from 'prop-types'
import { Table } from 'antd'

export default function PropsDoc({ data }) {
  return (
    <div>
      <h3>Props</h3>
      <Table
        columns={[
          {
            title: 'Prop',
            dataIndex: 'prop',
            key: 'prop',
            width: 130
          },
          {
            title: 'Type',
            dataIndex: 'type',
            key: 'type',
            width: 90
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
      />
    </div>
  )
}

PropsDoc.propTypes = {
  data: PropTypes.array
}
