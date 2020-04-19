import React from 'react'
import { Layout } from 'antd'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import HeaderMenu from '../../components/header-menu'
import SiderMenu from '../../components/sider-menu'

import BrandAdd from '../brand/brand-add'
import BrandList from '../brand/brand-list'

import SneakerAdd from '../sneaker/sneaker-add'
import SneakerList from '../sneaker/sneaker-list'

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
          </Content>
        </Layout>
        <SiderMenu />
      </Layout>
    </Layout>
  </Router>
)

export default Home
