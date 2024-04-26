import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import useDocumentTitle from '../../../../../hooks/useDocumentTitle';
import useAuth from '../../../../../hooks/useAuth';
import ChangingName from './components/ChangingName';
import ChangingUsername from './components/ChangingUsername';
import ChangingEmail from './components/ChangingEmail';
import icons from '../../../../../utils/faIcons';
import DeleteModal from '../../components/DeleteModal';

export default function BasicInfoPage() {
  useDocumentTitle('Profile Basic Info');

  const { auth } = useAuth();

  const [editName, setEditname] = useState(false);
  const [editUserName, setEditUsername] = useState(false);
  const [editEmail, setEditEmail] = useState(false);

  const [isMobile, setIsMobile] = useState(false);
  const [deletePopupOpen, setDeletePopupOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 640);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div>
      <h1 className="mb-5 text-2xl font-bold lg:mb-12">Profile</h1>

      <div>
        <div >
          {editName ? (
            <div className="flex flex-col gap-1 lg:w-[500px] lg:gap-1">
              <ChangingName />
              <button
                className="btn-light flex-center flex w-fit items-center gap-2 rounded-xl lg:px-3 lg:py-1 "
                onClick={() => setEditname(!editName)}
              >
                <FontAwesomeIcon icon={icons.back} />
                Back
              </button>
            </div>
          ) : (
            <div className="flex gap-8 lg:gap-20">
              <div className=" w-[220px] lg:w-[400px]">
                <div className="mb-3 lg:mb-4">
                  <UserData icon={icons.user} title="First Name" value={auth.firstName} />
                </div>
                <div>
                  {' '}
                  <UserData icon={icons.user} title="Last Name" value={auth.lastName} />{' '}
                </div>
              </div>
              <div className="flex">
                <button
                  onClick={() => setEditname(!editName)}
                  className="btn-primary flex-center flex w-[70px] items-center gap-1 rounded-xl py-1 text-sm font-semibold sm:text-base"
                >
                  <FontAwesomeIcon icon={icons.editName} />
                  Edit
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="mt-10">
          {editUserName ? (
            <div className="flex flex-col gap-1 lg:w-[500px] lg:gap-1">
              <ChangingUsername />
              <button
                className="btn-light flex-center flex w-fit items-center gap-2 rounded-xl lg:px-3 lg:py-1"
                onClick={() => setEditUsername(!editUserName)}
              >
                <FontAwesomeIcon icon={icons.back} />
                Back
              </button>
            </div>
          ) : (
            <div className="flex gap-8 lg:gap-20">
              {' '}
              <div className=" w-[220px] lg:w-[400px]">
                <UserData icon={icons.username} title="Username" value={auth.username} />
              </div>
              <div>
                <button
                  onClick={() => setEditUsername(!editUserName)}
                  className="btn-primary flex-center flex w-[70px] items-center gap-1 rounded-xl py-1 text-sm font-semibold sm:text-base"
                >
                  <FontAwesomeIcon icon={icons.editUserName} />
                  Edit
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="mt-10">
          {editEmail ? (
            <div className="flex flex-col gap-1 lg:w-[500px] lg:gap-1">
              <ChangingEmail />
              <button
                className="btn-light flex-center flex w-fit items-center gap-2 rounded-xl px-3 py-1"
                onClick={() => setEditEmail(!editEmail)}
              >
                <FontAwesomeIcon icon={icons.back} />
                Back
              </button>
            </div>
          ) : (
            <div className="flex lg:gap-20">
              <div className="flex flex-col lg:flex-row lg:gap-20">
                <div className=" lg:w-[400px] w-[320px]">
                  <UserData icon={icons.email} title="Email" value={auth.email} />
                </div>
                <div className="mt-3 lg:mt-0 lg:w-0 ">
                  <button
                    onClick={() => setEditEmail(!editEmail)}
                    className="btn-primary flex-center flex w-[70px] items-center gap-1 rounded-xl  py-3 text-sm font-semibold sm:text-base"
                  >
                    <FontAwesomeIcon icon={icons.editEmail} />
                    Edit
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <div>
        {' '}
        {isMobile && (
          <button
            className=" mt-5 flex w-full items-center gap-2 rounded-xl p-4 text-red-500 transition-colors hover:bg-red-50"
            onClick={() => setDeletePopupOpen(true)}
          >
            <FontAwesomeIcon icon={icons.trash} />
            Delete your Account
          </button>
        )}
        <style>{`.active { color: #7050FF; }`}</style>
        {deletePopupOpen && <DeleteModal setDeletePopupOpen={setDeletePopupOpen} />}
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
