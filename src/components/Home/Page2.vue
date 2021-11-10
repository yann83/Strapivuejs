<template>
    <div>
        <entete></entete><!-- Affichage Entete.vue -->
         <h1>Page 2</h1>
        <div class="container mt-5">            
               
        </div>
   </div> 
</template>

<script>
    // partie en tête
    import Entete from './Entete'

    export default {
        name: 'Page2',
        data() { 
            return {
                
            }
        },
        components: {
            'entete': Entete // declaration de Entete.vue
       
        },
     } 

</script>
<style>

</style>