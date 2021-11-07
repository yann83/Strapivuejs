//------- setWithExpiry -------
export const setWithExpiry = function(key, value, ttl) {
    const now = new Date()

    // `item` est un objet qui contient la valeur original
    // et le temps limite pour l'expiration
    const item = {
        value: value,
        expiry: now.getTime() + ttl,
    }
    localStorage.setItem(key, JSON.stringify(item))
}

//------- retrieveJWTtoken -------
export const retrieveJWTtoken = function() {
    const userFromLocalStorage = getWithExpiry("user");
    //console.log(userFromLocalStorage);
    if (userFromLocalStorage) { //si user existe dans le storage local
        const user = JSON.parse(userFromLocalStorage);
        if (user.jwt != null) { //et que le jeton existe aussi
            return {status: "authenticated",msg: "connexion réussie", token: user.jwt};
        }        
    }
    return { status: "anonymous",msg: "merci de vous connecter", token: null};
}

//------- getWithExpiry -------
export const getWithExpiry = function(key) {
    const itemStr = localStorage.getItem(key)
    // si l'objet item n'existe pas alors return null
    if (!itemStr) {
        return null
    }
    const item = JSON.parse(itemStr)
    const now = new Date()
    // comparaison de la date d'expiration avec la date actuelle
    if (now.getTime() > item.expiry) {
        // Si Item expire on supprime key et return null
        localStorage.removeItem(key)
        return null
    }
    return item.value
}

