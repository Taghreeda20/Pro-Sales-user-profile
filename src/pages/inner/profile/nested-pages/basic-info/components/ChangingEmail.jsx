import { useState } from 'react';
import { globalErrorMessage } from '../../../../../../utils/utils';
import { validationRegex } from '../../../../../../utils/validation';
import usePrivateAxios from '../../../../../../hooks/usePrivateAxios';
import useAuth from '../../../../../../hooks/useAuth';
import InputField from '../../../../../../components/ui/InputField';
import Alert from '../../../../../../components/ui/Alert';
import Form from '../../../../../../components/ui/Form';

export default function ChangingEmail() {
  const privateAxios = usePrivateAxios();

  const { auth, setAuth } = useAuth();

  const [verify, setVerify] = useState(false);
  const [emailUpdated, setEmailUpdated] = useState(false);

  const [email, setEmail] = useState(auth.email);
  const [code, setCode] = useState('');

  const isValidEmail = validationRegex.email.test(email);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function handleEmailSubmit(e) {
    e.preventDefault();
    if (isValidEmail) {
      try {
        setError('');
        setLoading(true);
        await privateAxios({
          method: 'PUT',
          url: '/UserProfile/update-email',
          data: { email },
        });
        setLoading(false);
        setVerify(true);
      } catch (error) {
        setLoading(false);
        setError((error.response?.data?.errors && error.response.data.errors[0]) || globalErrorMessage);
      }
    } else {
      // If the submit button is enabled with JS hacks
      setError('Please enter valid email address ');
    }
  }

  async function handleVerfiySubmit(e) {
    e.preventDefault();
    try {
      setError('');
      setLoading(true);
      await privateAxios({
        method: 'POST',
        url: '/Auth/verify-code',
        data: { email, code, purpose: 'ConfirmNewEmail' },
      });
      setAuth({ ...auth, email });
      setEmailUpdated(true);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError((error.response?.data?.errors && error.response.data.errors[0]) || globalErrorMessage);
    }
  }

  if (emailUpdated) {
    return <Alert.Success message="Email updated successfully!" />;
  }

  return verify ? (
    <Form
      onSubmit={handleVerfiySubmit}
      loading={loading}
      error={error}
      submitLabel="Verify"
      submitDisabled={!(code.length === 6) || loading}
      className="w-full sm:w-[400px] sm:mx-auto"
    >
      <InputField
        className="text-center text-lg font-semibold placeholder:font-normal"
        type="text"
        value={code}
        placeholder="Verification Code"
        onChange={(e) => setCode(e.target.value)}
        maxLength={6}
        required
        autoFocus
      />
    </Form>
  ) : (
    <Form
      onSubmit={handleEmailSubmit}
      loading={loading}
      error={error}
      submitLabel="Update"
      submitDisabled={!isValidEmail || !email || loading}
      className="w-full sm:w-[400px] sm:mx-auto"
    >
      <InputField.Email value={email} onChange={(e) => setEmail(e.target.value)} isValid={isValidEmail} required />{' '}
    </Form>
  );
}
