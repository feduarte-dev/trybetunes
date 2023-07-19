import { useEffect, useState } from 'react';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';
import Loading from './Loading';
import { SongType } from '../types';
import MusicCard from './MusicCard';

function Favorites() {
  const [loadingCheck, setLoadingCheck] = useState<boolean>(false);
  const [favoriteList, setFavoriteList] = useState<SongType[]>([]);

  useEffect(() => {
    async function fetchFavoriteList() {
      setLoadingCheck(true);
      const allFavorites = await getFavoriteSongs();
      setFavoriteList(allFavorites);
      setLoadingCheck(false);
    }
    fetchFavoriteList();
  }, []);

  function handleCheckboxChange(trackId: number) {
    setFavoriteList((prevFavorites) => prevFavorites
      .filter((song) => song.trackId !== trackId));
  }

  if (loadingCheck) {
    return <Loading />;
  }

  return (
    <div>
      {favoriteList.map((music) => (
        <MusicCard
          key={ music.trackId }
          trackName={ music.trackName }
          previewUrl={ music.previewUrl }
          trackId={ music.trackId }
          onCheckboxChange={ () => handleCheckboxChange(music.trackId) }
        />
      ))}
    </div>
  );
}

export default Favorites;
