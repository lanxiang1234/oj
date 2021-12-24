import Vue from 'vue'
import Router from 'vue-router'
import problem from '@/components/problem/problem'
import rank from '@/components/rank/rank'
import userhome from '@/components/home/userhomepage'
import home from '@/components/home/home'
import contest from '@/components/contest/contest'
import lab from '@/components/contest/lab'
import stauts from '@/components/stauts/status'
import problemdetail from '@/components/problem/promblemdetail'
import submit from '@/components/problem/submit'
import teacherhome from '@/components/teacher/teacherhomepage'
import tstudent from '@/components/teacher/teacherstudent/tstudent'
import admincontest from '@/components/teacher/teachercontest/admincontest'
import createcontest from '@/components/teacher/teachercontest/createcontest'
import adminproblem from '@/components/teacher/teacherproblem/adminproblem'
import createproblem from "../components/teacher/teacherproblem/createproblem";
import ac from "../components/problem/ac";
import tle from "../components/problem/tle";
import wa from "../components/problem/wa";
import ce from "../components/problem/ce";
import mle from "../components/problem/mle";
import setting from "../components/utils/setting";
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/setting',
      name: 'setting',
      component: setting,
    },
    {
      path: '/problem',
      name: 'problem',
      component: problem,
    },
    {
      path: '/rank',
      name: 'rank',
      component: rank,
    },
    {
      path: '/userhome',
      name: 'userhome',
      component: userhome,
    },
    {
      path: '/',
      name: 'home',
      component: home,
    },
    {
      path: '/contest',
      name: 'contest',
      component: contest,
    },
    {
      path: '/status',
      name: 'status',
      component: stauts,
    },
    {
      path: '/lab',
      name: 'lab',
      component: lab,
    }
    ,
    {
      path: '/problemdetail',
      name: 'problemdetail',
      component: problemdetail,
    }
    ,
    {
      path: '/submit',
      name: 'submit',
      component: submit,
    }
    ,
    {
      path: '/ac',
      name: 'ac',
      component: ac,
    }
    ,
    {
      path: '/tle',
      name: 'tle',
      component: tle,
    }
    ,
    {
      path: '/wa',
      name: 'wa',
      component: wa,
    }
    ,
    {
      path: '/mle',
      name: 'mle',
      component: mle,
    }
    ,
    {
      path: '/ce',
      name: 'ce',
      component: ce,
    }

    ,
    {
      path: '/teacherhome',
      name: 'teacherhome',
      component: teacherhome,
      children: [
        {
          path: 'student',
          name: 'student',
          component: tstudent,
        },
        {
          path: 'admincontest',
          name: 'admincontest',
          component: admincontest,
        },
        {
          path: 'createcontest',
          name: 'createcontest',
          component: createcontest,
        },
        {
          path: 'adminproblem',
          name: 'adminproblem',
          component: adminproblem,
        },
        {
          path: 'createproblem',
          name: 'createproblem',
          component: createproblem,
        },
        ]

    }
  ]
})
