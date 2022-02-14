<template>
      

      <section>
        <coach-filter @change-filter="setFilters"></coach-filter>
      </section>

      <section>

          <base-card>
          <div class="controls">
              <base-button mode="outline">Refresh</base-button>
            
              <base-button v-if="!isCoach" link to="/register">Register as Trainer</base-button>
          </div>
          <ul v-if="hasCoaches"> 
              <coach-item v-for="coach in filteredCoaches" 
              :key="coach.id"
              :id="coach.id"
              :first-name="coach.firstName"
              :last-name="coach.lastName"
              :rate="coach.hourlyRate"
              :areas="coach.areas"
              
              
              ></coach-item>
              
              </ul>
        <h3 v-else>no trainer found.</h3>
          </base-card>
      </section>


</template>

<script>
import CoachItem from '../../components/Coaches/CoachItem.vue';
//import BaseButton from '../../components/UI/BaseButton.vue';

import CoachFilter from '../../components/Coaches/CoachFilter.vue';
export default{
 // components: { CoachItem, BaseButton ,CoachFilter},
 components: { CoachItem,CoachFilter},
data(){
return{
  activeFilters:{
               soccer :true,
                zumba :true,
                fitness:true,
  }
}
},
    computed:{

       
        isCoach(){
            return this.$store.getters['coaches/isCoach'];
      
        },
        filteredCoaches(){
           const coaches= this.$store.getters['coaches/coaches'];
           return coaches.filter(coach =>{
             if(this.activeFilters.zumba && coach.areas.includes ('zumba')){
             return true;
             }
             if(this.activeFilters.fitness && coach.areas.includes('fitness')){
             return true;
             }
             if(this.activeFilters.soccer && coach.areas.includes('soccer')){
             return true;
             }
             return false;
           });
        },
        hasCoaches(){
            return this.$store.getters['coaches/hasCoaches'];
        },
    },
    methods:{
      setFilters(updatedFilters){
this.activeFilters=updatedFilters
      }

    }
};
</script>
<style scoped>
ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

.controls {
  display: flex;
  justify-content: space-between;
}
</style>