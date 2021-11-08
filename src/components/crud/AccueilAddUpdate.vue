<template>
    <form action="" class="mt-4">
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
        <button class="btn btn-xs">Annuler</button>
    </form>
</template>

<script>

    export default {
        name: 'AccueilAddUpdate',
        data() { 
            return {
                
            }
        },
        methods: {

        }
    }

</script>
<style>

</style>