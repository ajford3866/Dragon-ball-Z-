const itemsEl = document.querySelector("#items");

let characters = [];
let displayedCharacters = [];
let currentFilter = "";

async function main() {
  const response = await fetch("https://dragonball-api.com/api/characters?limit=100");
  const data = await response.json();

  characters = data.items;
  displayedCharacters = characters;

  renderCharacters(displayedCharacters);
}

function renderCharacters(charactersArray) {
  itemsEl.innerHTML = charactersArray
    .map(
      (character) => `
      <a href="./character.html?id=${character.id}" class="character">
        <div class="name">${character.name}</div>

        <div class="object_wrap">
          <figure>
            <img src="${character.image}" alt="${character.name}" />
          </figure>

          <div class="stats_wrap">
            <h1>Ki - ${cleanKi(character.ki).toLocaleString()}</h1>

            <h2 class="object_stat">
              Max Ki - ${cleanKi(character.maxKi).toLocaleString()}
            </h2>

            <h2 class="object_stat">
              Race - ${character.race}
            </h2>

            <h2 class="object_stat">
              Gender - ${character.gender}
            </h2>

            <h2 class="object_stat">
              Affiliation - ${character.affiliation}
            </h2>
          </div>
        </div>
      </a>
    `
    )
    .join("");
}

function cleanKi(value) {
  let cleanedValue = value.replaceAll(".", "").toLowerCase();

  if (cleanedValue.includes("billion")) {
    return Number(cleanedValue.replace(" billion", "")) * 1000000000;
  }

  if (cleanedValue.includes("million")) {
    return Number(cleanedValue.replace(" million", "")) * 1000000;
  }

  if (cleanedValue.includes("thousand")) {
    return Number(cleanedValue.replace(" thousand", "")) * 1000;
  }

  return Number(cleanedValue);
}

function sortCharacters(charactersArray) {
  let sortedCharacters = [...charactersArray];

  if (currentFilter === "HIGH_TO_LOW") {
    sortedCharacters.sort(
      (a, b) => cleanKi(b.ki) - cleanKi(a.ki)
    );
  } else if (currentFilter === "LOW_TO_HIGH") {
    sortedCharacters.sort(
      (a, b) => cleanKi(a.ki) - cleanKi(b.ki)
    );
  }

  return sortedCharacters;
}

function filterCharacters(event) {
  currentFilter = event.target.value;

  displayedCharacters = sortCharacters(displayedCharacters);

  renderCharacters(displayedCharacters);
}

function searchCharacters(event) {
  const searchValue = event.target.value.toLowerCase();

  displayedCharacters = characters.filter((character) =>
    character.name.toLowerCase().includes(searchValue)
  );

  displayedCharacters = sortCharacters(displayedCharacters);

  renderCharacters(displayedCharacters);
}

main();