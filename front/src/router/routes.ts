import { lazy } from 'react'
import { IRouteProps } from '@/router/types'
import { HOME, SETTING } from './constants'
import Login from '@/views/login/index'


const routesMap: IRouteProps[] = [
  {
    path: HOME.LOGIN.path,
    exact: true,
    component: Login,
    meta: {
      // 当前页面是否需要登录状态
      requireAuth: false,
      // 网页标题
      title: HOME.LOGIN.name,
      // 如果当前登录状态跳转到后台首页
      isLoginToHome: true
    }
  }
]

// const Base = lazy(() => import('@/views/home/setting/base'))
// const InnerMessage = lazy(() => import('@/views/home/setting/inner-message'))
// const Notification = lazy(() => import('@/views/home/setting/notification'))
// const Account = lazy(() => import('@/views/home/setting/account'))

// export const settingRoutes: IRouteProps[] = [
//   {
//     path: SETTING.BASE.path,
//     component: Base,
//     meta: {
//       requiresAuth: true,
//       title: SETTING.BASE.name
//     }
//   },
//   {
//     path: SETTING.INNER_MESSAGE.path,
//     component: InnerMessage,
//     meta: {
//       requiresAuth: true,
//       title: SETTING.INNER_MESSAGE.name
//     }
//   },
//   {
//     path: SETTING.NOTIFICATION.path,
//     component: Notification,
//     meta: {
//       requiresAuth: true,
//       title: SETTING.NOTIFICATION.name
//     }
//   },
//   {
//     path: SETTING.ACCOUNT.path,
//     component: Account,
//     meta: {
//       requiresAuth: true,
//       title: SETTING.ACCOUNT.name
//     }
//   },
// ]

export default routesMap
