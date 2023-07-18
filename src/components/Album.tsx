import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import getMusics from '../services/musicsAPI';
import { AlbumType, SongType } from '../types';
import Loading from './Loading';
import MusicCard from './MusicCard';

function Album() {
  const [loadingCheck, setLoadingCheck] = useState<boolean>(true);
  const [musicList, setMusicList] = useState<[]>([]);
  const location = useLocation();

  useEffect(() => {
    async function fetchMusicList() {
      const fetchedMusicList = await getMusics(location.pathname.split('/')[2]);
      setMusicList(fetchedMusicList);
      setLoadingCheck(false);
    }

    fetchMusicList();
  }, [location.pathname]);

  if (loadingCheck) {
    return <Loading />;
  }

  if (musicList.length === 0) {
    return <h2>Nenhum álbum foi encontrado</h2>;
  }

  const [albumInfo, ...musics] = musicList;
  console.log(musicList);

  return (
    <>
      <h1 data-testid="artist-name">{albumInfo.artistName}</h1>
      <h2 data-testid="album-name">{albumInfo.collectionName}</h2>
      <div>
        {/* Render your music cards or any other components using the musics array */}
        {musics.map((music) => (
          <MusicCard key={ music.trackId } music={ music } />
        ))}
      </div>
    </>
  );
}

export default Album;
