// Axios
import axios from 'axios';

// Interfaces
import { Hero } from '../types/types';

// url base de la api, luego de esto le siguen una serie de endpoints que tiene la api
const BASE_URL = 'https://superheroapi.com/api.php/';
const TOKEN = import.meta.env.VITE_API_ACCESS_TOKEN;

export const getHeroesByName = (heroName: string): Promise<Array<Hero>> => {
  heroName = heroName.toLowerCase().trim();
  const url = `${BASE_URL}${TOKEN}/search/${heroName}`;
  return axios
    .get(url)
    .then(response => response.data.results)
    .catch(err => {
      throw new Error(err);
    });
};

export const getHeroById = (heroId: string): Promise<Hero> => {
  const url = `${BASE_URL}${TOKEN}/${heroId}`;
  return axios
    .get(url)
    .then(response => response.data)
    .catch(err => {
      throw new Error(err);
    });
};
