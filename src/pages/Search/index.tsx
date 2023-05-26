import { FC, FormEvent, useState } from 'react';

// Components
import { Button, Error, Spinner } from '../../components/index';

// Services
import { getHeroesByName } from '../../services';

// Interfaces
import { Hero } from '../../types/types';

// Styles
import './styles.scss';

type submitEvent = FormEvent<HTMLFormElement>;
type Status = 'IDLE' | 'LOADING' | 'ERROR' | 'SUCCESS';

const Search: FC = () => {
  const [error, setError] = useState<boolean>(false);
  const [status, setStatus] = useState<Status>('IDLE');
  const [heroes, setHeroes] = useState<Array<Hero>>([]);

  function handleSubmit(e: submitEvent): void {
    e.preventDefault();

    const searchValue: string = e.currentTarget.search.value;
    if (searchValue.trim().length === 0) {
      setError(true);
    } else {
      setError(false);
      setStatus('LOADING');
      setHeroes([]);
      getHeroesByName(searchValue)
        .then(heroes => {
          if (heroes) {
            setStatus('SUCCESS');
            setHeroes(heroes);
            console.log('heroes:', heroes);
          } else {
            setStatus('ERROR');
          }
        })
        .catch(err => console.log(err));
    }
  }

  return (
    <section className='search'>
      <h1>Busca a tus héroes</h1>
      <form onSubmit={handleSubmit} className='search__form'>
        <div className='search__form-container'>
          <input type='text' placeholder='EJ: Batman' name='search' autoComplete='off' />
          <Button type='submit'>Buscar</Button>
        </div>
        {error && <Error>El campo no puede estar vacío, escribe un héroe</Error>}
      </form>
      {status === 'LOADING' && (
        <div className='search__spinner'>
          <Spinner size='medium' color='blue' />
        </div>
      )}
      {status === 'ERROR' && <h1>No se encontró el héroe que buscas</h1>}
      {heroes.length > 0 && (
        <div className='search__results'>
          <h1>Mostrar heroes</h1>
        </div>
      )}
    </section>
  );
};

export default Search;
