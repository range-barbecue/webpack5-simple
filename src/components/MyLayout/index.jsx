import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Layout, Menu, Breadcrumb } from 'antd';
const { Header, Footer, Content } = Layout;
import routes from '@/router/router.config'
import './index.scss'

function MyLayout(props) {
  const location = useLocation()
  const [pageInfo, setPageInfo] = useState({ text: '工具类', name: 'home', path: '/home' });

  useEffect(() => {
    let cur = routes.filter((item) => {
      return item.path == location.pathname
    })
    if(cur.length>=1){
      setPageInfo(cur[0])
    }
  }, [location])

  return (
    <Layout className="layout">
      <Header style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
        <div className="logo" />
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
          <Menu.Item key="1">前端工具库</Menu.Item>
        </Menu>
      </Header>
      <Content className="site-layout" style={{ padding: '0 50px', marginTop: 64 }}>
        <Breadcrumb style={{ margin: '16px 0' }}>
          <Breadcrumb.Item>
            <Link to="/home" >
              工具类
            </Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>{pageInfo.text}</Breadcrumb.Item>
        </Breadcrumb>
        <div className="site-layout-background" style={{ padding: 24, minHeight: 380 }}>
          {props.children}
        </div>
      </Content>
      <Footer style={{ textAlign: 'center' }}>Tools ©2022 Created by TaoRan</Footer>
    </Layout>
  )
}

export default MyLayout
