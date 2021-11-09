<template>
    <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
        <div class="container-fluid">
            <router-link class="navbar-brand" to='/Accueil'>
                <img src="../../assets/logo.png" alt="" width="30" height="24" class="d-inline-block align-text-top">{{titre}}
            </router-link>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                    <li class="nav-item">
                        <router-link class="nav-link" to='/Page1'>{{lien1}}</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link class="nav-link" to='/Page2'>{{lien2}}</router-link>    
                    </li>               
                </ul>
                <span class="navbar-text px-2">
                    <router-link class="nav-link" to='/Utilisateur'>{{utilisateur}}</router-link>
                </span>            
                <form class="d-flex">
                    <!-- Bouton de deconnexion -->
                    <button class="btn btn-outline-light my-2 my-sm-0" v-on:click="logoutBouton" type="submit">{{logout}}</button>
                </form>
            </div>
        </div>
    </nav>
</template>

<script>
    //valeurs globales
    import constantes from'../global/constantes' 

    //appel d'une fonction globale
    import {getWithExpiry} from '../global/Fonctions.js' 

    //gestion des API
    import axios from 'axios'

    export default {
        name: 'Entete',
        data() { 
            return {
                titre: 'Mon app VueJS',
                lien1: 'Page1',
                lien2: 'Page2',
                utilisateur: 'Ma Page',
                logout: 'Se deconnecter'
            }
        },
        methods : {
            logoutBouton: function() { // fonction de deconnexion
                localStorage.removeItem("user")
                this.$router.push('/')
            },
        },
        mounted(){//quand notre composant sera affiché
            const getuser = getWithExpiry("user")
            const token = JSON.parse(getuser).jwt
            axios.get(`${constantes.serveurapi}/users/me` , { 
                headers : {
                    'content-type': 'application/json',
                    'Authorization': 'Bearer ' + token
                }
                
            })
            .then(reponse => {
                this.utilisateur = reponse.data.username // on cherche à obtenir le username
            })
            .catch(err=>{
                console.log(err)
            })
        }
    }

</script>
<style>

</style>