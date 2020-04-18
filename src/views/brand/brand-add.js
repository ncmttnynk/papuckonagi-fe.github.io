import React from 'react'
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

const BrandAdd = () => {
  const [brandForm] = Form.useForm()

  const layout = {
    labelCol: {
      span: 4
    },
    wrapperCol: {
      span: 16
    }
  }
  const tailLayout = {
    wrapperCol: {
      offset: 18
    }
  }

  const onFinish = async (values) => {
    const data = {
      CREATED_BY: values.createdBy,
      TITLE: values.title
    }
    const response = await addNewBrand(data)
    if (response.data.isSuccess) {
      notification.success({
        message: 'Success',
        description: `${data.TITLE} added successfully!`,
        placement: 'topLeft'
      })
      brandForm.resetFields()
    }
  }

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo)
  }

  const gridStyle = {
    width: '100%'
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
                  <Button type="primary" htmlType="submit">
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
