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
import { getProvinceList } from './../../services/province-service'

const { Option } = Select

const OrderAdd = () => {
  const [sneakerForm] = Form.useForm()
  const [brandList, setBrandList] = useState([])
  const [provinceListData, setProvinceListData] = useState([])
  const [districtListData, setDistrictListData] = useState([])
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

  const provinceList = async () => {
    setFormLoading(true)
    const { data } = await getProvinceList()
    if (data.isSuccess) {
      setProvinceListData(data.result)
    } else {
    }
    setFormLoading(false)
  }

  const getBrand = async () => {
    const { data } = await getBrandList()
    if (data.isSuccess) {
      setBrandList(data.result)
    } else {
      notification.warning({
        message: 'Error',
        description: `${data.error}!`,
        placement: 'topLeft'
      })
    }
  }

  useEffect(() => {
    getBrand()
    provinceList()
  }, [])

  const handleChange = (value) => {
    if (value) {
      const data = provinceListData.filter(
        (item) => item.UPPER_CITY_NAME === value.key
      )[0].DISTRICTS
      setDistrictListData(data)
    }
  }

  const onFinish = async (values) => {
    console.log(sneakerForm.getFieldsValue())
    setFormLoading(true)
    const postData = {
      CREATED_BY: values.createdBy,
      TITLE: values.title,
      COLOR: values.color,
      BRAND_ID: values.brand
    }
    const { data } = await addNewSneaker(postData)
    if (data.isSuccess) {
      notification.success({
        message: 'Success',
        description: `${data.result.TITLE} added successfully!`,
        placement: 'topLeft'
      })
      sneakerForm.resetFields()
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
    notification.warning({
      message: 'Error',
      description: 'Validate form!',
      placement: 'topLeft'
    })
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
                form={sneakerForm}
                name="sneakerForm"
                onFinish={onFinish}
                initialValues={{
                  createdBy: 'ncmttnynk'
                }}
                onFinishFailed={onFinishFailed}
              >
                <Form.Item
                  label="Name"
                  name="name"
                  rules={[
                    {
                      required: true,
                      message: 'Please input customer name!'
                    }
                  ]}
                >
                  <Input placeholder="Smith" />
                </Form.Item>
                <Form.Item
                  label="Surname"
                  name="surName"
                  rules={[
                    {
                      required: true,
                      message: 'Please input customer surname!'
                    }
                  ]}
                >
                  <Input placeholder="Smith" />
                </Form.Item>
                <Form.Item
                  label="Phone"
                  name="phone"
                  rules={[
                    {
                      required: true,
                      message: 'Please input customer phone!'
                    }
                  ]}
                >
                  <Input placeholder="+905555555555" />
                </Form.Item>
                <Form.Item
                  label="Province"
                  name="province"
                  rules={[
                    {
                      required: true,
                      message: 'Please input province!'
                    }
                  ]}
                >
                  <Select
                    showSearch
                    onChange={handleChange}
                    placeholder="Select a province"
                    allowClear
                    labelInValue={true}
                  >
                    {provinceListData.map((item) => {
                      return (
                        <Option key={item.ID} value={item.UPPER_CITY_NAME}>
                          {item.UPPER_CITY_NAME}
                        </Option>
                      )
                    })}
                  </Select>
                </Form.Item>
                <Form.Item
                  label="District"
                  name="district"
                  rules={[
                    {
                      required: true,
                      message: 'Please input district!'
                    }
                  ]}
                >
                  <Select placeholder="Select a district" allowClear showSearch>
                    {districtListData.map((item) => {
                      return (
                        <Option key={item.ID} value={item.ID}>
                          {item.UPPER_DISTRICT_NAME}
                        </Option>
                      )
                    })}
                  </Select>
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
                        <Option key={item.ID} value={item.ID}>
                          {item.TITLE}
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
                  <Button
                    danger
                    loading={formLoading}
                    htmlType="button"
                    onClick={() => sneakerForm.resetFields()}
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

export default OrderAdd
