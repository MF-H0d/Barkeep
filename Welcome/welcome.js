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
    }catch(error){
        console.error('Error fetching drink', error);
        alert("We couldn't find that ingredient, try something else");
        userInput.value = ''
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
    userInput.disabled = true;
    //turn fetch button into reset button
    drinkBtn.textContent = 'Start Over'
    drinkBtn.removeEventListener('click', fetchDrink)
    drinkBtn.addEventListener('click', refresh)

    // generate 'tell me more' button
    let newButton = document.createElement('button');
        newButton.textContent = 'Tell me more';
        newButton.classList.add('italiana-button');
        newButton.id = 'tellMeMore'
        document.querySelector('.button-container').appendChild(newButton);

        document.getElementById('tellMeMore').addEventListener('click', function(event) {
            if (event.target.id === 'tellMeMore') {
                window.location.href = '/bartender/game/bartender.html';
            }
        })
}

function refresh(){
    //user clicks 'start over' and goes back to start
    window.location.reload();
    userInput.value = ''
}

// document.getElementById('tellMeMore').addEventListener('click', () => {
//     window.location.href = '/bartender/game/bartender.html';
// })