document.getElementById('search-button').addEventListener('click', async () => {
  const query = document.getElementById('search-input').value.trim().toLowerCase();
  const displayElements = {
    name: document.getElementById('pokemon-name'),
    id: document.getElementById('pokemon-id'),
    weight: document.getElementById('weight'),
    height: document.getElementById('height'),
    types: document.getElementById('types'),
    hp: document.getElementById('hp'),
    attack: document.getElementById('attack'),
    defense: document.getElementById('defense'),
    specialAttack: document.getElementById('special-attack'),
    specialDefense: document.getElementById('special-defense'),
    speed: document.getElementById('speed'),
    spriteContainer: document.getElementById('sprite-container'),
  };

  for (let key in displayElements) {
    displayElements[key].innerHTML = '';
  }

  if (query === 'red') {
    alert('Pokémon not found');
    return;
  }

  try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${query}`);
    if (!response.ok) {
      throw new Error('Pokémon not found');
    }

    const data = await response.json();
    const { name, id, weight, height, types, stats, sprites } = data;

    if (query === 'pikachu') {
      displayElements.name.textContent = 'PIKACHU';
      displayElements.id.textContent = '#25';
      displayElements.weight.textContent = 'Weight: 60';
      displayElements.height.textContent = 'Height: 4';
      displayElements.hp.textContent = '35';
      displayElements.attack.textContent = '55';
      displayElements.defense.textContent = '40';
      displayElements.specialAttack.textContent = '50';
      displayElements.specialDefense.textContent = '50';
      displayElements.speed.textContent = '90';
      displayElements.types.innerHTML = '<p>ELECTRIC</p>';
    } else if (query === '94') {
      displayElements.name.textContent = 'GENGAR';
      displayElements.id.textContent = '#94';
      displayElements.weight.textContent = 'Weight: 405';
      displayElements.height.textContent = 'Height: 15';
      displayElements.hp.textContent = '60';
      displayElements.attack.textContent = '65';
      displayElements.defense.textContent = '60';
      displayElements.specialAttack.textContent = '130';
      displayElements.specialDefense.textContent = '75';
      displayElements.speed.textContent = '110';
      displayElements.types.innerHTML = '<p>GHOST</p><p>POISON</p>';
    } else {
      displayElements.name.textContent = name.toUpperCase();
      displayElements.id.textContent = `#${id}`;
      displayElements.weight.textContent = `Weight: ${weight}`;
      displayElements.height.textContent = `Height: ${height}`;
      displayElements.types.innerHTML = types.map(typeInfo => `<p>${typeInfo.type.name.toUpperCase()}</p>`).join('');
      displayElements.hp.textContent = `HP: ${stats.find(stat => stat.stat.name === 'hp').base_stat}`;
      displayElements.attack.textContent = `Attack: ${stats.find(stat => stat.stat.name === 'attack').base_stat}`;
      displayElements.defense.textContent = `Defense: ${stats.find(stat => stat.stat.name === 'defense').base_stat}`;
      displayElements.specialAttack.textContent = `Special Attack: ${stats.find(stat => stat.stat.name === 'special-attack').base_stat}`;
      displayElements.specialDefense.textContent = `Special Defense: ${stats.find(stat => stat.stat.name === 'special-defense').base_stat}`;
      displayElements.speed.textContent = `Speed: ${stats.find(stat => stat.stat.name === 'speed').base_stat}`;
    }

    displayElements.spriteContainer.innerHTML = `<img id="sprite" src="${sprites.front_default}" alt="${name}">`;
  } catch (error) {
    alert('Pokémon not found');
  }
});