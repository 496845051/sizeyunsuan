import Vue from 'vue'
import Router from 'vue-router'
import Index from '../pages/Index'
import Main from '../pages/Main/Main'
import Student from '../pages/Student/Student'
import Teacher from '../pages/Teacher/Teacher'
import Homework from '../pages/Homework/Homework'
import DoWork from '../pages/DoWork/DoWork'
import AddWork from '../pages/AddWork/AddWork'
import ShowScore from '../pages/ShowScore/ShowScore'
import AddDetailWork from '../pages/AddWork/Add'
import TeaWorkDetail from '../pages/TeaWorkDetail/TeaWorkDetail'
import ManageClass from '../pages/ManageClass/ManageClass'
import WorkDetail from '../pages/WorkDetail/WorkDetail'
import ChooseWork from '../pages/ChooseWork/ChooseWork'
import LoginMain from '../pages/Login/Index'
import Login from '../pages/Login/Login/Login'
import Register from '../pages/Login/Register/Register'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index,
      children:[
        {
          path: '/',
          name: 'Main',
          component: Main,
          value:"1"
        },
        {
          path: '/Login',
          name: 'LoginMain',
          component: LoginMain,
          value:"2",
          children:[
            {
              path: '/',
              name: 'Login',
              component: Login,
              value:"2-1"
            },
            {
              path: '/Login/Register',
              name: 'Register',
              component: Register,
              value:"2-2"
            }
          ]
        },
        {
          path: '/Student',
          name: 'Student',
          component: Student,
          value:"3"
        },
        {
          path: '/Homework',
          name: 'Homework',
          component: Homework,
          value:"4"
        },
        {
          path: '/DoWork',
          name: 'DoWork',
          component: DoWork,
          value:"5"
        },
        {
          path: '/ChooseWork',
          name: 'ChooseWork',
          component: ChooseWork,
          value:"6"
        },
        {
          path: '/WorkDetail',
          name: 'WorkDetail',
          component: WorkDetail,
          value:"7"
        },
        {
          path: '/Teacher',
          name: 'Teacher',
          component: Teacher,
          value:"8"
        },
        {
          path: '/ManageClass',
          name: 'ManageClass',
          component: ManageClass,
          value:"9"
        },
        {
          path: '/AddWork',
          name: 'AddWork',
          component: AddWork,
          value:"10"
        },
        {
          path: '/TeaWorkDetail',
          name: 'TeaWorkDetail',
          component: TeaWorkDetail,
          value:"11"
        },
        {
          path: '/AddDetailWork',
          name: 'AddDetailWork',
          component: AddDetailWork,
          value:"12"
        },
        {
          path: '/ShowScore',
          name: 'ShowScore',
          component: ShowScore,
          value:"13"
        },
      ]
    }
  ]
})
