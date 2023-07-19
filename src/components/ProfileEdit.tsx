import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { updateUser } from '../services/userAPI';
import Loading from './Loading';
import { UserType } from '../types';
// nao to usando o getuser pra buscar o nome de usuario, to usando o getitem
function ProfileEdit() {
  const [loadingCheck, setLoadingCheck] = useState<boolean>(false);
  const [buttonStatus, setButtonStatus] = useState<boolean>(true);
  const [profileData, setProfileData] = useState<UserType>(() => {
    const storedFavoriteSongs = localStorage.getItem('user');
    return storedFavoriteSongs ? JSON.parse(storedFavoriteSongs) : '';
  });
  const navigate = useNavigate();

  useEffect(() => {
    function enableButton() {
      const validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
      return profileData.name.length > 0
      && profileData.email.length > 0
      && profileData.description.length > 0
      && profileData.email.match(validRegex)
        ? setButtonStatus(false) : setButtonStatus(true);
    }
    enableButton();
  }, [profileData.description.length, profileData.email, profileData.name.length]);

  function handleChange(event
  : React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setProfileData({
      ...profileData,
      [name]: value,
    });
  }

  async function handleClick() {
    setLoadingCheck(true);
    await updateUser({
      name: profileData.name,
      email: profileData.email,
      image: profileData.image,
      description: profileData.description,
    });
    setLoadingCheck(false);
    navigate('/profile');
  }

  if (loadingCheck) {
    return <Loading />;
  }
  return (
    <>
      <input
        type="text"
        name="name"
        data-testid="edit-input-name"
        value={ profileData?.name }
        onChange={ handleChange }
      />
      <input
        type="text"
        name="email"
        data-testid="edit-input-email"
        value={ profileData?.email }
        onChange={ handleChange }
      />
      <input
        type="text"
        name="description"
        data-testid="edit-input-description"
        value={ profileData?.description }
        onChange={ handleChange }
      />
      <input
        type="text"
        name="image"
        data-testid="edit-input-image"
        value={ profileData.image }
        onChange={ handleChange }
      />
      <button
        data-testid="edit-button-save"
        disabled={ buttonStatus }
        onClick={ handleClick }
      >
        Salvar
      </button>
    </>
  );
}
export default ProfileEdit;
