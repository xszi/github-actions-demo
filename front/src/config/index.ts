// vite判断是否是生产环境
const isProduction = import.meta.env.PROD
const isDevelopment = !isProduction

const CONFIG = {
    isProduction,
    isDevelopment,
    // 路由 basename
    baseURL: '/',
    title: 'Tomato Work',
    // 服务地址
    http: {
        baseURL: isDevelopment ? 'http://localhost:7003/api'
        : 'http://wangjiuhua.com/api'
    },
    github: {
        // todo
    }
}

export default CONFIG