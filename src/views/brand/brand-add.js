import React, { useState } from 'react'
import {
  Form,
  Input,
  Button,
  PageHeader,
  Tag,
  Row,
  Col,
  Card,
  notification
} from 'antd'

import { addNewBrand } from './../../services/brand-service'
import SocketIO from 'socket.io-client'
const SOCKET_URL = 'http://localhost:3005'

const BrandAdd = () => {
  const [brandForm] = Form.useForm()
  const [formLoading, setFormLoading] = useState(false)

  const layout = {
    labelCol: {
      span: 4
    },
    wrapperCol: {
      span: 12
    }
  }
  const tailLayout = {
    wrapperCol: {
      offset: 12
    }
  }

  const gridStyle = {
    width: '100%'
  }
  const onFinish = async (values) => {
    setFormLoading(true)

    const postData = {
      CREATED_BY: values.createdBy,
      TITLE: values.title
    }

    const { data } = await addNewBrand(postData)

    let socket = SocketIO(SOCKET_URL)
    socket.emit('addNewBrand', data.isSuccess)
    if (data.isSuccess) {
      notification.success({
        message: 'Success',
        description: `${data.result.TITLE} added successfully!`,
        placement: 'topLeft'
      })
      brandForm.resetFields()
    } else {
      notification.warning({
        message: 'Error',
        description: `${data.error}!`,
        placement: 'topLeft'
      })
    }
    setFormLoading(false)
  }

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo)
  }

  return (
    <div>
      <PageHeader
        title="BRAND"
        className="site-page-header"
        tags={<Tag color="blue">New</Tag>}
        avatar={{
          src:
            'https://instagram.fist7-2.fna.fbcdn.net/v/t51.2885-19/s150x150/84112379_337759313824930_4418112856008949760_n.jpg?_nc_ht=instagram.fist7-2.fna.fbcdn.net&_nc_ohc=Ea8vmIXefJAAX8V1w81&oh=b9655e8e250250178dccbb81f76ff011&oe=5EC40D8B'
        }}
      ></PageHeader>
      <Row>
        <Col span={16}>
          <Card title="Add New Brand" bordered={false}>
            <Card.Grid style={gridStyle}>
              <Form
                {...layout}
                form={brandForm}
                name="brandForm"
                onFinish={onFinish}
                initialValues={{
                  createdBy: 'ncmttnynk'
                }}
                onFinishFailed={onFinishFailed}
              >
                <Form.Item
                  label="Title"
                  name="title"
                  rules={[
                    {
                      required: true,
                      message: 'Please input brand title!'
                    }
                  ]}
                >
                  <Input placeholder="NIKE" />
                </Form.Item>
                <Form.Item
                  label="Created By"
                  name="createdBy"
                  rules={[
                    {
                      required: true,
                      message: 'Please input created by!'
                    }
                  ]}
                >
                  <Input />
                </Form.Item>
                <Form.Item {...tailLayout}>
                  <Button
                    danger
                    loading={formLoading}
                    htmlType="button"
                    onClick={() => brandForm.resetFields()}
                  >
                    Reset
                  </Button>{' '}
                  <Button
                    loading={formLoading}
                    type="primary"
                    htmlType="submit"
                  >
                    Submit
                  </Button>
                </Form.Item>
              </Form>
            </Card.Grid>
          </Card>
        </Col>
      </Row>
    </div>
  )
}

export default BrandAdd
