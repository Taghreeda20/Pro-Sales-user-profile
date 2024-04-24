import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { globalErrorMessage } from '../../utils/utils';
import { useState } from 'react';
import axios from '../../api/axios';
import useAuth from '../../hooks/useAuth';
import InputField from '../../components/global/InputField';
import email from '../../assets/email.svg';
import CenterBox from '../../components/global/CenterBox';
import CaptionCard from '../../components/global/CaptionCard';
import Form from '../../components/global/Form';

function VerifyEmail() {
  const location = useLocation();
  const navigate = useNavigate();
  const { setAuth } = useAuth();

  const [code, setCode] = useState('');

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  console.log('Rendering VerifyEmail', { loading, error });

  if (!location.state?.email) return <Navigate to="/login" replace={true} />;

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      if (error) setError('');
      setLoading(true);
      if (location.state?.purpose === 'ConfirmNewEmail') {
        let response = await axios({
          method: 'POST',
          url: '/auth/verify-code',
          data: { purpose: location.state.purpose, email: location.state.email, code },
          withCredentials: true,
        });
        setAuth(response.data);
      } else if (location.state?.purpose === 'ResetPassword') {
        let response = await axios({
          method: 'POST',
          url: '/auth/verify-code',
          data: { purpose: location.state.purpose, email: location.state.email, code },
        });
        navigate('/reset-password', { state: { email: location.state.email, token: response.data.token } });
      }
    } catch (error) {
      setLoading(false);
      setError((error.response?.data?.errors && error.response.data.errors[0]) || globalErrorMessage);
    }
  }

  return (
    <CenterBox backButton className="flex-col">
      <CaptionCard image={email} title="Check your email" paragraph="Kindly enter the verification code we sent to you." />
      <Form
        onSubmit={handleSubmit}
        loading={loading}
        error={error}
        submitLabel="Verify"
        submitDisabled={code.length !== 6}
        className="sm:w-[475px] md:w-[575px]"
      >
        <InputField
          placeholder="Verification Code"
          className="text-center text-lg font-bold placeholder:font-normal"
          type="text"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          maxLength={6}
          required
          autoFocus
        />
      </Form>
    </CenterBox>
  );
}

export default VerifyEmail;
