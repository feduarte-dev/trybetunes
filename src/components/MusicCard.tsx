import { useState } from 'react';
import { SongType } from '../types';
import checked_heart from '../images/checked_heart.png';
import empty_heart from '../images/empty_heart.png';

function MusicCard({ trackName, previewUrl, trackId }:SongType) {
  const [checkbox, setCheckbox] = useState<boolean>(false);

  function handleChange() {
    return checkbox ? setCheckbox(false) : setCheckbox(true);
  }
  return (
    <>
      <p>{trackName}</p>
      <audio data-testid="audio-component" src={ previewUrl } controls>
        <track kind="captions" />
        O seu navegador não suporta o elemento
        {' '}
        {' '}
        <code>audio</code>
        .
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
