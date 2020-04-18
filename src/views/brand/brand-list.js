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
  Card,
  Modal,
  Statistic,
  List,
  Avatar
} from 'antd'
import {
  SearchOutlined,
  MinusCircleOutlined,
  SaveOutlined,
  DeleteOutlined,
  PlusOutlined
} from '@ant-design/icons'

import {
  getBrandList,
  updateBrand,
  deleteBrand
} from './../../services/brand-service'
import { getSneakerByBrandId } from './../../services/sneaker-service'

import * as moment from 'moment'

const EditableCell = ({
  editing,
  dataIndex,
  title,
  inputType,
  record,
  index,
  children,
  ...restProps
}) => {
  const inputNode =
    inputType === 'checkbox' ? (
      <Checkbox checked={record.IS_DELETED ? true : false} />
    ) : (
      <Input />
    )
  return (
    <td {...restProps}>
      {editing ? (
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
          {inputNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  )
}

const BrandList = () => {
  const [form] = Form.useForm()
  const [data, setData] = useState([])
  const [editingKey, setEditingKey] = useState('')
  const [loading, setLoading] = useState(false)
  const [modalLoading, setModalLoading] = useState(false)
  const [modalVisible, setModalVisible] = useState(false)
  const [modalSneaker, setModalSneaker] = useState({})
  const [modalData, setModalData] = useState([])

  const showModal = async (key) => {
    const { data } = await getSneakerByBrandId(key.ID)
    setModalData(data.result)
    setModalSneaker(key)
    setModalVisible(true)
  }

  const handleOk = () => {
    setModalLoading(true)
    setTimeout(() => {
      setModalLoading(false)
      setModalVisible(false)
    }, 3000)
  }

  const handleCancel = () => {
    setModalVisible(false)
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
    const response = await getBrandList()
    setData(response.data.result)
    setLoading(false)
  }

  useEffect(() => {
    getList()
  }, [])

  const deleteData = async (key) => {
    setLoading(true)
    const response = await deleteBrand(key, 'ncmttnynk')
    if (response.data.isSuccess) {
      getList()
    }
    setLoading(false)
  }

  const gridStyle = {
    width: '100%'
  }

  const save = async (key) => {
    setLoading(true)

    const row = await form.validateFields()

    const putData = {
      ID: key,
      TITLE: row.TITLE,
      MODIFIED_BY: row.MODIFIED_BY,
      IS_DELETED: false
    }
    const response = await updateBrand(putData)
    if (response.data.isSuccess) {
      getList()
    }
    setEditingKey('')
  }
  const columns = [
    {
      title: 'ID',
      dataIndex: 'ID',
      editable: false,
      key: 'ID',
      defaultSortOrder: 'ascend',
      sorter: (a, b) => a.ID - b.ID
    },
    {
      title: 'TITLE',
      dataIndex: 'TITLE',
      editable: true,
      key: 'TITLE'
    },
    {
      title: 'CREATED BY',
      dataIndex: 'CREATED_BY',
      editable: false,
      key: 'CREATED_BY'
    },
    {
      title: 'CREATED DATE',
      dataIndex: 'CREATED_DATE',
      render: (_, record) => {
        return (
          <span>
            {moment(new Date(record.CREATED_DATE)).format(
              'DD.MM.YYYY, h:mm:ss'
            )}
          </span>
        )
      },
      key: 'CREATED_DATE'
    },
    {
      title: 'MODIFIED BY',
      dataIndex: 'MODIFIED_BY',
      editable: true,
      key: 'MODIFIED_BY'
    },
    {
      title: 'MODIFIED DATE',
      dataIndex: 'MODIFIED_DATE',
      render: (_, record) => {
        return (
          <span>
            {record.MODIFIED_DATE
              ? moment(new Date(record.MODIFIED_DATE)).format(
                  'DD.MM.YYYY, h:mm:ss'
                )
              : ''}
          </span>
        )
      },
      key: 'MODIFIED_DATE'
    },
    {
      title: 'IS DELETED',
      dataIndex: 'IS_DELETED',
      editable: true,
      render: (_, record) => {
        return <Checkbox checked={record.IS_DELETED ? true : false} />
      },
      key: 'IS_DELETED'
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
                onClick={() => save(record.ID)}
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
            <Tooltip title="Show Brand`s Sneakers">
              <Button
                key={Math.random()}
                type="primary"
                shape="circle"
                disabled={editingKey !== '' || record.IS_DELETED}
                icon={<PlusOutlined />}
                onClick={() => showModal(record)}
              />
            </Tooltip>
          </Space>
        )
      }
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
        inputType: col.dataIndex === 'IS_DELETED' ? 'checkbox' : 'text',
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record)
      })
    }
  })
  return (
    <div>
      <PageHeader
        title="BRAND"
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
          <Card title="Add New Brand" bordered={false}>
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
      <Modal
        visible={modalVisible}
        title={modalSneaker.TITLE}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button
            key="submit"
            type="primary"
            loading={modalLoading}
            onClick={() => handleCancel()}
          >
            Close
          </Button>
        ]}
      >
        <List
          itemLayout="horizontal"
          dataSource={modalData}
          renderItem={(item) => (
            <List.Item>
              <List.Item.Meta
                avatar={
                  <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                }
                title={<Tag color="red">{item.TITLE}</Tag>}
              />
            </List.Item>
          )}
        />
      </Modal>
    </div>
  )
}

export default BrandList
