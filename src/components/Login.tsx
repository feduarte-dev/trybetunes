import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createUser } from '../services/userAPI';
import Loading from './Loading';

function Login() {
  const [buttonCheck, setButtonCheck] = useState<boolean>(true);
  const [inputValue, setInputValue] = useState<string>('');
  const [loadingCheck, setLoadingCheck] = useState<boolean>(false);
  const navigate = useNavigate();

  function handdleInput(e:React.ChangeEvent<HTMLInputElement>):void {
    setInputValue(e.target.value);
    setButtonCheck(e.target.value.length < 3); // Pq ta liberando com 3 char e nao 4? visto que eu nao coloquei < =
  }

  async function handdleButton() {
    setLoadingCheck(true);
    await createUser({ name: inputValue });
    setLoadingCheck(false);
    navigate('/search');
  }

  if (loadingCheck) {
    return <Loading />;
  }

  return (
    <>
      <input
        type="text"
        data-testid="login-name-input"
        value={ inputValue }
        onChange={ handdleInput }
      />
      <button
        data-testid="login-submit-button"
        disabled={ buttonCheck }
        onClick={ handdleButton }
      >
        Entrar
      </button>
    </>
  );
}
export default Login;
