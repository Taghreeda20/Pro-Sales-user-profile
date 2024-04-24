import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import useInterests from '../../../../../hooks/useInterests';
import useAuth from '../../../../../hooks/useAuth';
import InterestsList from './InterestsList';
import icons from '../../../../../utils/faIcons';
import Alert from '../../../../../components/ui/Alert';
import { roles } from '../../../../../utils/utils';

export default function InterestsSection() {
  const { interests } = useInterests();
  const { auth } = useAuth();

  const [showDisabled, setShowDisabled] = useState(false);

  const toggleDisabledInterests = () => setShowDisabled(!showDisabled);

  return (
    <section className="flex flex-1 flex-col gap-4 rounded-xl bg-gray-100 p-5">
      <h2 className="text-2xl font-bold">Interests</h2>
      {interests.loading ? (
        <div className="flex-center h-72 flex-col gap-4">
          <FontAwesomeIcon icon={icons.spinner} spin className="text-4xl text-pro-300" />
          <p>Loading interests...</p>
        </div>
      ) : interests.error ? (
        <Alert.Error message={interests.error} />
      ) : (
        <>
          <InterestsList interests={interests.data.enabled} />
          {interests.data.disabled.length > 0 && auth.roles.includes(roles.manager) && (
            <button className="w-fit text-gray-500 transition-colors hover:text-gray-800" onClick={toggleDisabledInterests}>
              {showDisabled ? 'Hide' : 'Show'} Disabled Interests
            </button>
          )}
          {showDisabled && <InterestsList interests={interests.data.disabled} />}
        </>
      )}
    </section>
  );
}
