<template>
      
<base-dialog :show ="!!error" title="An error occured">
<P>{{error}}</P>
</base-dialog>
      <section>
        <coach-filter @change-filter="setFilters"></coach-filter>
      </section>

      <section>

          <base-card>
          <div class="controls">
              <base-button mode="outline" @click="loadCoaches"> Refresh</base-button>
            
              <base-button v-if="!isCoach &&!isLoading" link to="/register">Register as Trainer</base-button>
          </div>
          <div v-if="isLoading">
           <base-spinner></base-spinner>
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
import BaseDialog from '../../components/UI/BaseDialog.vue';
export default{
 // components: { CoachItem, BaseButton ,CoachFilter},
 components: { CoachItem,CoachFilter, BaseDialog},
data(){
return{
            isLoading :false,
            error :null,
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
            return !this.isLoading && this.$store.getters['coaches/hasCoaches'];
        },
    },
    created(){
     this.loadCoaches();
    },
    methods:{
      setFilters(updatedFilters){
this.activeFilters=updatedFilters
      }, 
      async loadCoaches(){
        this.isLoading=true;
        try{
        await this.$store.dispatch('coaches/loadCoaches');
        }catch(error){ 
           this.error = error.message || "something went wrong!"
        }
        this.isLoading =false
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