import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { globalErrorMessage, inputFieldsInstructions, validationRegex } from '../../utils/utils';
import InputField from '../../components/global/InputField';
import axios from '../../api/axios';
import register from '../../assets/register.svg';
import AuthMaxBox from '../../components/auth/AuthMaxBox';
import Form from '../../components/global/Form';

function Register() {
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const isValidFirstName = validationRegex.name.test(firstName);
  const isValidLastName = validationRegex.name.test(lastName);
  const isValidUserName = validationRegex.username.test(username);
  const isValidEmail = validationRegex.email.test(email);
  const isValidPassword = validationRegex.password.test(password);
  const isValidConfirmPassword = confirmPassword === password;

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  console.log('Rendering Register', { loading, error });

  async function handleSubmit(e) {
    e.preventDefault();
    if (
      isValidFirstName &&
      isValidLastName &&
      isValidUserName &&
      isValidEmail &&
      isValidPassword &&
      isValidConfirmPassword
    ) {
      try {
        if (error) setError('');
        setLoading(true);
        await axios({
          method: 'POST',
          url: '/auth/register',
          data: { firstName, lastName, userName: username, email, password, confirmPassword },
        });
        navigate('/verify-email', { state: { purpose: 'ConfirmNewEmail', email } });
      } catch (error) {
        setLoading(false);
        setError((error.response?.data?.errors && error.response.data.errors[0]) || globalErrorMessage);
      }
    } else {
      // If the submit button is enabled with JS hacks
      setError('Please enter valid information');
    }
  }

  return (
    <AuthMaxBox
      image={register}
      title="Create your account"
      leave={{ hint: 'Already have an account?', label: 'Login', link: '/login' }}
    >
      <Form
        onSubmit={handleSubmit}
        loading={loading}
        error={error}
        submitLabel="Register"
        submitDisabled={
          !(
            isValidFirstName &&
            isValidLastName &&
            isValidUserName &&
            isValidEmail &&
            isValidPassword &&
            isValidConfirmPassword
          )
        }
        className="sm:h-[425px] sm:w-[500px] sm:overflow-auto"
      >
        <div className="flex flex-col gap-3 sm:flex-row">
          <InputField.FirstName
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            isValid={isValidFirstName}
            required
            autoFocus
          />
          <InputField.LastName
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            isValid={isValidLastName}
            required
          />
        </div>
        <InputField.Username
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          isValid={isValidUserName}
          required
        />
        <InputField.Email value={email} onChange={(e) => setEmail(e.target.value)} isValid={isValidEmail} required />
        <InputField.Password
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          isValid={isValidPassword}
          required
        />
        <InputField.Password
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          instructions={inputFieldsInstructions.confirmPassword}
          isValid={isValidConfirmPassword}
          required
        />
      </Form>
    </AuthMaxBox>
  );
}

export default Register;
