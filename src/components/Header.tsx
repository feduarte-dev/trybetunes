import { NavLink } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Loading from './Loading';
import { getUser } from '../services/userAPI';
import { UserType } from '../types';

function Header() {
  const [profileName, setProfileName] = useState<UserType>();
  const [loadingCheck, setLoadingCheck] = useState<boolean>(false);

  useEffect(() => {
    async function fetchProfile() {
      setLoadingCheck(true);
      try {
        const usertest = await getUser();
        setProfileName(usertest);
      } catch (error) {
        console.error('Error fetching user:', error);
      } finally {
        setLoadingCheck(false);
      }
    }
    fetchProfile();
  }, []);

  if (loadingCheck) {
    return <Loading />;
  }

  return (
    <header data-testid="header-component">
      <NavLink to="/search" data-testid="link-to-search">Pesquisar</NavLink>
      <NavLink to="/favorites" data-testid="link-to-favorites">Favoritos</NavLink>
      <NavLink to="/profile" data-testid="link-to-profile">Perfil</NavLink>
      <p data-testid="header-user-name">{profileName?.name}</p>
    </header>
  );
}
export default Header;
