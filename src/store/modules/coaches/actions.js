 export default {


    async registerCoach(context,data){
      const userId = context.rootGetters.userId;
       const coachData={
         id:context.rootGetters.userId,
        firstName:data.first,
        lastName:data.last,
        description :data.desc,
        hourlyRate:data.rate,
        areas:data.areas
       };

       const response=await fetch(`https://findyourtrainer-935e3-default-rtdb.firebaseio.com/coaches/${userId}.json`,{

       method:'PUT',
       body:JSON.stringify(coachData)
       });
       //const responseData=await response.json()
       if(!response.ok){
          //error
       }
       context.commit('registerCoach',{
          
         ...coachData,
         id:userId
      
      })
    },
    async loadCoaches(context,payload){

      if(!payload.forceRefresh && !context.getters.shouldUpdate){
       return;
      }
      //change json you can see the button register a trainer
    const response=await fetch(`https://findyourtrainer-935e3-default-rtdb.firebaseio.com/coaches.json`);
    const responseData = await response.json();

    if(!response.ok){
//error
const error =new Error(responseData.message || "failed to fetch");
throw error;
         }  
         const coaches =[];
         for(const key in responseData ){
          const coach ={
             id:key,
             firstName:responseData[key].firstName,
            lastName:responseData[key].lastName,
            description :responseData[key].description,
            hourlyRate:responseData[key].hourlyRate,
            areas:responseData[key].areas
         };
         coaches.push(coach)
      }
      context.commit('setCoaches', coaches);
      context.commit('setFetchTimestamp');
  }
 };