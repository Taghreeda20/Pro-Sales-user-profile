import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { roles } from '../../../../../utils/utils';
import useAuth from '../../../../../hooks/useAuth';
import icons from '../../../../../utils/faIcons';

export default function CompanyInfoHeaderSection() {
  const { auth } = useAuth();

  return (
    <section className="flex justify-between">
      <h1>Company Info</h1>
      {auth.roles.includes(roles.manager) && (
        <button className="btn-primary flex-center gap-2 rounded-xl p-3 px-5 text-xs sm:text-sm">
          <FontAwesomeIcon icon={icons.edit} />
          <span className="capitalize ">Update Info</span>
        </button>
      )}
    </section>
  );
}
