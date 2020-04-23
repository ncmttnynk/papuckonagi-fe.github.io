import React, { useEffect } from 'react'
import { PageHeader, Tag, Row, Statistic, Button } from 'antd'
import SocketIO from 'socket.io-client'
const SOCKET_URL = 'http://localhost:3005'

const SocketTest = () => {
  useEffect(() => {}, [])

  const socketEmit = () => {
    let socket = SocketIO(SOCKET_URL)
    socket.emit('send message', {
      user: 'fullName',
      text: 'message.value'
    })
  }

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
          <Statistic title="TOTAL" />
          <Button danger htmlType="button" onClick={() => socketEmit()}>
            Reset
          </Button>
        </Row>
      </PageHeader>
    </div>
  )
}

export default SocketTest
