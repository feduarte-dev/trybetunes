import { useEffect, useState } from 'react';
import { SongType } from '../types';
import checked_heart from '../images/checked_heart.png';
import empty_heart from '../images/empty_heart.png';
import { addSong, removeSong, getFavoriteSongs } from '../services/favoriteSongsAPI';
import Loading from './Loading';

function MusicCard({ trackName, previewUrl, trackId }: SongType) {
  const [favoriteTracks, setFavoriteTracks] = useState<SongType[]>(() => {
    const storedFavoriteSongs = localStorage.getItem('favorite_songs');
    return storedFavoriteSongs ? JSON.parse(storedFavoriteSongs) : [];
  });
  const [checkbox, setCheckbox] = useState<boolean>(favoriteTracks
    .some((song) => song.trackName === trackName));
  const [loadingCheck, setLoadingCheck] = useState<boolean>(false);

  function handleChange() {
    setCheckbox((prevState) => !prevState);
  }

  useEffect(() => {
    async function fetchFavorites() {
      try {
        if (checkbox) {
          await addSong({ trackName, previewUrl, trackId });
        } else {
          await removeSong({ trackName, previewUrl, trackId });
        }
        setLoadingCheck(true);
        const favoriteSongs = await getFavoriteSongs();
        setFavoriteTracks(favoriteSongs);
        setLoadingCheck(false);
      } catch (error) {
        console.error('Error fetching song:', error);
        setLoadingCheck(false);
      }
    }
    fetchFavorites();
  }, [checkbox, previewUrl, trackId, trackName]);

  if (loadingCheck) {
    return <Loading />;
  }

  return (
    <>
      <p>{trackName}</p>
      <audio data-testid="audio-component" src={ previewUrl } controls>
        <track kind="captions" />
        O seu navegador não suporta o elemento
        {' '}
        <code>audio</code>
      </audio>
      <label htmlFor={ trackName } data-testid={ `checkbox-music-${trackId}` }>
        <input
          type="checkbox"
          name="favoriteTrack"
          id={ trackName }
          onChange={ handleChange }
          checked={ checkbox }
        />
        <img src={ checkbox ? checked_heart : empty_heart } alt="favorite" />
      </label>
    </>
  );
}

export default MusicCard;
