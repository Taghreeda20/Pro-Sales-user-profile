import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { globalErrorMessage } from '../../utils/utils';
import { validationRegex } from '../../utils/utils';
import axios from '../../api/axios';
import forgotPassword from '../../assets/forgotPassword.svg';
import InputField from '../../components/global/InputField';
import CaptionCard from '../../components/global/CaptionCard';
import CenterBox from '../../components/global/CenterBox';
import Form from '../../components/global/Form';

function ForgotPassword() {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');

  const validEmail = validationRegex.email.test(email);

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  console.log('Rendering ForgetPassword', { loading, error });

  async function handleSubmit(e) {
    e.preventDefault();
    if (validEmail) {
      try {
        if (error) setError('');
        setLoading(true);
        await axios({ method: 'POST', url: '/auth/forgot-password', data: { email } });
        navigate('/verify-email', { state: { email, purpose: 'ResetPassword' } });
      } catch (error) {
        setLoading(false);
        setError((error.response?.data?.errors && error.response.data.errors[0]) || globalErrorMessage);
      }
    } else {
      // If the submit button is enabled with JS hacks
      setError('Please enter a valid email');
    }
  }

  return (
    <CenterBox backButton className="flex-col">
      <CaptionCard image={forgotPassword} title="Forgot password?" paragraph="Please enter your email address below." />
      <Form
        onSubmit={handleSubmit}
        loading={loading}
        error={error}
        submitLabel="Continue"
        submitDisabled={!validEmail}
        className="sm:w-[475px] md:w-[575px]"
      >
        <InputField.Email value={email} onChange={(e) => setEmail(e.target.value)} required autoFocus />
      </Form>
    </CenterBox>
  );
}

export default ForgotPassword;
