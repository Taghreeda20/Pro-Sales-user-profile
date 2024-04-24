import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import useDocumentTitle from '../../../../../hooks/useDocumentTitle';
import useAuth from '../../../../../hooks/useAuth';
import ChangingName from './components/ChangingName';
import ChangingUsername from './components/ChangingUsername';
import ChangingEmail from './components/ChangingEmail';
import icons from '../../../../../utils/faIcons';

export default function BasicInfoPage() {
  useDocumentTitle('Profile Basic Info');

  const { auth } = useAuth();

  const [edit, setEdit] = useState(false);

  return (
    <div >
      <h1 className="mb-5 lg:mb-12 text-2xl font-bold">Profile</h1>
      <div>
        {edit ? (
          <div className = "flex flex-col lg:gap-12 gap-1 lg:w-[500px]">
            <ChangingName />
            <ChangingUsername />
            <ChangingEmail />
            <button
              className="btn-light flex flex-center items-center gap-2 rounded-xl px-4 py-3 w-fit "
              onClick={() => setEdit(!edit)}
            >
              <FontAwesomeIcon icon={icons.back} />
              Back
            </button>
          </div>
        ) : (
          <div className="flex flex-col gap-8 lg:w-[500px] lg:gap-20">
            <UserData icon={icons.user} title="First Name" value={auth.firstName} />
            <UserData icon={icons.user} title="Last Name" value={auth.lastName} />
            <UserData icon={icons.username} title="Username" value={auth.username} />
            <UserData icon={icons.email} title="Email" value={auth.email} />
            <button
              onClick={() => setEdit(!edit)}
              className="btn-primary flex-center flex items-center gap-1 sm:text-base rounded-xl py-2 text-sm font-semibold"
            >
              <FontAwesomeIcon icon={icons.edit} />
              Edit
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function UserData({ icon, title, value }) {
  return (
    <div className="flex justify-between">
      <div className="flex items-center gap-2">
        <FontAwesomeIcon icon={icon} />
        <p>{title}</p>
      </div>
      <div className="text-gray-800">{value}</div>
    </div>
  );
}