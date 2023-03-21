import { FC } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import queryString from 'query-string';

// Components
import { HeroeCard } from '../../components/index';

// Custom hooks
import { useForm } from '../../hooks/useForm';

// Helpers
import { getHeroesByName } from '../../helpers/index';

// Styles
import './styles.scss';

const Search: FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // queryString me permite extraer todo lo que se encuentra en el objeto search del location
  const { q = '' } = queryString.parse(location.search);
  const heroes = getHeroesByName(q);

  const showSearch = q?.length === 0;
  const showError = q?.length > 0 && heroes.length === 0;

  const { formState, onInputChange } = useForm({
    searchText: q,
  });

  function handleSubmit(e: React.FormEvent<HTMLFormElement>): void {
    e.preventDefault();
    navigate(`/search?q=${formState.searchText}`);
  }

  return (
    <div className='search'>
      <h2>Search</h2>
      <div className='search__container'>
        <form onSubmit={handleSubmit}>
          <input
            type='text'
            placeholder='Search a hero'
            name='searchText'
            autoComplete='off'
            value={formState.searchText}
            onChange={onInputChange}
          />
          <button>Search</button>
        </form>

        <div className='search__container-results'>
          <h4>Results</h4>
          {<h6 style={{ display: showSearch ? 'block' : 'none' }}>Search a hero</h6>}

          <h6 style={{ display: showError ? 'block' : 'none' }}>
            No hero with <b>{q}</b>
          </h6>

          {heroes.map((heroe, key) => {
            const { id, superhero, alterEgo, firstAppearance } = heroe;
            return (
              <HeroeCard
                key={id ? id : key}
                id={id}
                superhero={superhero}
                alterEgo={alterEgo}
                firstAppearance={firstAppearance}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Search;
