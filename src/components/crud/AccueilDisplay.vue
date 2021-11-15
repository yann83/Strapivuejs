<template>
  <div>
    <!-- ############# AJOUTER / MODIFIER ############# -->

    <!-- Si boutonAjouMod est true on affiche le bouton Ajouter -->
    <div class="btn btn-outline-primary" v-if="boutonAjouMod" v-on:click="toggleAfficheAjouter('ajouter',null)">{{boutonAjouter}}</div><!-- je clique on lance la méthode toggleafficheAjouMod -->

    <!-- Si afficheAjouMod est true on affiche le formulaire d'ajout -->
    <form action="" class="mt-4" v-if="afficheAjouMod">
      <div class="form-group">
          <label for="title">Titre</label>
          <input v-model="titre" type="text" name="title" class="form-control" required />
      </div>      
      <div class="form-group">
          <label for="category">Catégorie</label>
          <select v-model="categorie" class="form-control" required>
          <option disabled value="">----</option>
          <option value="maison">maison</option> <!-- value doit être egal au contenu de category -->
          <option value="appartement">appartement</option>
          </select>
      </div>
      <div class="form-group">
          <label for="content">Commentaire</label>
          <textarea v-model="commentaire" cols="30" rows="10" class="form-control" required></textarea>
      </div>    
      <div class="form-group">
          <label for="picture">Image</label>
          <!-- v-model ne fonctionne pas il faut utiliser v-on:change -->          
          <input type="file" id="file" name="picture" ref="file" class="form-control" v-on:change="handleFileUpload"/>
          <br><img v-bind:src="completeImgUrl(image)" v-bind:alt="titre"><br>
      </div>           
      <input type="hidden">
      <button type="submit" class="btn btn-xs btn-primary mt-5" v-on:click.prevent="enregistreAjout">Enregistrer</button> 
      <!--<div class="btn btn-xs btn-primary" v-on:click="enregistreAjout">Enregistrer</div>-->
      <div class="btn btn-xs mt-5" v-on:click="toggleAfficheAjouter('ajouter',null)">Annuler</div>
    </form>

    <!-- ############# VOIR ############# -->

    <!-- Si afficheVue est true on affiche la vue -->
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

    <!-- Si afficheTableau est true on affiche le tableau -->
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
              <img v-if="annonce.picture" v-bind:src="completeImgUrl(annonce.picture.formats.thumbnail.url)" v-bind:alt="annonce.title"/>
              <img v-else src='../../assets/default.jpg' v-bind:alt="annonce.title"/>
            </td>
            <td>
              <div class="btn btn-sm btn-outline-success mt-5 ms-3 me-2" v-on:click="toggleAfficheAjouter('modifier',annonce.id)" v-bind:value=annonce.id>Modifier</div>
              <div class="btn btn-sm btn-outline-primary mt-5 me-2" v-on:click="toogleAfficheView(annonce.id)" v-bind:value=annonce.id>Voir</div>
              <div class="btn btn-sm btn-outline-danger mt-5" v-bind:value=annonce.id v-on:click.prevent="supprimerLigne(annonce.id)">Supprimer</div>
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

    // post files
    import FormData from 'form-data'

    export default {
        name: 'AccueilDisplay',
        data() { 
            return {
                //token jwt
                token: '',

                //variables Cacher/Voir les balises
                boutonAjouMod: true,
                afficheAjouMod: false,
                afficheVue: false,
                afficheTableau: true,
                boutonAjouter: 'Ajouter une annonce',
                toutesLesAnnonces: [],

                //upload image
                file: null,
                //isImage: false,
                //previewImage = '',

                //Voir / Ajouter
                titre: '',
                categorie: '',
                commentaire: '',
                image: ''
            }
        },
        methods: {
          toggleAfficheAjouter: function(boutonType,id){ //affiche / cache Ajouter
            this.afficheAjouMod=!this.afficheAjouMod //est égale au contraire de la valeur précente
            this.afficheTableau=!this.afficheTableau
            if (boutonType == 'ajouter') {
              this.boutonAjouter = 'Ajouter une annonce'
              this.titre = '' //on remet à vide
              this.categorie = ''
              this.commentaire = ''
              this.image = '../../assets/default.jpg' 
            }            
            if (boutonType == 'modifier' & this.afficheAjouMod === true) {
              this.boutonAjouter = 'Modifier une annonce'
              if (id) {
                const chercheObjet = this.toutesLesAnnonces.find(element => element.id === id) //on recherche l'objet par son id
                this.titre = chercheObjet['title']
                this.categorie = chercheObjet['category']
                this.commentaire = chercheObjet['content']
                this.image = chercheObjet['picture']['formats']['thumbnail']['url']                   
              }
            }           
          },        
          completeImgUrl: function(ImgLink){ //sert à ajouter l'url complete pour l'image
            return constantes.serveurapi + ImgLink
          },
          handleFileUpload: function(){ // recuperation de l'image
            this.file = this.$refs.file.files[0]
            //console.log(this.file)
            /*
            if (
              this.file.name.includes(".png") ||
              this.file.name.includes(".jpg")
            ) {
              this.isImage = true;
              this.previewImage = URL.createObjectURL(this.file);
            } else {
              this.isImage = false;
            }
            */
          },
          async enregistreAjout() {            
            try {
                await axios.post(`${constantes.serveurapi}/${constantes.collectionAnnonces}`, {
                    title: this.titre,
                    category: this.categorie,
                    content: this.commentaire
                  }, {  
                    headers : {
                      'content-type': 'application/json',
                      'Authorization': 'Bearer ' + this.token
                    }                     
                  })
                  .then((response) => {
                    let postId = response.data.id 
                    let formData = new FormData() // /!\ on doit importer Formdata sinon erreur 400 bad request
                    formData.append("files",this.file)  // quel est le fichier
                    formData.append("ref","annonce") // quel est la collection (sans le s à la fin)
                    formData.append("refId",postId)// quel est l'id
                    formData.append("field","picture")//quel est le champ          
                    axios.post(`${constantes.serveurapi}/upload`, 
                      formData
                      ,{
                        headers : {
                          'Authorization': 'Bearer ' + this.token
                        }                    
                      })
                      .then((uploadedFile) => { 
                        this.toutesLesAnnonces.push({id: postId,title: this.titre,category: this.categorie,content: this.commentaire,picture: uploadedFile.data[0]})
                        this.toggleAfficheAjouter()
                      })
                    })                    
              } catch(error) {
                  console.error(error)
              }
          },
          async supprimerLigne(index) {
            try {
                await axios.delete(`${constantes.serveurapi}/${constantes.collectionAnnonces}/${index}`, {
                  headers : {
                      'content-type': 'application/json',
                      'Authorization': 'Bearer ' + this.token
                    }
                })                
                const suppresionIndex = this.toutesLesAnnonces.findIndex( item => item.id === index )// recherche de l'index = index                
                this.toutesLesAnnonces.splice( suppresionIndex, 1 )// supression de l'objet
             } catch(error) {
                  console.error(error)
              }
          },      
          toogleAfficheView: function(id){ // affiche / cache Vue
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
        created() { // partie affichage du tableau lors création de l'affichage
          const getuser = getWithExpiry("user")
          this.token = JSON.parse(getuser).jwt
          axios.get(`${constantes.serveurapi}/${constantes.collectionAnnonces}` , { 
              headers : {
                  'content-type': 'application/json',
                  'Authorization': 'Bearer ' + this.token
              }
          })
          .then(reponse => {
            //console.log(reponse.data)
            for (const annonce of reponse.data) {
              this.toutesLesAnnonces.push(annonce)
            }
            //console.log('tableau',this.toutesLesAnnonces)
          })
          .catch(err=>{
             console.log(err)
          })
        }
    }

</script>
<style>

</style>