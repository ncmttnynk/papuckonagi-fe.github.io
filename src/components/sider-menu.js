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
      defaultSelectedKeys={['1']}
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
      </SubMenu>
    </Menu>
  </Sider>
)

export default SiderMenu
