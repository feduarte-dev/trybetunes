import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from './Loading';
import { UserType } from '../types';

function ProfileEdit() {
  const [loadingCheck, setLoadingCheck] = useState<boolean>(false);
  const [profileData, setProfileDate] = useState<UserType>();

  useEffect(() => {
    async function fetchProfile() {
      setLoadingCheck(true);
      setProfileDate(await getUser());
      setLoadingCheck(false);
    }
    fetchProfile();
  }, []);

  if (loadingCheck) {
    return <Loading />;
  }
  return (
    <>
      <p>{profileData?.name}</p>
      <p>{profileData?.email}</p>
      <p>{profileData?.description}</p>
      <img src={ profileData?.image } alt="profilePhoto" data-testid="profile-image" />
      <NavLink to="/profile/edit">Editar perfil</NavLink>
    </>
  );
}
export default ProfileEdit;
