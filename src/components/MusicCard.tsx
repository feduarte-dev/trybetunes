import { useEffect, useState } from 'react';
import { SongType } from '../types';
import checked_heart from '../images/checked_heart.png';
import empty_heart from '../images/empty_heart.png';
import { addSong, removeSong } from '../services/favoriteSongsAPI';

function MusicCard({ trackName, previewUrl, trackId }:SongType) {
  const [checkbox, setCheckbox] = useState<boolean>(false);

  function handleChange() {
    return checkbox ? setCheckbox(false) : setCheckbox(true);
  }
  useEffect(() => {
    async function fetchFavorites() {
      try {
        if (checkbox) {
          await addSong({ trackName, previewUrl, trackId });
        } else if (!checkbox) {
          await removeSong({ trackName, previewUrl, trackId });
        }
      } catch (error) {
        console.error('Error fetching song:', error);
      }
    }
    fetchFavorites();
  }, [checkbox, previewUrl, trackId, trackName]);

  return (
    <>
      <p>{trackName}</p>
      <audio data-testid="audio-component" src={ previewUrl } controls>
        <track kind="captions" />
        O seu navegador não suporta o elemento
        {' '}
        {' '}
        <code>audio</code>
      </audio>
      <label htmlFor={ trackName } data-testid={ `checkbox-music-${trackId}` }>
        <input
          type="checkbox"
          name="favoriteTrack"
          id={ trackName }
          onChange={ handleChange }
        />
        <img src={ checkbox ? checked_heart : empty_heart } alt="favorite" />
      </label>
    </>
  );
}
export default MusicCard;
