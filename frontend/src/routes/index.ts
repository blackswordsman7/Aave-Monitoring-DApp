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
    icon: 'ni ni-tv-2 text-primary',
    component: Containers.HomeContainer
  },
  {
    path: '/health',
    exact: false,
    name: 'Health',
    icon: 'ni ni-planet text-blue',
    component: Containers.HealthContainer
  },
  {
    path: '/history',
    exact: false,
    name: 'History',
    icon: 'ni ni-watch-time text-green',
    component: Containers.HistoryContainer
  }
]

export default routes
