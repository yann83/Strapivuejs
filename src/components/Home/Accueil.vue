<template>
<div class="container mt-5">
    <h1>Accueil</h1>
    <div v-on:click="test()" class="btn btn-success">Ouvre la modale</div>
</div>
</template>

<script>
    import {retrieveJWTtoken} from '../global/Fonctions.js' //fonction globale

    export default {
        name: 'Accueil',
        data() { 
        },
        methods: {
            test: function(){
                console.log('test',retrieveJWTtoken())
            }
        }              
    }

</script>
<style>

</style>