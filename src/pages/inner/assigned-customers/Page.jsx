import { Navigate } from 'react-router-dom';
import useAuth from '../../../hooks/useAuth';
import useDocumentTitle from '../../../hooks/useDocumentTitle';
import { roles } from '../../../utils/utils';

function AssignedCustomers() {
  useDocumentTitle('Assigned Customers');
  
  const { auth } = useAuth();

  if (auth.roles.includes(roles.manager)) return <Navigate to="/" replace={true} />;

  return <h1>Customers assigned to me</h1>;
}

export default AssignedCustomers;
