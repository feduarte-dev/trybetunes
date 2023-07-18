import { useState, useEffect } from 'react';
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

  function handdleInput(e:React.ChangeEvent<HTMLInputElement>):void {
    setInputValue(e.target.value);
    setButtonCheck(e.target.value.length < 2);
  }

  async function handdleButton() {
    setLoadingCheck(true);
    setAlbumList(await searchAlbumsAPI(inputValue));
    setInputValue('');
    setLoadingCheck(false);
    setButtonPress(true);
  }

  // useEffect(() => {
  //   setAlbumList(albumList);
  //   console.log(albumList);
  // }, [albumList]);

  if (loadingCheck) {
    return <Loading />;
  }

  return (
    <>
      <input
        type="text"
        data-testid="search-artist-input"
        value={ inputValue }
        onChange={ handdleInput }
      />
      <button
        data-testid="search-artist-button"
        disabled={ buttonCheck }
        onClick={ handdleButton }
      >
        Pesquisar
      </button>
      {albumList.length > 0 && (
        <div>
          <h1>{`Resultado de álbuns de: ${albumList[0].artistName}`}</h1>
          {albumList.map((album) => (
            <NavLink
              key={ album.collectionId }
              to={ `/album/${album.collectionId}` } // Vou ter problema com isso?
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
