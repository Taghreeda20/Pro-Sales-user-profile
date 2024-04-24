import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { paths, roles } from '../../../../../utils/utils';
import useAuth from '../../../../../hooks/useAuth';
import DeleteCustomerPopup from './DeleteCustomerPopup';
import icons from '../../../../../utils/faIcons';

function CustomerHeaderSection({ editingMode, setEditingMode, deletePopupOpen, setDeletePopupOpen, error }) {
  const { auth } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="flex flex-wrap items-center justify-between gap-2">
      <div className="flex-center gap-2">
        <button
          onClick={() => navigate(`/${paths.customers}`)}
          className="h-10 w-10 rounded-full text-xl text-gray-800 transition-colors hover:bg-gray-100"
        >
          <FontAwesomeIcon icon={icons.back} />
        </button>
        <h1>Customer Details</h1>
      </div>
      {!error && auth.roles.includes(roles.moderator) && (
        <div className="flex gap-2">
          {editingMode && (
            <>
              <button
                className="btn-danger flex-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold sm:text-base"
                onClick={() => setDeletePopupOpen(true)}
              >
                <FontAwesomeIcon icon={icons.trash} />
                Delete Customer
              </button>
              {deletePopupOpen && <DeleteCustomerPopup setDeletePopupOpen={setDeletePopupOpen} />}
            </>
          )}
          <button
            onClick={() => setEditingMode(!editingMode)}
            className={`flex-center animate-fade-in-medium gap-2 rounded-xl px-4 py-2 text-sm font-semibold sm:text-base ${editingMode ? 'btn-secondary' : 'btn-primary '}`}
          >
            <FontAwesomeIcon icon={editingMode ? icons.x : icons.edit} />
            {editingMode ? 'Cancel Editing' : 'Edit'}
          </button>
        </div>
      )}
    </div>
  );
}

export default CustomerHeaderSection;
