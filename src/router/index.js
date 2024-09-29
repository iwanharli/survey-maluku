import { createRouter, createWebHistory } from 'vue-router'
// import { createRouter, createWebHashHistory } from 'vue-router'

// AUTH
const authChildRoutes = (prefix) => [
    {
        path: '',
        name: prefix + '.login',
        meta: { auth: false, name: 'Login' },
        component: () => import('@/views/_auth/SignIn.vue')
    },
    {
        path: 'register',
        name: prefix + '.register',
        meta: { auth: false, name: 'Register' },
        component: () => import('@/views/_auth/SignUp.vue')
    },
    {
        path: 'reset-password',
        name: prefix + '.reset-password',
        meta: { auth: false, name: 'Reset Password' },
        component: () => import('@/views/_auth/ResetPassword.vue')
    },
    {
        path: 'varify-email',
        name: prefix + '.varify-email',
        meta: { auth: false, name: 'Varify Email' },
        component: () => import('@/views/_auth/VarifyEmail.vue')
    },
    {
        path: 'lock-screen',
        name: prefix + '.lock-screen',
        meta: { auth: false, name: 'Lock Screen' },
        component: () => import('@/views/_auth/LockScreen.vue')
    }
]

// ADMIN
const adminRoutes = (prefix) => [
    {
        path: 'dashboard',
        name: prefix + '.dashboard',
        meta: { auth: true, name: 'HomeAdmin', isBanner: true },
        component: () => import('@/views/admin/DashboardPage.vue')
    },

    // LAPOR
    {
        path: 'input-issue',
        name: prefix + '.input-issue',
        meta: { auth: false, name: 'inputIssue', isBanner: true },
        component: () => import('@/views/admin/issue/inputIssue.vue')
    },
    {
        path: 'input-survey-nasional',
        name: prefix + '.input-survey-nasional',
        meta: { auth: false, name: 'inputSurveyNasional', isBanner: true },
        component: () => import('@/views/admin/survey/inputSurveyNasional.vue')
    },
    {
        path: 'input-survey-papua',
        name: prefix + '.input-survey-papua',
        meta: { auth: false, name: 'inputSurveyPapua', isBanner: true },
        component: () => import('@/views/admin/survey/inputSurveyPapua.vue')
    },
    {
        path: 'input-survey-jogja',
        name: prefix + '.input-survey-jogja',
        meta: { auth: false, name: 'inputSurveyJogja', isBanner: true },
        component: () => import('@/views/admin/survey/inputSurveyJogja.vue')
    },
    {
        path: 'input-survey-excel',
        name: prefix + '.input-survey-excel',
        meta: { auth: false, name: 'inputSurveyExcel', isBanner: true },
        component: () => import('@/views/admin/survey/inputSurveyExcel.vue')
    },


    {
        path: 'input-survey-papua-sehat',
        name: prefix + '.input-survey-papua-sehat',
        meta: { auth: false, name: 'inputSurveyPapuaSehat', isBanner: true },
        component: () => import('@/views/admin/survey/inputSurveyPapuaSehat.vue')
    },


    // ISU MANAGEMENT 
    {
        path: 'responden-issue',
        name: prefix + '.responden-issue',
        meta: { auth: true, name: 'respondenIssue', isBanner: false },
        component: () => import('@/views/admin/issue/respondenIssue.vue')
    },
    {
        path: 'category-issue',
        name: prefix + '.category-issue',
        meta: { auth: true, name: 'categoryIssue', isBanner: false },
        component: () => import('@/views/admin/issue/categoryIssue.vue')
    },


    // SURVEY MANAGEMENT
    {
        path: 'responden-survey-jogja',
        name: prefix + '.responden-survey-jogja',
        meta: { auth: true, name: 'respondenSurveyJogja', isBanner: false },
        component: () => import('@/views/admin/survey/respondenSurveyJogja.vue')
    },
    {
        path: 'responden-survey-papua',
        name: prefix + '.responden-survey-papua',
        meta: { auth: true, name: 'respondenSurveyPapua', isBanner: false },
        component: () => import('@/views/admin/survey/respondenSurveyPapua.vue')
    },
    {
        path: 'responden-survey-anak',
        name: prefix + '.responden-survey-anak',
        meta: { auth: true, name: 'respondenSurveyAnak', isBanner: false },
        component: () => import('@/views/admin/survey/respondenSurveyAnak.vue')
    },
    {
        path: 'daftar-survey',
        name: prefix + '.daftar-survey',
        meta: { auth: true, name: 'daftarSurvey', isBanner: false },
        component: () => import('@/views/admin/survey/daftarSurvey.vue')
    },

    // USER
    {
        path: 'register-user',
        name: prefix + '.register-user',
        meta: { auth: true, name: 'addUser', isBanner: false },
        component: () => import('@/views/admin/users/registerUser.vue')
    },
    {
        path: 'daftar-user',
        name: prefix + '.daftar-user',
        meta: { auth: true, name: 'daftarUser', isBanner: false },
        component: () => import('@/views/admin/users/daftarUser.vue')
    },
    {
        path: 'test-user',
        name: prefix + '.test-user',
        meta: { auth: true, name: 'test', isBanner: false },
        component: () => import('@/views/admin/users/testexport.vue')
    },

    // INBOX
    {
        path: 'inbox',
        name: prefix + '.inbox-msg',
        meta: { auth: true, name: 'inboxMsg', isBanner: true },
        component: () => import('@/views/admin/inbox/InboxPage.vue')
    },

    // PROFILE
    {
        path: 'profile',
        name: prefix + '.user-profile',
        meta: { auth: true, name: 'profile', isBanner: false },
        component: () => import('@/views/admin/inbox/ProfilePage.vue')
    },

]

// KOORDINATOR
const koordinatorRoutes = (prefix) => [
    {
        path: 'koordinator',
        name: prefix + '.dashboard',
        meta: { auth: true, name: 'HomeKoordinator', isBanner: true },
        component: () => import('@/views/koordinator/DashboardPage.vue')
    },

    // LAPOR
    {
        path: 'koordinator/input-issue',
        name: prefix + '.input-issue',
        meta: { auth: true, name: 'inputIssue', isBanner: true },
        component: () => import('@/views/koordinator/inputIssue.vue')
    },
    {
        path: 'koordinator/input-survey',
        name: prefix + '.input-survey',
        meta: { auth: true, name: 'inputSurvey', isBanner: true },
        component: () => import('@/views/koordinator/inputSurvey.vue')
    },

    // INBOX
    {
        path: 'koordinator/inbox',
        name: prefix + '.inbox-msg',
        meta: { auth: true, name: 'inboxMsg', isBanner: true },
        component: () => import('@/views/koordinator/InboxPage.vue')
    },
]

// RELAWAN
const relawanRoutes = (prefix) => [
    {
        path: 'relawan',
        name: prefix + '.dashboard',
        meta: { auth: true, name: 'HomeRelawan', isBanner: true },
        component: () => import('@/views/relawan/DashboardPage.vue')
    },

    // LAPOR
    {
        path: 'relawan/input-issue',
        name: prefix + '.input-issue',
        meta: { auth: true, name: 'inputIssue', isBanner: true },
        component: () => import('@/views/relawan/inputIssue.vue')
    },

    {
        path: 'relawan/input-survey-nasional',
        name: prefix + '.input-survey-nasional',
        meta: { auth: true, name: 'inputSurveyNasional', isBanner: true },
        component: () => import('@/views/relawan/inputSurveyNasional.vue')
    },
    {
        path: 'relawan/input-survey-jogja',
        name: prefix + '.input-survey-jogja',
        meta: { auth: true, name: 'inputSurveyJogja', isBanner: true },
        component: () => import('@/views/relawan/inputSurveyJogja.vue')
    },
    {
        path: 'relawan/input-survey-papua',
        name: prefix + '.input-survey-papua',
        meta: { auth: true, name: 'inputSurveyPapua', isBanner: true },
        component: () => import('@/views/relawan/inputSurveyPapua.vue')
    },


    // INBOX
    {
        path: 'relawan/inbox',
        name: prefix + '.inbox-msg',
        meta: { auth: true, name: 'inboxMsg', isBanner: true },
        component: () => import('@/views/relawan/InboxPage.vue')
    },
]

// ERROR
const errorRoutes = (prefix) => [
    {
        path: '404',
        name: prefix + '.404',
        meta: { auth: true, name: 'Error 404', isBanner: true },
        component: () => import('@/views/errors/Error404Page.vue')
    },
    {
        path: '500',
        name: prefix + '.500',
        meta: { auth: true, name: 'Error 500', isBanner: true },
        component: () => import('@/views/errors/Error500Page.vue')
    },
    {
        path: 'maintenance',
        name: prefix + '.maintenance',
        meta: { auth: true, name: 'Maintenance', isBanner: true },
        component: () => import('@/views/errors/MaintenancePage.vue')
    }
]

const router = createRouter({
    linkActiveClass: 'active',
    linkExactActiveClass: 'exact-active',
    history: createWebHistory(process.env.BASE_URL),
    base: process.env.BASE_URL,

    routes: [
        {
            path: '/',
            name: 'auth',
            component: () => import('../layouts/guest/BlankLayout.vue'),
            children: authChildRoutes('auth')
        },

        {
            path: '/',
            name: 'adminPage',
            component: () => import('../layouts/AdminLayout.vue'),
            children: adminRoutes('admin'),
            meta: { requiresAuth: true, allowedRoles: ['admin'] }
        },

        {
            path: '/',
            name: 'koordinatorPage',
            component: () => import('../layouts/DefaultLayout.vue'),
            children: koordinatorRoutes('koordinator'),
            meta: { requiresAuth: true, allowedRoles: ['koordinator'] }
        },

        {
            path: '/',
            name: 'relawanPage',
            component: () => import('../layouts/DefaultLayout.vue'),
            children: relawanRoutes('relawan'),
            meta: { requiresAuth: true, allowedRoles: ['relawan'] }
        },

        {
            path: '/errors',
            name: 'errors',
            component: () => import('../layouts/guest/BlankLayout.vue'),
            children: errorRoutes('errors')
        },

        // Catch-all route for handling 404 errors
        {
            path: '/:catchAll(.*)',
            component: () => import('@/views/errors/Error404Page.vue')
        }
    ]
})

// Global navigation guard
router.beforeEach((to, from, next) => {
    const requiredRoles = to.meta.allowedRoles;

    if (to.path === '/' && localStorage.getItem('token')) {
        next('/dashboard');
    } else if (requiredRoles && requiredRoles.length > 0) {
        const userRole = localStorage.getItem('role');

        if (!userRole || !requiredRoles.includes(userRole)) {
            next('/errors/404');
        } else {
            next();
        }
    } else {
        next();
    }
});

// router.beforeEach((to, from, next) => {
//     const requiresAuth = to.matched.some(route => route.meta.auth);
//     const isAuthenticated = localStorage.getItem("authenticated");

//     if (to.name !== 'auth.login' && !isAuthenticated && requiresAuth) {
//         next({ name: 'auth.login' });
//     } else if (to.name === 'auth.login' && isAuthenticated) {
//         next({ name: 'admin.dashboard' });
//     } else if (to.matched.length === 0) {
//         next({ name: 'errors.404' });
//     } else {
//         next();
//     }
// });


export default router
