import React from 'react'
import ReactDOM from 'react-dom'
import './assets/styles/global.scss'
import 'antd/dist/antd.css'
import { ConfigProvider } from 'antd'
import zh_CN from 'antd/lib/locale-provider/zh_CN'
import { Provider } from 'react-redux'
import moment from 'moment'
import 'moment/locale/zh-cn'
import Routes from './router'
import store from '@/store'

ReactDOM.render(
    //   <React.StrictMode>
    <Provider store={store}>
        <ConfigProvider locale={zh_CN}>
            <Routes />
        </ConfigProvider>
    </Provider>
    //   </React.StrictMode>,
    ,
    document.getElementById('root')
)
