import React from 'react'
import { Layout } from 'antd'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import HeaderMenu from '../../components/header-menu'
import SiderMenu from '../../components/sider-menu'

import BrandAdd from '../brand/brand-add'
import BrandList from '../brand/brand-list'

import SneakerAdd from '../sneaker/sneaker-add'
import SneakerList from '../sneaker/sneaker-list'

import OrderAdd from '../order/order-add'
import OrderList from '../order/order-list'

import SocketTest from '../socket/socket-test'

const { Content } = Layout

const Home = () => (
  <Router>
    <Layout>
      <HeaderMenu />
      <Layout>
        <Layout style={{ padding: '0 24px 24px' }}>
          <Content
            className="site-layout-background"
            style={{
              padding: 24,
              margin: 0,
              minHeight: 960
            }}
          >
            <Route exact path="/brand-add" component={BrandAdd} />
            <Route path="/brand-list" component={BrandList} />
            <Route path="/sneaker-add" component={SneakerAdd} />
            <Route path="/sneaker-list" component={SneakerList} />
            <Route path="/order-add" component={OrderAdd} />
            <Route path="/order-list" component={OrderList} />
            <Route path="/socket-test" component={SocketTest} />
          </Content>
        </Layout>
        <SiderMenu />
      </Layout>
    </Layout>
  </Router>
)

export default Home
