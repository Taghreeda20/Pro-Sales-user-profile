import { useState } from 'react';
import { globalErrorMessage } from '../../../../../../utils/utils';
import { validationRegex } from '../../../../../../utils/validation';
import usePrivateAxios from '../../../../../../hooks/usePrivateAxios';
import useAuth from '../../../../../../hooks/useAuth';
import InputField from '../../../../../../components/ui/InputField';
import Form from '../../../../../../components/ui/Form';

export default function ChangingUsername() {
  const privateAxios = usePrivateAxios();

  const { auth, setAuth } = useAuth();

  const [username, setUsername] = useState(auth.username);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const isValidUsername = validationRegex.username.test(username);

  async function handleUsernameSubmit(e) {
    e.preventDefault();
    if (isValidUsername) {
      if (username === auth.username) {
        setError('Please enter a different username');
        return;
      }
      try {
        setError('');
        setLoading(true);
        await privateAxios({
          method: 'PUT',
          url: '/UserProfile/update-username',
          data: { username },
        });
        setAuth({ ...auth, username });
        setLoading(false);
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
    <Form
      onSubmit={handleUsernameSubmit}
      loading={loading}
      error={error}
      submitLabel="Update"
      submitDisabled={!isValidUsername || !username || loading}
      className="w-full sm:w-[400px] sm:mx-auto"
    >
        <InputField.Username
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          isValid={isValidUsername}
          required
        />
    </Form>
  );
}
