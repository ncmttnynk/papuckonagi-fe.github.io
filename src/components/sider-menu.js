import React from 'react'
import { Link } from 'react-router-dom'
import { Layout, Menu } from 'antd'
import { CopyFilled, YuqueFilled, EditFilled } from '@ant-design/icons'

const { SubMenu } = Menu
const { Sider } = Layout

const SiderMenu = () => (
  <Sider width={400} className="site-layout-background">
    <Menu
      theme="dark"
      mode="inline"
      defaultOpenKeys={['sub1']}
      style={{ height: '100%', borderRight: 0 }}
    >
      <SubMenu
        key="sub1"
        title={
          <span>
            <YuqueFilled />
            Brand
          </span>
        }
      >
        <Menu.Item key="1">
          <CopyFilled />
          <span>List</span>
          <Link to="/brand-list" />
        </Menu.Item>
        <Menu.Item key="2">
          <EditFilled />
          <span>Add New</span>
          <Link to="/brand-add" />
        </Menu.Item>
      </SubMenu>
      <SubMenu
        key="sub2"
        title={
          <span>
            <YuqueFilled />
            Sneaker
          </span>
        }
      >
        <Menu.Item key="3">
          <CopyFilled />
          <span>List</span>
          <Link to="/sneaker-list" />
        </Menu.Item>
        <Menu.Item key="4">
          <EditFilled />
          <span>Add New</span>
          <Link to="/sneaker-add" />
        </Menu.Item>
      </SubMenu>{' '}
      <SubMenu
        key="sub3"
        title={
          <span>
            <YuqueFilled />
            Order
          </span>
        }
      >
        <Menu.Item key="5">
          <CopyFilled />
          <span>List</span>
          <Link to="/order-list" />
        </Menu.Item>
        <Menu.Item key="6">
          <EditFilled />
          <span>Add New</span>
          <Link to="/order-add" />
        </Menu.Item>
      </SubMenu>
      <SubMenu
        key="sub4"
        title={
          <span>
            <YuqueFilled />
            Socket
          </span>
        }
      >
        <Menu.Item key="7">
          <EditFilled />
          <span>Socket Test</span>
          <Link to="/socket-test" />
        </Menu.Item>
      </SubMenu>
    </Menu>
  </Sider>
)

export default SiderMenu
