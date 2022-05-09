import React, { Suspense } from 'react'
import { Route, Switch, HashRouter, Redirect } from 'react-router-dom'
import routes from '@/router/router.config'
import { MyLayout } from '@/components'
import pages from '@/pages'



const renderRoute = (routes, props) => (
  routes.map((route, index) => (
    route.children && route.children.length ?
      renderRoute(route.children, props) :
      <Route exact key={route.name} path={route.path} component={route.component} />
  ))
)



function RouterMap(props) {
  return (
    <HashRouter>
      <Switch>
        <Route path="/login" component={pages.Login} />
        <Route path="/no-auth" component={pages.NoAuth} />
        <Route path="/">
          <MyLayout>
            <Suspense fallback={<div>Loading...</div>}>
              <Switch>
                {renderRoute(routes, props)}
                <Redirect to="/home" />
              </Switch>
            </Suspense>
          </MyLayout>
        </Route>
      </Switch>
    </HashRouter>
  )
}

export default RouterMap
