import { useState } from 'react';
import { globalErrorMessage } from '../../utils/utils';
import { Link } from 'react-router-dom';
import axios from '../../api/axios';
import useAuth from '../../hooks/useAuth';
import login from '../../assets/login.svg';
import InputField from '../../components/global/InputField';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import Checkbox from '../../components/global/Checkbox';
import AuthMaxBox from '../../components/auth/AuthMaxBox';
import Form from '../../components/global/Form';

function Login() {
  const { setAuth } = useAuth();

  const [identity, setIdentity] = useState(''); // username or email
  const [password, setPassword] = useState('');
  const [persist, setPersist] = useState(true);

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  console.log('Rendering Login', { loading, error });

  async function handleSubmit(e) {
    e.preventDefault();
    if (identity && password) {
      try {
        if (error) setError('');
        setLoading(true);
        let response = await axios({
          method: 'POST',
          url: '/auth/login',
          data: { loginIdentifier: identity, password },
          withCredentials: true,
        });
        setAuth(response.data);
        persist && localStorage.setItem('persist', 'true');
      } catch (error) {
        setLoading(false);
        setError((error.response?.data?.errors && error.response.data.errors[0]) || globalErrorMessage);
      }
    } else {
      // If the submit button is enabled with JS hacks
      setError('Please fill all the fields');
    }
  }

  return (
    <AuthMaxBox
      image={login}
      title="Welcome back!"
      leave={{ hint: "Don't have an account?", link: '/register', label: 'Register Here' }}
    >
      <Form
        onSubmit={handleSubmit}
        loading={loading}
        error={error}
        submitLabel="Login"
        submitDisabled={!identity || !password}
        className="sm:w-[500px] xl:h-[425px] xl:overflow-auto"
      >
        <InputField
          placeholder="Username or Email"
          type="text"
          icon={faUser}
          value={identity}
          onChange={(e) => setIdentity(e.target.value)}
          maxLength={50}
          required
          autoFocus
        />
        <InputField.Password value={password} onChange={(e) => setPassword(e.target.value)} required />
        <div className="flex flex-wrap justify-between gap-2 px-1">
          <Checkbox label="Remember me" checked={persist} onClick={() => setPersist(!persist)} />
          <Link to="/forgot-password" className="hover:text-pro-200">
            Forgot your password?
          </Link>
        </div>
      </Form>
    </AuthMaxBox>
  );
}

export default Login;
