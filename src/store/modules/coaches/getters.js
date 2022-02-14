export default {

    coaches(state){

        return state.coaches;
    },
    hasCoaches(state){
        return state.coaches && state.coaches.length > 0;
    },
    isCoach(_,getters,_2,rootGatter){
        const coaches=getters.coaches;
        const userId=rootGatter.userId;
        return coaches.some(coach => coach.id ===userId)
    }
};