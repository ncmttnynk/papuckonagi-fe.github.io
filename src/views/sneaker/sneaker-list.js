import React, { useState, useEffect } from 'react'
import {
  Table,
  Input,
  Popconfirm,
  Form,
  Button,
  Tooltip,
  Space,
  Checkbox,
  PageHeader,
  Tag,
  Row,
  Col,
  notification,
  Card,
  Statistic,
  Select
} from 'antd'
import {
  SearchOutlined,
  MinusCircleOutlined,
  SaveOutlined,
  DeleteOutlined
} from '@ant-design/icons'

import { getBrandList } from './../../services/brand-service'
import {
  deleteSneaker,
  updateSneaker,
  getSneakerList
} from './../../services/sneaker-service'

import * as moment from 'moment'

const { Option } = Select

const EditableCell = ({
  editing,
  dataIndex,
  title,
  inputType,
  record,
  index,
  children,
  brandListData,
  ...restProps
}) => {
  var inputNode = ''
  switch (inputType) {
    case 'checkbox':
      inputNode = (
        <Form.Item
          name={dataIndex}
          valuePropName="checked"
          style={{
            margin: 0
          }}
          rules={[
            {
              required: true,
              message: `Please Input ${title}!`
            }
          ]}
        >
          <Checkbox />
        </Form.Item>
      )
      break
    case 'input':
      inputNode = (
        <Form.Item
          name={dataIndex}
          style={{
            margin: 0
          }}
          rules={[
            {
              required: true,
              message: `Please Input ${title}!`
            }
          ]}
        >
          <Input />
        </Form.Item>
      )
      break
    case 'select':
      inputNode = (
        <Form.Item
          name={dataIndex}
          style={{
            margin: 0
          }}
          rules={[
            {
              required: true,
              message: `Please Input ${title}!`
            }
          ]}
        >
          <Select placeholder="Select a brand" allowClear>
            {brandListData.map((item) => {
              return (
                <Option key={item.ID} value={item.ID}>
                  {item.TITLE}
                </Option>
              )
            })}
          </Select>
        </Form.Item>
      )
      break
    default:
      break
  }
  return <td {...restProps}>{editing ? inputNode : children}</td>
}

const SneakerList = () => {
  const [form] = Form.useForm()
  const [data, setData] = useState([])
  const [brandListData, setBrandListData] = useState([])
  const [editingKey, setEditingKey] = useState('')
  const [loading, setLoading] = useState(false)

  const gridStyle = {
    width: '100%'
  }

  const isEditing = (record) => record.ID === editingKey

  const edit = (record) => {
    form.setFieldsValue({ ...record })
    setEditingKey(record.ID)
  }

  const cancel = () => {
    setEditingKey('')
  }

  const getList = async () => {
    setLoading(true)
    const { data } = await getSneakerList()
    if (data.isSuccess) {
      notification.success({
        message: 'Success',
        description: 'Sneaker list get successfully!',
        placement: 'topLeft'
      })
      setData(data.result)
      setLoading(false)
    } else {
      notification.warning({
        message: 'Error',
        description: `${data.error}!`,
        placement: 'topLeft'
      })
    }
  }

  const getBrand = async () => {
    const { data } = await getBrandList()
    if (data.isSuccess) {
      setBrandListData(data.result)
    } else {
      notification.warning({
        message: 'Error',
        description: `${data.error}!`,
        placement: 'topLeft'
      })
    }
  }

  useEffect(() => {
    getList()
    getBrand()
  }, [])

  const deleteData = async (key) => {
    setLoading(true)
    const { data } = await deleteSneaker(key, 'ncmttnynk')
    if (data.isSuccess) {
      notification.success({
        message: 'Success',
        description: 'Sneaker deleted succesfully!',
        placement: 'topLeft'
      })
      getList()
    } else {
      notification.warning({
        message: 'Error',
        description: `${data.error}!`,
        placement: 'topLeft'
      })
    }
    setLoading(false)
  }

  const save = async (key) => {
    setLoading(true)
    const row = await form.validateFields()

    const selectedBrand = brandListData.filter(
      (item) =>
        item.TITLE === row['BRAND.TITLE'] || item.ID === row['BRAND.TITLE']
    )[0]

    const putData = {
      ID: key.ID,
      TITLE: row.TITLE,
      COLOR: row.COLOR,
      BRAND_ID: selectedBrand.ID,
      MODIFIED_BY: row.MODIFIED_BY,
      IS_DELETED: row.IS_DELETED
    }
    const { data } = await updateSneaker(putData)
    if (data.isSuccess) {
      notification.success({
        message: 'Success',
        description: `${row.TITLE} updated successfully!`,
        placement: 'topLeft'
      })
      getList()
    } else {
      notification.warning({
        message: 'Error',
        description: `${data.error}!`,
        placement: 'topLeft'
      })
    }
    setLoading(false)
    setEditingKey('')
  }
  const columns = [
    {
      title: 'ID',
      dataIndex: 'ID',
      editable: false,
      key: 'ID',
      sorter: (a, b) => a.ID - b.ID,
      width: '5%',
      align: 'center'
    },
    {
      title: 'TITLE',
      dataIndex: 'TITLE',
      editable: true,
      key: 'TITLE',
      align: 'center'
    },
    {
      title: 'COLOR',
      dataIndex: 'COLOR',
      editable: true,
      key: 'COLOR',
      align: 'center'
    },
    {
      title: 'BRAND',
      dataIndex: 'BRAND.TITLE',
      editable: true,
      key: 'BRAND',
      align: 'center'
    },
    {
      title: 'CREATED BY',
      dataIndex: 'CREATED_BY',
      editable: false,
      key: 'CREATED_BY',
      align: 'center'
    },
    {
      title: 'CREATED DATE',
      dataIndex: 'CREATED_DATE',
      render: (_, record) => {
        return (
          <Tag color="blue">
            {moment(new Date(record.CREATED_DATE)).format('DD.MM.YYYY')}
          </Tag>
        )
      },
      key: 'CREATED_DATE',
      align: 'center'
    },
    {
      title: 'MODIFIED BY',
      dataIndex: 'MODIFIED_BY',
      editable: true,
      key: 'MODIFIED_BY',
      align: 'center'
    },
    {
      title: 'MODIFIED DATE',
      dataIndex: 'MODIFIED_DATE',
      render: (_, record) => {
        return (
          <span>
            {record.MODIFIED_DATE
              ? moment(new Date(record.MODIFIED_DATE)).format('DD.MM.YYYY')
              : ''}
          </span>
        )
      },
      key: 'MODIFIED_DATE',
      align: 'center'
    },
    {
      title: 'IS DELETED',
      dataIndex: 'IS_DELETED',
      editable: true,
      render: (_, record) => {
        return <Checkbox checked={record.IS_DELETED} />
      },
      key: 'IS_DELETED',
      align: 'center'
    },
    {
      title: 'ACTION',
      dataIndex: 'operation',
      key: 'ACTION',
      render: (_, record) => {
        const editable = isEditing(record)
        return editable ? (
          <div key={Math.random()}>
            <Tooltip title="Save">
              <Button
                onClick={() => save(record)}
                style={{
                  marginRight: 8
                }}
                key={Math.random()}
                type="primary"
                shape="circle"
                icon={<SaveOutlined />}
              />
            </Tooltip>
            <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
              <Tooltip title="Cancel">
                <Button
                  key={Math.random()}
                  type="primary"
                  shape="circle"
                  icon={<MinusCircleOutlined />}
                />
              </Tooltip>
            </Popconfirm>
          </div>
        ) : (
          <Space size="middle">
            <Tooltip title="Edit">
              <Button
                key={Math.random()}
                type="primary"
                shape="circle"
                icon={<SearchOutlined />}
                disabled={editingKey !== ''}
                onClick={() => edit(record)}
              />
            </Tooltip>
            <Popconfirm
              title="Sure to delete?"
              disabled={record.IS_DELETED}
              onConfirm={() => deleteData(record)}
            >
              <Tooltip title="Delete">
                <Button
                  key={Math.random()}
                  type="primary"
                  shape="circle"
                  disabled={editingKey !== '' || record.IS_DELETED}
                  icon={<DeleteOutlined />}
                />
              </Tooltip>
            </Popconfirm>
          </Space>
        )
      },
      align: 'center'
    }
  ]
  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col
    }

    return {
      ...col,
      onCell: (record) => ({
        record,
        inputType:
          col.dataIndex === 'IS_DELETED'
            ? 'checkbox'
            : col.dataIndex === 'BRAND.TITLE'
            ? 'select'
            : 'input',
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
        brandListData: brandListData
      })
    }
  })
  return (
    <div>
      <PageHeader
        title="SNEAKER"
        className="site-page-header"
        tags={<Tag color="blue">List</Tag>}
        avatar={{
          src:
            'https://instagram.fist7-2.fna.fbcdn.net/v/t51.2885-19/s150x150/84112379_337759313824930_4418112856008949760_n.jpg?_nc_ht=instagram.fist7-2.fna.fbcdn.net&_nc_ohc=Ea8vmIXefJAAX8V1w81&oh=b9655e8e250250178dccbb81f76ff011&oe=5EC40D8B'
        }}
      >
        <Row>
          <Statistic title="TOTAL" value={data.length} />
        </Row>
      </PageHeader>
      <Row>
        <Col span={24}>
          <Card title="Sneaker List" bordered={false}>
            <Card.Grid style={gridStyle}>
              <Form form={form} component={false}>
                <Table
                  components={{
                    body: {
                      cell: EditableCell
                    }
                  }}
                  rowKey="ID"
                  fixedHeader={false}
                  tableLayout="fixed"
                  dataSource={data}
                  loading={loading}
                  columns={mergedColumns}
                  rowClassName="editable-row"
                  pagination={{
                    onChange: cancel
                  }}
                  size="small"
                />
              </Form>
            </Card.Grid>
          </Card>
        </Col>
      </Row>
    </div>
  )
}

export default SneakerList
