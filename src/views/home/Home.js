import React from 'react';
import { Layout } from 'antd';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import HeaderMenu from '../../components/header-menu';
import SiderMenu from '../../components/sider-menu';

import BrandAdd from '../brand/brand-add';
import BrandList from '../brand/brand-list';

const { Content } = Layout;

const Home = () => (
  <Router>
    <Layout>
      <HeaderMenu />
      <Layout>
        <SiderMenu />
        <Layout style={{ padding: '0 24px 24px' }}>
          <Content
            className='site-layout-background'
            style={{
              padding: 24,
              margin: 0,
              minHeight: 280,
            }}
          >
            <Route exact path='/brand-add' component={BrandAdd} />
            <Route path='/brand-list' component={BrandList} />
          </Content>
        </Layout>
      </Layout>
    </Layout>
  </Router>
);

export default Home;
