import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import useCompany from '../../../../../hooks/useCompany';
import Alert from '../../../../../components/ui/Alert';
import icons from '../../../../../utils/faIcons';

export default function CompanyInfoSection() {
  const { company } = useCompany();

  return company.loading ? (
    <section className="flex-center h-56 flex-col gap-4 rounded-xl bg-gray-100">
      <FontAwesomeIcon icon={icons.spinner} spin className="text-4xl text-pro-300" />
      <p>Loading company info...</p>
    </section>
  ) : company.error ? (
    <Alert.Error message={company.error} />
  ) : (
    <section className="flex flex-col gap-3">
      <p className="mt-2 rounded-xl bg-gray-100 p-5 text-3xl font-bold text-gray-800">{company.data.name}</p>
      <p className="mt-2 rounded-xl bg-gray-100 p-5">{company.data.description}</p>
    </section>
  );
}
