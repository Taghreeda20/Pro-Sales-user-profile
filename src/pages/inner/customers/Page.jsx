import useDocumentTitle from '../../../hooks/useDocumentTitle';
import AllCustomersHeaderSection from './components/header-section/Section';
import LastWeekCustomersSection from './components/last-week-customers-section/Section';
import AllCustomersSection from './components/all-customers-section/Section';

function Customers() {
  useDocumentTitle('All Customers');

  return (
    <div className="flex flex-col gap-3">
      <AllCustomersHeaderSection />
      <LastWeekCustomersSection />
      <AllCustomersSection />
    </div>
  );
}

export default Customers;
