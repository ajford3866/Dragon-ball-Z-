// https://dragonball-api.com/api/characters

const itemsEl = document.querySelector("#items");

let characters = [];

async function main() {
  const response = await fetch("https://dragonball-api.com/api/characters");
  const data = await response.json();

  console.log(data);

  characters = data.items;

  renderCharacters(characters);
}

function renderCharacters(charactersArray) {
  itemsEl.innerHTML = charactersArray.map(character => `
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
  `).join("");
}

function cleanKi(value) {
  return Number(value.replaceAll(".", ""));
}

function filterCharacters(event) {
  const filter = event.target.value;

  if (filter === "HIGH_TO_LOW") {
    characters.sort((a, b) => cleanKi(b.ki) - cleanKi(a.ki));
  } 
  else if (filter === "LOW_TO_HIGH") {
    characters.sort((a, b) => cleanKi(a.ki) - cleanKi(b.ki));
  }

  renderCharacters(characters);
}

main();