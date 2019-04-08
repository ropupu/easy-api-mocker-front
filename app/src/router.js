import Vue from 'vue'
import Router from 'vue-router'
import CreateGroup from '@/components/CreateGroup'
import Endpoints from '@/components/Endpoints'

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            name: 'CreateGroup',
            component: CreateGroup
        },
        {
            path: '/:group_key',
            name: 'Endpoints',
            component: Endpoints
        }
    ]
})