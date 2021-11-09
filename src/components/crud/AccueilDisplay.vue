<template>
  <div>
    <!-- ############# AJOUTER / MODIFIER ############# -->
    <div class="btn btn-outline-primary" v-on:click="toggleafficheAjouMod">Ajouter une annonce</div><!-- je clique on lance la méthode toggleafficheAjouMod -->
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
      <button class="btn btn-xs btn-primary">Enregistrer</button>
      <div  class="btn btn-xs" v-on:click="toggleafficheAjouMod">Annuler</div>
    </form>

    <!-- ############# VOIR ############# -->
    <div v-if="afficheVue">
      <h3>Titre</h3>
      <br>
      <label for="category">Catégorie</label>
      <br>
      <label for="content">Commentaire</label>
      <br>
      <label for="picture">Image</label>
      <br>
      <div class="btn btn-xs btn-primary">Retour</div> 
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
        </tbody>
      </table>
    </div>  
  </div>
</template>

<script>

    export default {
        name: 'AccueilDisplay',
        data() { 
            return {
                //variables Cacher/Voir les balises
                afficheAjouMod: false,
                afficheVue: false,
                afficheTableau: true
            }
        },
        methods: {
          toggleafficheAjouMod: function(){
              this.afficheAjouMod=!this.afficheAjouMod //est égale au contraire de la valeur précente
              this.afficheTableau=!this.afficheTableau
          }
        }
    }

</script>
<style>

</style>