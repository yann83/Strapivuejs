// importation des composants
import Login from './components/Login'
import Register from './components/Register'
import Recover from './components/Recover'
import Accueil from './components/Home/Accueil'
//import Page1 from './components/Home/Page1'
//import Page2 from './components/Home/Page2'

// creation des routes
export default [
    {path: '/', component: Login},
    {path: '/Register', component: Register},
    {path: '/Recover', component: Recover},
    {path: '/Accueil', component: Accueil}
    //{path: '/Page1', component: Page1},
    //{path: '/Page2', component: Page2}
]