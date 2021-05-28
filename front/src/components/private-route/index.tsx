import React from 'react'
import CONFIG from '@/config'
import qs from 'query-string' //格式化传参
import { Switch, Route, Redirect, withRouter, RouteComponentProps } from 'react-router-dom'
import { connect } from 'react-redux'
import { IRouteProps } from '@/router/types'
import { StoreState } from '@/store/index'
import { HOME } from '@/router/constants'

const mapStateToProps = (state: StoreState) => {
    return {
        isLogin: state.user.isLogin
    }
}

type Props = IRouteProps & ReturnType<typeof mapStateToProps> & RouteComponentProps // ??? 几个意思

const PrivateRoute: React.FC<Props> = ({
    component: Component,
    childrenRoutes,
    isLogin,
    location,
    ...rest
}) => {
    const { meta } = rest
    // 设置标题
    if (meta) {
        if (meta.title) {
            document.title = `${meta.title} - ${CONFIG.title}`
        } else {
            document.title = CONFIG.title
        }
    }

    // 验证权限
    const auth = function () {
        if (meta?.requireAuth) {
            if (isLogin) {
                return true
            } else {
                return false
            }
        }
        return true
    }()

    if (meta?.isLoginToHome && isLogin) {
        const redirectUrl = qs.parse(location.search).redirectUrl as string
        const url = redirectUrl || HOME.HOME_INDEX.path
        return <Redirect to={url} />
    }

    return (
        <Route render={props => {
            return (
                auth ? (
                    <Component {...props} {...rest}>
                        {Array.isArray(childrenRoutes) ? (
                            <Switch>
                                {childrenRoutes.map((route, idx:number) =>(
                                    <PrivateRouteComponent {...route} key={idx}/>
                                ))}
                            </Switch>
                        ) : null}
                    </Component>
                 ) : (
                     <Redirect to={{
                        pathname: '/',
                        search: `?redirectUrl=${props.location.pathname}`
                     }} />
                 )
            )
        }} />
    )
}

// connect方法，用于从 UI 组件生成容器组件。connect的意思，就是将这两种组件连起来。
// 使用withRouter就可以给此组件传入路由参数
export const PrivateRouteComponent = connect(mapStateToProps)(withRouter(PrivateRoute))

export default PrivateRouteComponent