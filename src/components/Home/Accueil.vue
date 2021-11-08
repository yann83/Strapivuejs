<template>
    <div>    
        <entete></entete><!-- Affichage Entete.vue -->
        <div class="container mt-5">
            <div class="btn btn-outline-primary" v-on:click="afficheAjouter">Ajouter une annonce</div>
            <accueiladdupdate v-if="afficheAccueilAddUpdate"></accueiladdupdate>
            <accueilview></accueilview>
            <accueildisplay></accueildisplay>
        </div>
    </div>
</template>

<script>
    import Entete from './Entete' // importation du composant Entete.vue

    //partie crud
    import AccueilAddUpdate from '../crud/AccueilAddUpdate'
    import AccueilView from '../crud/AccueilView'    
    import AccueilDisplay from '../crud/AccueilDisplay' 

    //import {retrieveJWTtoken,getWithExpiry} from '../global/Fonctions.js' //appel d'une fonction globale

    export default {
        name: 'Accueil',
        data() { 
            return {
                afficheAccueilAddUpdate: false
            }
        },
        components: {
            'entete': Entete, // declaration de Entete.vue
            'accueiladdupdate' : AccueilAddUpdate,
            'accueilview' : AccueilView,
            'accueildisplay' :AccueilDisplay            
        },
        methods: {
            afficheAjouter: function(){
                this.afficheAccueilAddUpdate=true
            }
        },
        /*created() { // affichage du rendu
            const resultat = retrieveJWTtoken() // si l'utilisateur est anonyme on le vire
            if (resultat.status === "anonymous") {
                this.$router.push('/')
            }
        },
        beforeUpdate() { //avant la mise jour du contenu
            const resultat = getWithExpiry("user") // si le temps expire on vire l'utilisateur connecté
            if (!resultat) {
                this.$router.push('/')
            }
        }*/
    }  

</script>
<style>

</style>