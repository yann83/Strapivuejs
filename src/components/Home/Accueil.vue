<template>
    <div>    
        <entete></entete><!-- Affichage Entete.vue -->
        <div class="container mt-5">            
             <accueildisplay></accueildisplay>
        </div>
    </div>
</template>

<script>
    // partie en tête
    import Entete from './Entete'

    //partie crud
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
            'accueildisplay' :AccueilDisplay            
        },
        methods: {

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