import pages from '@/pages'

/**
 *   eg: 
 *   PATH='/DEMO-ONE/:a'
 *   NAME 一定要为 'DEMO-ONE'
 */
let routes = [
  {
    name: 'home',
    text: '首页',
    path: '/home',
    component: pages.Home
  }
]

export default routes
