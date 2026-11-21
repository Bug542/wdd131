// WDD 131 - Week 10 Ponder: Sorting and Filtering
// Practice: sorting strings and products, filtering arrays, and building a hike search.
"use strict";

const simpleList = [
  "oranges", "grapes", "lemons", "apples", "Bananas",
  "watermelons", "coconuts", "broccoli", "mango"
];

const products = [
  { productName: "Wireless Mouse", price: 29.99 },
  { productName: "Bluetooth Keyboard", price: 49.99 },
  { productName: "Laptop Stand", price: 39.99 }
];

const animals = [
  { name: "Lion", traits: ["brave", "strong", "fierce", "wild"] },
  { name: "Elephant", traits: ["large", "gentle", "smart", "wild"] },
  { name: "Fox", traits: ["sly", "quick", "clever", "wild"] },
  { name: "Dog", traits: ["loyal", "friendly", "playful", "cuddly"] },
  { name: "Cat", traits: ["quiet", "independent", "curious", "cuddly"] }
];

// Sort practice: make alphabetical comparison case-insensitive.
function compareFn(a, b) {
  return a.toLowerCase().localeCompare(b.toLowerCase());
}
console.log("Alphabetical sort:", [...simpleList].sort(compareFn));
console.log("Price sort:", [...products].sort((a, b) => a.price - b.price));
console.log("Wild animals:", animals.filter(animal => animal.traits.includes("wild")));
console.log("First cuddly animal:", animals.find(animal => animal.traits.includes("cuddly")));

const hikes = [
  {
    name: "Bechler Falls",
    stub: "bechler_falls",
    imgSrc: "https://wdd131.netlify.app/examples/hikes/images/bechler-falls.jpg",
    imgAlt: "Bechler Falls waterfall",
    distance: "3 miles",
    tags: ["Caves", "Yellowstone", "Waterfall"],
    difficulty: 1,
    description: "Beautiful short hike in Yellowstone along the Bechler river to Bechler Falls",
    directions: "Take Highway 20 north to Ashton. Turn right into town and continue through. Follow that road for a few miles, then turn left onto Cave Falls Road. Drive to the parking area at the end of the road.",
    trailhead: [44.14457, -110.99781]
  },
  {
    name: "Teton Canyon",
    stub: "teton_canyon",
    imgSrc: "https://wdd131.netlify.app/examples/hikes/images/teton-canyon.jpg",
    imgAlt: "View through Teton Canyon",
    distance: "3 miles",
    tags: ["Canyon", "Tetons"],
    difficulty: 1,
    description: "Beautiful short (or long) hike through Teton Canyon.",
    directions: "Take Highway 33 east to Driggs. Turn left onto Teton Canyon Road and follow the signs to the trailhead parking area.",
    trailhead: [43.75567, -110.91521]
  },
  {
    name: "Denanda Falls",
    stub: "denanda_falls",
    imgSrc: "https://wdd131.netlify.app/examples/hikes/images/denanda-falls.jpg",
    imgAlt: "Denanda Falls waterfall",
    distance: "7 miles",
    tags: ["Caves", "Yellowstone", "Waterfall"],
    difficulty: 3,
    description: "Beautiful hike through Bechler meadows to Denanda Falls",
    directions: "Take Highway 20 north to Ashton. Follow Cave Falls Road and turn left at the Bechler Meadows sign for the trailhead parking area.",
    trailhead: [44.14974, -111.04564]
  },
  {
    name: "Coffee Pot Rapids",
    stub: "coffee_pot",
    imgSrc: "https://wdd131.netlify.app/examples/hikes/images/coffee-pot.jpg",
    imgAlt: "Rapids on the Henry's Fork",
    distance: "2.2 miles",
    tags: ["Rafting"],
    difficulty: 1,
    description: "Beautiful hike along the Henry's Fork of the Snake River to a set of rapids.",
    directions: "Take Highway 20 north to Island Park. Turn west onto Flatrock Road, then onto Coffee Pot Road and continue to the campground parking area.",
    trailhead: [44.49035, -111.36619]
  },
  {
    name: "Menan Butte",
    stub: "menan_butte",
    imgSrc: "https://wdd131.netlify.app/examples/hikes/images/menan-butte.jpg",
    imgAlt: "Menan Butte volcanic crater",
    distance: "3.4 miles",
    tags: ["Volcanic", "View"],
    difficulty: 2,
    description: "A steep climb to one of the largest volcanic tuff cones in the world. 3.4 miles is the full loop around the crater, but it can be shortened.",
    directions: "Take Highway 33 west out of Rexburg. Turn left on E Butte Road, then right onto Twin Butte Road and continue to the trailhead parking lot.",
    trailhead: [43.78555, -111.98996]
  }
];

const hikeContainer = document.querySelector("#hike-container");
const input = document.querySelector("#search");
const form = document.querySelector("#hike-search");
const resultsCount = document.querySelector("#results-count");

function tagTemplate(tags) {
  return tags.map(tag =>
    `<button type="button" class="tag" data-tag="${tag}" aria-label="Search hikes tagged ${tag}">${tag}</button>`
  ).join("");
}

function difficultyTemplate(difficulty) {
  let icons = "";
  for (let i = 1; i <= 5; i++) {
    icons += i <= difficulty ? "🥾" : "▫️";
  }
  return `<span class="rating" role="img" aria-label="Difficulty: ${difficulty} out of 5">
    Difficulty: <span class="rating-icons" aria-hidden="true">${icons}</span>
  </span>`;
}

function hikeTemplate(hike) {
  return `<article class="hike-card">
    <div class="hike-content">
      <div class="hike-title-row">
        <h3>${hike.name}</h3>
        <span class="distance">${hike.distance}</span>
      </div>
      <div class="hike-tags">${tagTemplate(hike.tags)}</div>
      <p class="description">${hike.description}</p>
      <p>${difficultyTemplate(hike.difficulty)}</p>
    </div>
  </article>`;
}

function renderHikes(hikesToShow) {
  if (hikesToShow.length === 0) {
    hikeContainer.innerHTML = '<p class="empty-state">No hikes match your search. Try another keyword.</p>';
  } else {
    hikeContainer.innerHTML = hikesToShow.map(hikeTemplate).join("");
  }
  resultsCount.textContent = `${hikesToShow.length} hike${hikesToShow.length === 1 ? "" : "s"} found`;
}

function search() {
  const query = input.value.trim().toLowerCase();

  // Search the hike name, description, and every entry in the tags array.
  const filteredHikes = hikes.filter(hike =>
    hike.name.toLowerCase().includes(query) ||
    hike.description.toLowerCase().includes(query) ||
    hike.tags.some(tag => tag.toLowerCase().includes(query))
  );

  // Distances are strings such as "2.2 miles", so compare the numeric part.
  filteredHikes.sort((a, b) => parseFloat(a.distance) - parseFloat(b.distance));
  renderHikes(filteredHikes);
}

// The submit handler works for both clicking Search and pressing Enter.
form.addEventListener("submit", event => {
  event.preventDefault();
  search();
});

// Let users click a tag to search for matching hikes.
hikeContainer.addEventListener("click", event => {
  const tagButton = event.target.closest(".tag");
  if (!tagButton) return;
  input.value = tagButton.dataset.tag;
  search();
});

// Show a random hike first, as required by the assignment.
const randomIndex = Math.floor(Math.random() * hikes.length);
hikeContainer.innerHTML = hikeTemplate(hikes[randomIndex]);
resultsCount.textContent = "Featured hike — search to see more";
