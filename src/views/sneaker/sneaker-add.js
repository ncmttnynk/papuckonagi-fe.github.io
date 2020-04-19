import React, { useState, useEffect } from 'react'
import {
  Form,
  Input,
  Button,
  PageHeader,
  Tag,
  Row,
  Col,
  Card,
  notification,
  Select
} from 'antd'

import { getBrandList } from './../../services/brand-service'
import { addNewSneaker } from './../../services/sneaker-service'

const { Option } = Select

const SneakerAdd = () => {
  const [brandForm] = Form.useForm()
  const [brandList, setBrandList] = useState([])

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

  const getBrand = async () => {
    const { data } = await getBrandList()
    if (data.isSuccess) {
      const list = []
      data.result.map((brand) => {
        const item = {
          title: brand.TITLE,
          key: brand.ID
        }
        list.push(item)
      })
      setBrandList(list)
    }
  }

  useEffect(() => {
    getBrand()
  }, [])

  const onFinish = async (values) => {
    const data = {
      CREATED_BY: values.createdBy,
      TITLE: values.title,
      COLOR: values.color,
      BRAND_ID: values.brand
    }
    const response = await addNewSneaker(data)
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
        title="SNEAKER"
        className="site-page-header"
        tags={<Tag color="blue">New</Tag>}
        avatar={{
          src:
            'https://instagram.fist7-2.fna.fbcdn.net/v/t51.2885-19/s150x150/84112379_337759313824930_4418112856008949760_n.jpg?_nc_ht=instagram.fist7-2.fna.fbcdn.net&_nc_ohc=Ea8vmIXefJAAX8V1w81&oh=b9655e8e250250178dccbb81f76ff011&oe=5EC40D8B'
        }}
      ></PageHeader>
      <Row>
        <Col span={16}>
          <Card title="Add New Sneaker" bordered={false}>
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
                  <Input placeholder="AIRMAX" />
                </Form.Item>
                <Form.Item
                  label="Color"
                  name="color"
                  rules={[
                    {
                      required: true,
                      message: 'Please input sneaker color!'
                    }
                  ]}
                >
                  <Input placeholder="Black and White" />
                </Form.Item>
                <Form.Item
                  name="brand"
                  label="Brand"
                  rules={[
                    {
                      required: true,
                      message: 'Please input brand!'
                    }
                  ]}
                >
                  <Select placeholder="Select a brand" allowClear>
                    {brandList.map((item) => {
                      return (
                        <Option key={item.key} value={item.key}>
                          {item.title}
                        </Option>
                      )
                    })}
                  </Select>
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

export default SneakerAdd
