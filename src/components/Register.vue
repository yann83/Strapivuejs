<template>
    <div class="container-fluid vh-100" style="margin-top:100px">
        <div class="" style="margin-top:100px">
            <div class="rounded d-flex justify-content-center">
                <div class="col-md-4 col-sm-12 shadow-lg p-5 bg-light">
                    <div class="text-center">
                        <h3 class="text-primary">S'enregistrer</h3>
                        <img src="../assets/logo.png" class="img-fluid rounded center" style="width: 20%" alt="logo"> 
                    </div>
                    <!-- Si erreur est vraie alors on affiche le message -->
                    <p v-if="error" class="text-center text-danger">{{ errorMsg }}</p>
                    <form action="">
                        <div class="p-4">
                            <div class="input-group mb-3">                           
                                <input v-model="username" name="username" id="username" type="text" class="form-control" placeholder="Nom d'utilisateur">
                            </div>   
                            <div class="input-group mb-3">  
                                <!-- v-model pour créer une liaison de données bidirectionnelle sur la valeur email -->                          
                                <input v-model="email" name="email" id="email" type="email" class="form-control" placeholder="Email">
                            </div>                                                      
                            <div class="input-group mb-3">
                                <input v-model="password" name="password" id="password" type="password" class="form-control" placeholder="Mot de passe">
                            </div>
                            <div class="text-center">
                                <!-- lors du click on passe la fonction login et on .prevent empêche de recharger la page -->
                                <button v-on:click.prevent="register" class="btn btn-primary mt-2">Validation</button>
                            </div>
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

    export default {
        name: 'Register',
        data() {
                return {
                    username: '',
                    email: '',
                    password: '',                    
                    error: false,
                    errorMsg: `Une erreur est survenue, merci de recommencer`
                }
            },
            methods: {
                async register() {
                    try {
                        await axios.post(`${constantes.serveurapi}/auth/local/register`, {
                        username: this.username,
                        password: this.password,
                        email: this.email                        
                        })
                        this.$router.push('/')
                    } catch(e) {
                        this.error = true
                        this.email = ''
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