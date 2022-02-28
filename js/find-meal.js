const searchFood = () => {
  const serachField = document.getElementById('search-field');
  const searchText = serachField.value;
  serachField.value = '';
  const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchText}`;
  console.log(url);

  fetch(url)
    .then(res => res.json())
    .then(data => displaySearchResult(data.meals));
}


const displaySearchResult = meals => {
  const searchResult = document.getElementById('search-result')
  searchResult.textContent = '';

  meals.forEach(meal => {
    // console.log(meal);
    const div = document.createElement('div');
    div.classList.add('col');
    div.innerHTML = `
      <div onclick="loadMealDetail(${meal.idMeal})" class="card">
        <img src="${meal.strMealThumb}" class="card-img-top" alt="${meal.strMeal}" />
        <div class="card-body">
          <h5 class="card-title">${meal.strMeal}</h5>
          <p class="card-text">Category: ${meal.strTags}</p>
        </div>
         <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
        View Details
      </button>
      </div>
     
    `;
    searchResult.appendChild(div);
  })
}

const loadMealDetail = mealId => {
  console.log(mealId);
  const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`;
  fetch(url)
    .then(res => res.json())
    .then(data => displayMealDetails(data.meals[0]))
}

const displayMealDetails = meal => {
  console.log(meal);
  const mealDetails = document.getElementById('meal-details');
  mealDetails.textContent = '';
  const mealContainer = document.createElement('div');
  mealContainer.classList.add('modal-content');
  mealContainer.innerHTML = `
    <div class="modal-header">
      <h5 class="modal-title" id="exampleModalLabel">${meal.strMeal}</h5>
    </div>
    <img src="${meal.strMealThumb}" class="card-img-top" alt="${meal.strMeal}" />
    <div class="modal-body">
        <p class="card-text"><strong>How to prepare ${meal.strMeal}</strong>: ${meal.strInstructions}</p>
        <a href="${meal.strYoutube}" target="_blank">Watch on Youtube</a>
    </div>
    <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
    </div>
  `;
  mealDetails.appendChild(mealContainer);
}

