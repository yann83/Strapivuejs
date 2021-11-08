<template>
      <div>
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
</template>

<script>

    export default {
        name: 'AccueilDisplay'
    }

</script>
<style>

</style>