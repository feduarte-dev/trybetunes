import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Loading from './Loading';
import { AlbumType } from '../types';

function Search() {
  const [buttonCheck, setButtonCheck] = useState<boolean>(true);
  const [inputValue, setInputValue] = useState<string>('');
  const [loadingCheck, setLoadingCheck] = useState<boolean>(false);
  const [albumList, setAlbumList] = useState<AlbumType[]>([]);
  const [buttonPress, setButtonPress] = useState<boolean>(false);
  const [artist, setArtist] = useState<string>('');

  function handleInput(e:React.ChangeEvent<HTMLInputElement>):void {
    setInputValue(e.target.value);
    setButtonCheck(e.target.value.length < 2);
  }

  async function handleButton() {
    setLoadingCheck(true);
    setAlbumList(await searchAlbumsAPI(inputValue));
    setArtist(inputValue);
    setInputValue('');
    setLoadingCheck(false);
    setButtonPress(true);
  }

  if (loadingCheck) {
    return <Loading />;
  }

  return (
    <>
      <input
        type="text"
        data-testid="search-artist-input"
        value={ inputValue }
        onChange={ handleInput }
      />
      <button
        data-testid="search-artist-button"
        disabled={ buttonCheck }
        onClick={ handleButton }
      >
        Pesquisar
      </button>
      {albumList.length > 0 && (
        <div>
          <h1>{`Resultado de álbuns de: ${artist}`}</h1>
          {albumList.map((album) => (
            <NavLink
              key={ album.collectionId }
              to={ `/album/${album.collectionId}` }
              data-testid={ `link-to-album-${album.collectionId}` }
            >
              {album.collectionName}
            </NavLink>
          ))}
        </div>
      )}
      {buttonPress && albumList.length === 0 && (
        <h2>Nenhum álbum foi encontrado</h2>
      )}
    </>
  );
}
export default Search;
