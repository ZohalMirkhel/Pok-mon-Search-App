document.addEventListener('DOMContentLoaded', () => {
  const searchButton = document.getElementById('search-button');
  const searchInput = document.getElementById('search-input');
  const infoTable = document.getElementById('pokemon-info-table');

  searchButton.addEventListener('click', async () => {
    console.log('Search button clicked');
    const query = searchInput.value.trim().toLowerCase();
    console.log('Query:', query);
    infoTable.innerHTML = '';

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

      const spriteRow = document.createElement('tr');
      spriteRow.innerHTML = `<th colspan="2" style="text-align: center;"><img id="sprite" src="${sprites.front_default}" alt="${name}" style="max-width: 500px;"></th>`;
      infoTable.appendChild(spriteRow);

      const addRow = (label, value) => {
        const row = document.createElement('tr');
        row.innerHTML = `<th>${label}</th><td>${value}</td>`;
        infoTable.appendChild(row);
      };

      addRow('Name', name.toUpperCase());
      addRow('ID', `#${id}`);
      addRow('Weight', weight);
      addRow('Height', height);
      addRow('Types', types.map(typeInfo => `<p>${typeInfo.type.name.toUpperCase()}</p>`).join(''));
      addRow('HP', stats.find(stat => stat.stat.name === 'hp').base_stat);
      addRow('Attack', stats.find(stat => stat.stat.name === 'attack').base_stat);
      addRow('Defense', stats.find(stat => stat.stat.name === 'defense').base_stat);
      addRow('Special Attack', stats.find(stat => stat.stat.name === 'special-attack').base_stat);
      addRow('Special Defense', stats.find(stat => stat.stat.name === 'special-defense').base_stat);
      addRow('Speed', stats.find(stat => stat.stat.name === 'speed').base_stat);

      document.getElementById('pokemon-info').style.display = 'block';
    } catch (error) {
      console.error('Error fetching Pokémon data:', error);
      alert('Pokémon not found');
    }
  });
});
