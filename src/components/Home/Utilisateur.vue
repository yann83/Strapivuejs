<template>
    <entete></entete><!-- Affichage Entete.vue -->
    
</template>

<script>
    import Entete from './Entete' // importation du composant Entete.vue

    export default {
        name: 'Utilisateur',
        data() { 
            return {
                
            }
        },
        components: {
            'entete': Entete // declaration de Entete.vue
        },
        methods: {

        }
    }  

</script>
<style>

</style>