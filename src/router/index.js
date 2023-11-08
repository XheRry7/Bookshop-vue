import { createRouter, createWebHashHistory } from "vue-router";
import BooksList from '@/components/BooksList'
import BookDetails from '@/components/BookDetails'

const routes = [
    {
        path:'/',
        name:'BookLists',
        component:BooksList
    },
    {
        path:'/:id',
        name:'BookDetail',
        component:BookDetails
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router;