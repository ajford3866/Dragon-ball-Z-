//"https://dragonball-api.com/api/characters?limit=100"

const itemsEl = document.querySelector("#items");

let characters = [];

async function main() {
  const response = await fetch("https://dragonball-api.com/api/characters?limit=100");
  const data = await response.json();

  characters = data.items;

  renderCharacters(characters);
}

function renderCharacters(charactersArray) {
  itemsEl.innerHTML = charactersArray
    .map(
      (character) => `
      <div class="character">
        <div class="name">${character.name}</div>

        <div class="object_wrap">
          <figure>
            <img src="${character.image}" alt="${character.name}" />
          </figure>

          <div class="stats_wrap">
            <h1>Ki - ${character.ki.replaceAll(".", "")}</h1>
            <h2 class="object_stat">Max Ki - ${character.maxKi.replaceAll(".", "")}</h2>
            <h2 class="object_stat">Race - ${character.race}</h2>
            <h2 class="object_stat">Gender - ${character.gender}</h2>
            <h2 class="object_stat">Affiliation - ${character.affiliation}</h2>
          </div>
        </div>
      </div>
    `
    )
    .join("");
}

function cleanKi(value) {
  return Number(value.replaceAll(".", ""));
}

function filterCharacters(event) {
  const filter = event.target.value;

  let sortedCharacters = [...characters];

  if (filter === "HIGH_TO_LOW") {
    sortedCharacters.sort((a, b) => cleanKi(b.ki) - cleanKi(a.ki));
  } else if (filter === "LOW_TO_HIGH") {
    sortedCharacters.sort((a, b) => cleanKi(a.ki) - cleanKi(b.ki));
  }

  renderCharacters(sortedCharacters);
}

async function searchCharacters(event) {
  const searchValue = event.target.value.toLowerCase();

  const response = await fetch("https://dragonball-api.com/api/characters?limit=100");
  const data = await response.json();

  const filteredCharacters = data.items.filter((character) =>
    character.name.toLowerCase().includes(searchValue)
  );

  renderCharacters(filteredCharacters);
}

main();