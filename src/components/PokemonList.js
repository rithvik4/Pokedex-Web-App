import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';

const PokemonList = () => {
  const [pokemonList, setPokemonList] = useState([]);
  const [nextPage, setNextPage] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get('/pokemon');
        setPokemonList(response.data.results);
        setNextPage(response.data.next);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const loadMore = async () => {
    try {
      const response = await api.get(nextPage);
      setPokemonList([...pokemonList, ...response.data.results]);
      setNextPage(response.data.next);
    } catch (error) {
      console.error('Error fetching more data:', error);
    }
  };

  return (
    <div>
      <h1>Pokedex</h1>
      <ul>
        {pokemonList.map((pokemon, index) => (
          <li key={index}>
            <Link to={`/pokemon/${index + 1}`}>{pokemon.name}</Link>
          </li>
        ))}
      </ul>
      {nextPage && <button onClick={loadMore}>Load More</button>}
    </div>
  );
};

export default PokemonList;
