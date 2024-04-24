import { useState } from 'react';
import { validationRegex } from '../../../../../../utils/validation';
import { globalErrorMessage } from '../../../../../../utils/utils';
import usePrivateAxios from '../../../../../../hooks/usePrivateAxios';
import useAuth from '../../../../../../hooks/useAuth';
import InputField from '../../../../../../components/ui/InputField';
import Form from '../../../../../../components/ui/Form';

export default function ChangingName() {
  const privateAxios = usePrivateAxios();

  const { auth, setAuth } = useAuth();

  const [firstName, setFirstName] = useState(auth.firstName);
  const [lastName, setLastName] = useState(auth.lastName);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const isValidFirstName = validationRegex.name.test(firstName);
  const isValidLastName = validationRegex.name.test(lastName);

  async function handleNameSubmit(e) {
    e.preventDefault();
    if (isValidFirstName && isValidLastName) {
      if (firstName === auth.firstName && lastName === auth.lastName) {
        setError('Please enter a different name');
        return;
      }
      try {
        setError('');
        setLoading(true);
        await privateAxios({
          method: 'PUT',
          url: '/UserProfile/update-name',
          data: { firstName, lastName },
        });
        setAuth({ ...auth, firstName, lastName });
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

      onSubmit={handleNameSubmit}
      loading={loading}
      error={error}
      submitLabel="Update"
      submitDisabled={!isValidFirstName || !isValidLastName || loading}
      className="w-full sm:w-[400px] sm:mx-auto"
    >

      <InputField.FirstName
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
        isValid={isValidFirstName}
        required
      />

      <InputField.LastName
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
        isValid={isValidLastName}
        required
      />
    </Form>
  );
}
