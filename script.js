const searchBtn = document.querySelector('.searchBtn');
const searchBox = document.querySelector('.searchBox');
const main = document.querySelector('.container');
const recipeContent = document.querySelector('.recipe-content');
const closebtn = document.querySelector('.closebtn');

const getRecipies = async (query) => {
    main.innerHTML = "<h2>Fetching Recipies...</h2>"
    const data = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
    const response = await data.json();
    //console.log(response);
    main.innerHTML = "";
    response.meals.forEach(meal => {
    const recipeDiv = document.createElement('div');
    recipeDiv.classList.add('recipe');
    recipeDiv.innerHTML = `<img src = "${meal.strMealThumb}">
    <h3>${meal.strMeal}</h3>
    <p>${meal.strArea} dish</p>
    <p> Belongs to ${meal.strCategory}.</p>
    `
    const view = document.createElement("view");
    view.textContent = "View Recipe";
    recipeDiv.appendChild(view);

    //pop-up of recipe
    view.addEventListener('click', () => {
        openRecipePopup(meal);
    })
    recipeDiv.addEventListener('click', () => {
        openRecipePopup(meal);
    })
    recipeContent.addEventListener('click', closebtn);
    
    main.appendChild(recipeDiv);
   });
}

const fetchIngredients = (meal) => {
    let ingredientList = "";
    for (let i=1; i<=20; i++){
        const ingredients = meal[`strIngredient${i}`];
        if(ingredients){
            const measure = meal[`strMeasure${i}`];
            ingredientList += `<li>${measure} ${ingredients}</li>`
        }
        else{
            break;
        }
    }
    return ingredientList;
}

const openRecipePopup = (meal) => {
    recipeContent.innerHTML = `
    <h2 class="recipename">${meal.strMeal}</h2>
    <h3>Ingredients: </h3>
    <ul class="ingredientList">${fetchIngredients(meal)}</ul>
    <br>
    <div>
    <h3>Instructions: </h3>
    <br>
    <p class="recipeInstr">${meal.strInstructions}</p>
    </div>
    `
    main.classList.add('blur');
    recipeContent.parentElement.style.display = "block";
}

searchBtn.addEventListener('click', (e)=>{
    e.preventDefault();
    const searchInput = searchBox.value.trim();
    if(!searchInput){
        main.innerHTML = `<h2>Type meal in search box.</h2>`;
        return ;
    }
    getRecipies(searchInput);
    //console.log("Button Clicked")
});

closebtn.addEventListener('click', () => {
    recipeContent.parentElement.style.display="none";
    main.classList.remove('blur');
});