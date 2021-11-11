<template>
  <div>
    <!-- ############# AJOUTER / MODIFIER ############# -->
    <div class="btn btn-outline-primary" v-if="boutonAjouMod" v-on:click="toggleAfficheAjouter">{{boutonAjouter}}</div><!-- je clique on lance la méthode toggleafficheAjouMod -->
    <form action="" class="mt-4" v-if="afficheAjouMod"><!-- Si afficheAjouMod est true on l'affiche -->
      <div class="form-group">
          <label for="title">Titre</label>
          <input type="text" name="title" class="form-control" required />
      </div>      
      <div class="form-group">
          <label for="category">Catégorie</label>
          <select class="form-control" required>
          <option selected>----</option>
          <option value="job">maison</option>
          <option value="rent">appartement</option>
          </select>
      </div>
      <div class="form-group">
          <label for="content">Commentaire</label>
          <textarea cols="30" rows="10" class="form-control" required></textarea>
      </div>    
      <div class="form-group">
          <label for="picture">Image</label>          
          <input type="file" name="picture" class="form-control"/>
          <br><img src="../../assets/default.jpg" alt=""><br>
      </div>           
      <input type="hidden">
      <div class="btn btn-xs btn-primary">Enregistrer</div>
      <div  class="btn btn-xs" v-on:click="toggleAfficheAjouter">Annuler</div>
    </form>

    <!-- ############# VOIR ############# -->
    <div v-if="afficheVue">
      <h3>{{titre}}</h3>
      <br>
      <label for="category">Type : {{categorie}}</label>
      <br>
      <label for="content">{{commentaire}}</label>
      <br>
      <label for="picture"><img v-bind:src="completeImgUrl(image)" v-bind:alt="titre"/></label>
      <br>
      <div class="btn btn-xs btn-primary mt-2" v-on:click="toogleAfficheView">Retour</div> 
    </div>   

    <!-- ############# TABLEAU ############# -->
    <div  v-if="afficheTableau">
      <h1 class="text-center">Annonces</h1>
      <!--barre de recherche-->
      <input type="search" class="form-control" placeholder="Rechercher par titre" />

      <!-- Affichage du tableau -->
      <table class="table table-bordered">
        <thead class="thead-light">
          <tr>
            <th scope="col">Titre</th>
            <th scope="col">Catégorie</th>
            <th scope="col">Commentaire</th>
            <th scope="col">Image</th>
          </tr>
        </thead>
        <tbody>
          <!-- Debut affichage tableau dynamique -->
          <tr v-bind:key="index" v-for="(annonce,index) in toutesLesAnnonces" > <!-- Index obligatoire pour boucle for -->
            <td>{{annonce.title}}</td>
            <td>{{annonce.category}}</td>
            <td>{{annonce.content}}</td>                            
            <td>
              <img v-bind:src="completeImgUrl(annonce.picture.formats.thumbnail.url)" v-bind:alt="annonce.title"/>
            </td>
            <td>
              <div class="btn btn-sm btn-outline-success mt-5 ms-3 me-2" v-bind:value=annonce.id>Modifier</div>
              <div class="btn btn-sm btn-outline-primary mt-5 me-2" v-on:click="toogleAfficheView(annonce.id)" v-bind:value=annonce.id>Voir</div>
              <div class="btn btn-sm btn-outline-danger mt-5" v-bind:value=annonce.id>Supprimer</div>
            </td>
          </tr>
          <!-- Fin affichage tableau dynamique -->
        </tbody>
      </table>
    </div>  
  </div>
</template>

<script>
    //valeurs globales
    import constantes from'../global/constantes' 

    //appel d'une fonction globale
    import {getWithExpiry} from '../global/Fonctions.js' 

    //gestion des API
    import axios from 'axios'

    export default {
        name: 'AccueilDisplay',
        data() { 
            return {
                //variables Cacher/Voir les balises
                boutonAjouMod: true,
                afficheAjouMod: false,
                afficheVue: false,
                afficheTableau: true,
                boutonAjouter: 'Ajouter une annonce',
                toutesLesAnnonces: [],

                //Voir
                titre: '',
                categorie: '',
                commentaire: '',
                image: ''
            }
        },
        methods: {
          toggleAfficheAjouter: function(){
            this.afficheAjouMod=!this.afficheAjouMod //est égale au contraire de la valeur précente
            this.afficheTableau=!this.afficheTableau
          },          
          completeImgUrl: function(ImgLink){ //sert à ajouter l'url complete pour l'image
            return constantes.serveurapi + ImgLink
          },
          toogleAfficheView: function(id){
            this.afficheTableau=!this.afficheTableau
            this.afficheVue=!this.afficheVue
            if (!this.afficheTableau) {   // si on desactive le tableau alors on affiche la vue  
              this.boutonAjouMod = !this.boutonAjouMod   // on vire le boutron ajouter      
              const chercheObjet = this.toutesLesAnnonces.find(element => element.id === id) //on recherche l'objet par son id
              this.titre = chercheObjet['title']
              this.categorie = chercheObjet['category']
              this.commentaire = chercheObjet['content']
              this.image = chercheObjet['picture']['formats']['thumbnail']['url']              
            } else {
              this.boutonAjouMod = !this.boutonAjouMod //sinon on affiche le tableau et on remet le bouton ajouter
            }
          }
        },
        created() { // partie affichage du tableau
          const getuser = getWithExpiry("user")
          const token = JSON.parse(getuser).jwt
          axios.get(`${constantes.serveurapi}/${constantes.collectionAnnonces}` , { 
              headers : {
                  'content-type': 'application/json',
                  'Authorization': 'Bearer ' + token
              }
          })
          .then(reponse => {
            //console.log(reponse.data)
            for (const annonce of reponse.data) {
              this.toutesLesAnnonces.push(annonce)
            }
          })
          .catch(err=>{
             console.log(err)
          })
        }
    }

</script>
<style>

</style>