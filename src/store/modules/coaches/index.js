import mutations from './mutations.js';
import actions from './actions.js';
import getters from './getters.js';


export default{
   namespaced :true,
    state(){
return {
   // userIsCoach:false,
   lastFetch:null,
    coaches:[
        {
            id:"c1",
            firstName :"max",
            lastName:"rovan",
            areas:['soccer','fitness','zumba'],
            description: "i am max and i've worked as a tainer for 10 years",
            hourlyRate:40,
        },
       
          {
              id:"c2",
              firstName :"neda",
              lastName:"rosahn",
              areas:['soccer','fitness','zumba'],
              description: "i am max and i've worked as a tainer for 10 years",
              hourlyRate:40,
          },
          
              {
                  id:"c13",
                  firstName :"sara",
                  lastName:"miran",
                  areas:['soccer','zumba'],
                  description: "i am max and i've worked as a tainer for 10 years",
                  hourlyRate:40,
              },


         
    ]

};
    
    },
    mutations,
    actions,
    getters
}

