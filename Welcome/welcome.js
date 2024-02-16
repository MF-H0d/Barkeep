let ingredient = ''
const userInput = document.getElementById('user-input');
const drinkBtn = document.getElementById('drinkBtn');
drinkBtn.addEventListener('click', fetchDrink);
const drinkImg = document.getElementById('drinkImg');
const drinkName = document.getElementById('drinkName');




async function fetchDrink(){
    try{
        ingredient = userInput.value;
        const PATH = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingredient}`;
        let response = await fetch(PATH);
        let data = await response.json();
        let index = Math.floor(Math.random() * data.drinks.length)
        displayDrink(data.drinks[index])
        console.log(data.drinks[index])
    }catch(error){
        console.error('Error fetching drink', error);
    }
}

function displayDrink(drink){
    let img = document.createElement('img');
    img.src = drink.strDrinkThumb;
    img.alt = 'drink image';
    img.width = 300;
    img.height = 300;
    drinkName.textContent = drink.strDrink;
    drinkImg.appendChild(img);
    let italianaInstructions = document.querySelector('.italiana-instructions');

    if (italianaInstructions) {
        italianaInstructions.classList.add('hidden');
    }
    tellMeMore()
}

function tellMeMore(){
    drinkBtn.disabled = true;
    let newButton = document.createElement('button');
        newButton.textContent = 'Tell me more';
        newButton.classList.add('italiana-button');
        newButton.id = 'tellMeMore'
        document.querySelector('.button-container').appendChild(newButton);
}

let tellmeMoreBtn = document.getElementById('tellMeMore');

tellmeMoreBtn.addEventListener('click', function(){
    window.location.src = '/bartender/Game/bartender.html'
})
