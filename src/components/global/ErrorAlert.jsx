import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons';

/**
 * `ErrorAlert` is a component that displays an error message inside a styled div.
 *
 * @param {Object} props - The properties passed to the component.
 * @param {string} props.message - The error message to be displayed next to the error icon.
 * @returns {ReactElement} A div element that wraps the error icon and the message.
 */

function ErrorAlert({ message }) {
  return (
    <div className="flex animate-fade-in-fast items-center gap-3 bg-proerror-50 px-4 py-3 text-sm text-proerror-100">
      <FontAwesomeIcon icon={faExclamationCircle} />
      <div>{message}</div>
    </div>
  );
}

export default ErrorAlert;
