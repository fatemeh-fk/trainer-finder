<template>
    <li>

        <h3>{{ fullName}}</h3>
        <h4>${{rate}}/hour</h4>
        <div>
         <span v-for="area in areas" :key="area">{{area}}</span>

        </div>
        <div calass="actions">

            <router-link to ="/trainers/c1/contact">Contact</router-link>
        </div>
    </li>
</template>