import { faSquare } from '@fortawesome/free-regular-svg-icons';
import { faCheckSquare } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

/**
 * `Checkbox` is a component that displays a checkbox with a label.
 *
 * @param {Object} props - The properties passed to the component.
 * @param {string} props.label - The label to be displayed next to the checkbox.
 * @param {boolean} props.checked - Whether the checkbox is checked. If true, the checkbox displays a checkmark.
 * @param {Function} props.onClick - The function to be called when the checkbox is clicked or the spacebar or enter key is pressed.
 * @returns {ReactElement} A div element that wraps the checkbox and the label.
 */

function Checkbox({ label, checked, onClick }) {
  const handleKeyDown = (e) => {
    if (e.key === ' ' || e.key === 'Spacebar' || e.key === 'Enter') {
      e.preventDefault();
      onClick();
    }
  };

  return (
    <div
      tabIndex={0}
      onClick={onClick}
      onKeyDown={handleKeyDown}
      className="flex cursor-pointer items-center gap-1 text-progray-300"
    >
      <FontAwesomeIcon icon={checked ? faCheckSquare : faSquare} className="text-lg text-pro-300" />
      <p>{label}</p>
    </div>
  );
}

export default Checkbox;
