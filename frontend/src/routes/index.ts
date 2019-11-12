/*!

=========================================================
* Argon Dashboard React - v1.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import * as Containers from '../views/containers'

const routes = [
  {
    path: '/',
    exact: true,
    name: 'Overview',
    icon: 'ni ni-app text-primary',
    component: Containers.HomeContainer,
    type: 'common'
  },
  {
    path: '/health',
    exact: false,
    name: 'Health',
    icon: 'ni ni-planet text-green',
    component: Containers.HealthContainer,
    type: 'common'
  },
  {
    path: '/history',
    exact: false,
    name: 'History',
    icon: 'ni ni-watch-time text-yellow',
    component: Containers.HistoryContainer,
    type: 'common'
  },
  {
    path: '/dashboard',
    exact: false,
    name: 'Dashboard',
    icon: 'ni ni-tv-2 text-red',
    component: Containers.DashboardContainer,
    type: 'user'
  },
  {
    path: '/arbitrage',
    exact: false,
    name: 'Arbitrage',
    icon: 'fas fa-exchange-alt text-dark',
    component: Containers.ArbitrageContainer,
    type: 'user'
  }
]

export default routes
