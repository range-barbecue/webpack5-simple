import React from 'react'
import ReactDom from 'react-dom'
import Router from '@/router'
import { Provider } from 'react-redux'
import store from '@/store/store.js'
import {ConfigProvider } from 'antd'
import zhCN from 'antd/es/locale/zh_CN'
import moment from 'moment'
import 'moment/locale/zh-cn'
moment.locale('zh-cn')

ReactDom.render(
  <ConfigProvider locale={zhCN}>
    <Provider store={store}>
      <Router />
    </Provider>
  </ConfigProvider>,
  document.getElementById('root')
)
