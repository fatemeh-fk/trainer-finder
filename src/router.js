import {createWebHistory,createRouter} from 'vue-router';

import TrainerDetail from './pages/trainers/TrainerDetail.vue';
import TrainersList from './pages/trainers/TrainersList.vue';
import TrainerRegistration from './pages/trainers/TrainerRegistration.vue';
import ContactTrainer from './pages/requests/ContactCoach.vue';
import RequestsReceived from './pages/requests/RequestsReceived.vue';
import NotFound from './pages/NotFound.vue'



const router= createRouter({


    history: createWebHistory(),
    routes:[
        {path : '/',redirect:'/trainers'},
        {path : '/trainers',component :TrainersList},
        {path : '/trainers/:id',component :TrainerDetail,children:[
            {path:'contact',component:ContactTrainer},
        ]},
        {path : '/register',component :TrainerRegistration},
        {path : '/requests',component :RequestsReceived},
        {path : '/:notFound(.*)',component :NotFound},

    ]
});

export default router;