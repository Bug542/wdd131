// Recipe data for the Recipe Book Part 2 assignment.
const recipes = [
  {
    name: 'Sweet Potato Waffles',
    tags: ['Waffles', 'Sweet Potato', 'Side'],
    description: 'Savory waffles made with sweet potato with a hint of ginger.',
    image: 'https://wddbyui.github.io/wdd131/images/recipe2/sweet-potato-waffle-md.jpg',
    rating: 4
  },
  {
    name: 'Escalope de Poulet a la Creme with steamed green beans (Chicken with Cream)',
    tags: ['Chicken', 'Entree'],
    description: 'Delicious quick and easy creamy rice dish. The mustard, mushrooms, and lemon all blend together wonderfully.',
    image: 'https://wddbyui.github.io/wdd131/images/recipe2/escalopes-de-poulet-a-la-creme.webp',
    rating: 4.5
  },
  {
    name: 'Oven Roasted potato slices',
    tags: ['Potatoes', 'Side'],
    description: 'Easy and delicious oven roasted potatoes that go great with almost anything.',
    image: 'https://wddbyui.github.io/wdd131/images/recipe2/roasted-potatoes.webp',
    rating: 4
  },
  {
    name: 'Black Beans and Rice',
    tags: ['Southwest', 'Entree'],
    description: 'Black beans and tomatoes served over a bed of rice. Top with cheese and scoop up with tortilla chips for maximum enjoyment.',
    image: 'https://wddbyui.github.io/wdd131/images/recipe2/black-beans-and-rice.jpg',
    rating: 3
  },
  {
    name: 'Chicken Curry',
    tags: ['Chicken', 'Entree', 'Indian'],
    description: 'Quick and easy Chicken curry recipe made with easy to find ingredients.',
    image: 'https://wddbyui.github.io/wdd131/images/recipe2/chicken-curry.webp',
    rating: 5
  },
  {
    name: 'Chocolate Chip Cookies',
    tags: ['Dessert'],
    description: 'Delicious soft chocolate chip cookies with coconut.',
    image: 'https://wddbyui.github.io/wdd131/images/recipe2/chocolate-chip-cookies.jpg',
    rating: 5
  },
  {
    name: 'Gooseberry cake with vanilla cream and crumble',
    tags: ['Dessert', 'German'],
    description: "This gooseberry cake with crumble is easy to follow, a bit tart and not too sweet. Made up of a cake base, filled with fresh gooseberries and vanilla cream and finished off with vanilla-flavored crumble.",
    image: 'https://wddbyui.github.io/wdd131/images/recipe2/german-gooseberry-cake.jpg',
    rating: 5
  },
  {
    name: 'Apple Crisp',
    tags: ['Dessert'],
    description: "This apple crisp recipe is a simple yet delicious fall dessert that's great served warm with vanilla ice cream.",
    image: './images/apple-crisp.jpg',
    rating: 4
  }
];

// Create the category labels for a recipe.
function tagsTemplate(tags) {
  return '<div class="categories" aria-label="Recipe categories">' +
    tags.map((tag) => '<span class="category">' + tag + '</span>').join('') +
    '</div>';
}

// Create five visual stars, including partial stars for half-point ratings.
function ratingTemplate(rating) {
  const stars = Array.from({ length: 5 }, (_, index) => {
    const fill = Math.max(0, Math.min(1, rating - index)) * 100;
    return '<span class="rating-star" style="--fill:' + fill + '%">★</span>';
  }).join('');

  return '<span class="rating" role="img" aria-label="Rating: ' +
    rating + ' out of 5 stars"><span aria-hidden="true">' +
    stars + '</span></span>';
}

// Turn one recipe object into a complete recipe card.
function recipeTemplate(recipe) {
  return `
    <article class="recipe">
      <img class="recipe-photo" src="${recipe.image}" alt="${recipe.name}"
        width="750" height="563" loading="lazy">
      <div class="recipe-info">
        ${tagsTemplate(recipe.tags)}
        <h2>${recipe.name}</h2>
        ${ratingTemplate(recipe.rating)}
        <p class="description">${recipe.description}</p>
      </div>
    </article>
  `;
}

// Display one or more recipes in the existing page.
function renderRecipes(recipeList) {
  const container = document.querySelector('#recipe-list');

  if (recipeList.length === 0) {
    container.innerHTML = '<p class="no-results">No recipes found. Try another search.</p>';
    return;
  }

  container.innerHTML = recipeList.map(recipeTemplate).join('');
}

// Search names, descriptions, and tags, then sort matches alphabetically.
function filterRecipes(query) {
  const keyword = query.trim().toLowerCase();

  return recipes
    .filter((recipe) => {
      const searchableText = [
        recipe.name,
        recipe.description,
        ...recipe.tags
      ].join(' ').toLowerCase();

      return searchableText.includes(keyword);
    })
    .sort((a, b) => a.name.localeCompare(b.name));
}

function searchHandler(event) {
  event.preventDefault();
  const query = document.querySelector('#search').value;
  renderRecipes(filterRecipes(query));
}

// Initially show one randomly chosen recipe.
function init() {
  const randomIndex = Math.floor(Math.random() * recipes.length);
  renderRecipes([recipes[randomIndex]]);

  document.querySelector('.search').addEventListener('submit', searchHandler);
}

init();
