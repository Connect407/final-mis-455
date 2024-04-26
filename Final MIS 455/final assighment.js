// Add your JavaScript code here
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const mealResults = document.getElementById('mealResults');
const showAllBtn = document.getElementById('showAllBtn');

const API_URL = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';

searchBtn.addEventListener('click', () => {
    const searchTerm = searchInput.value.trim();
    if (searchTerm !== '') {
        fetchMeals(searchTerm);
    }
});

async function fetchMeals(searchTerm) {
    try {
        const response = await fetch(`${API_URL}${searchTerm}`);
        const data = await response.json();
        displayMeals(data.meals);
    } catch (error) {
        console.error('Error fetching meals:', error);
    }
}

function displayMeals(meals) {
    mealResults.innerHTML = '';
    if (meals) {
        const displayedMeals = meals.slice(0, 5);
        displayedMeals.forEach(meal => {
            const mealCard = createMealCard(meal);
            mealResults.appendChild(mealCard);
        });
        if (meals.length > 5) {
            showAllBtn.style.display = 'block';
            showAllBtn.addEventListener('click', () => {
                mealResults.innerHTML = '';
                meals.forEach(meal => {
                    const mealCard = createMealCard(meal);
                    mealResults.appendChild(mealCard);
                });
                showAllBtn.style.display = 'none';
            });
        } else {
            showAllBtn.style.display = 'none';
        }
    } else {
        mealResults.innerHTML = '<p>No meals found.</p>';
    }
}

function createMealCard(meal) {
    const mealCard = document.createElement('div');
    mealCard.classList.add('meal-card');

    const mealImage = document.createElement('img');
    mealImage.src = meal.strMealThumb;
    mealCard.appendChild(mealImage);

    const mealInfo = document.createElement('div');
    mealInfo.classList.add('meal-info');
    const mealName = document.createElement('h3');
    mealName.textContent = meal.strMeal;
    mealInfo.appendChild(mealName);

    const mealId = document.createElement('p');
    mealId.textContent = `ID: ${meal.idMeal}`;
    mealInfo.appendChild(mealId);

    const mealInstructions = document.createElement('p');
    mealInstructions.textContent = meal.strInstructions.substring(0, 100) + '...';
    mealInfo.appendChild(mealInstructions);

    mealCard.appendChild(mealInfo);

    return mealCard;
}
