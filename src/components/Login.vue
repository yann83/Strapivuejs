<template>
    <div class="container-fluid vh-100" style="margin-top:100px">
        <div class="" style="margin-top:100px">
            <div class="rounded d-flex justify-content-center">
                <div class="col-md-4 col-sm-12 shadow-lg p-5 bg-light">
                    <div class="text-center">
                        <h3 class="text-primary">Mon application Vue Js</h3>
                        <img src="../assets/logo.png" class="img-fluid rounded center" style="width: 20%" alt="logo"> 
                    </div>
                    <!-- Si erreur est vraie alors on affiche le message -->
                    <p v-if="error" class="text-center text-danger">{{ errorMsg }}</p>
                    <form action="">
                        <div class="p-4">
                            <div class="input-group mb-3">
                                <!-- v-model pour créer une liaison de données bidirectionnelle sur la valeur email -->                                
                                <input v-model="email" name="email" id="email" type="email" class="form-control" placeholder="Email">
                            </div>
                            <div class="input-group mb-3">
                                <input v-model="password" name="password" id="password" type="password" class="form-control" placeholder="Mot de passe">
                            </div>
                            <div class="form-check">
                                <!-- vérification de checked false/true noncochée/cochée -->
                                <input v-model="checked" class="form-check-input" type="checkbox" value="" id="checkbox">
                                <label class="form-check-label" for="checkbox">
                                    Se souvenir de moi
                                </label>
                            </div>
                            <div class="text-center">
                                <!-- lors du click on passe la fonction login et on .prevent empêche de recharger la page -->
                                <button v-on:click.prevent="login" class="btn btn-primary mt-2">Se connecter</button>
                            </div>
                            <p class="text-center mt-3">Pas de compte?
                                <span class="text-primary">
                                    <!-- lien vers la page register -->
                                    <router-link class="text-decoration-none" to='/Register'>S'enregistrer</router-link>
                                </span>
                            </p>
                            <p class="text-center text-primary">
                                <router-link class="text-decoration-none" to='/Recover'>Mot de passe oublié?</router-link>
                            </p>
                            <p class="text-center mt-3">Avec Strapi 3.6.8 et VueJS 2</p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>



<script>
    import constantes from'./global/constantes' //valeurs globales
    import axios from 'axios'

    import {setWithExpiry} from './global/Fonctions.js' //appel d'une fonction globale

    export default {
        name: 'Login',
        data() {
            return {
                email: '',
                password: '',
                error: false,
                errorMsg: `Une erreur est survenue, merci de recommencer`,
                checked: false // pour checkbox
            }
        },
        methods: {
            async login() { // async renvoie une promesse
                try {
                    //console.log('check',this.checked)
                    // await met en pause en attendant la réponse du serveur
                    const res = await axios.post(`${constantes.serveurapi}/auth/local`, {
                        identifier: this.email,
                        password: this.password                        
                    });
                    if (this.checked) {
                        //console.log('24h') 
                        setWithExpiry("user", JSON.stringify(res.data), 864000000) //24h
                    } else {
                        //console.log('1h') 
                        setWithExpiry("user", JSON.stringify(res.data), 3600000) //1h
                    }                                        
                    /*const { jwt, user } = res.data
                    window.localStorage.setItem('jwt', jwt)
                    window.localStorage.setItem('userData', JSON.stringify(user))*/
                    this.$router.push('/Accueil')
                } catch(error) {
                    console.log('test',error)
                    this.error = true
                    this.password = ''
                }
            }
        }
    }

</script>
<style>
.background {
  /* fallback for old browsers */
  background: #6a11cb;

  /* Chrome 10-25, Safari 5.1-6 */
  background: -webkit-linear-gradient(to right, rgba(106, 17, 203, 1), rgba(37, 117, 252, 1));

  /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
  background: linear-gradient(to right, rgba(106, 17, 203, 1), rgba(37, 117, 252, 1))
}
</style>