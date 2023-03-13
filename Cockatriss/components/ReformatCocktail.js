export default ReformatCocktail= (data) => {
    const ingredients = [];
    for(let i = 1; i <= 15; i++){
        const idIngredient = `strIngredient${i}`;
        const idQuantity = `strMeasure${i}`;
        if(data[idIngredient]){
            ingredients.push({name: data[idIngredient], quantity: data[idQuantity]});
        }
    }

    return {
        id: data.idDrink,
        name: data.strDrink,
        image: data.strDrinkThumb,
        ingredients: ingredients,
        instructions: data.strInstructions
    }
}