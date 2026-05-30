const singleCharacterEl = document.querySelector("#single-character");

function cleanKi(value) {
  return Number(value.replaceAll(".", "").replaceAll(",", ""));
}

async function getCharacter() {
  const params = new URLSearchParams(window.location.search);
  const characterId = params.get("id");

  const response = await fetch(
    `https://dragonball-api.com/api/characters/${characterId}`
  );

  const character = await response.json();

  singleCharacterEl.innerHTML = `
    <div class="single-character-card">
      <h1>${character.name}</h1>

      <figure>
        <img src="${character.image}" alt="${character.name}" />
      </figure>

      <h2>Ki: ${cleanKi(character.ki).toLocaleString()}</h2>
      <h2>Max Ki: ${cleanKi(character.maxKi).toLocaleString()}</h2>
      <h2>Race: ${character.race}</h2>
      <h2>Gender: ${character.gender}</h2>

      <p>${character.description || "No description available."}</p>
    </div>
  `;
}

getCharacter();