export default function InterestCard({ interest }) {
  return (
    <div
      className={`rounded-xl bg-white p-5 text-lg font-bold -tracking-wider shadow-sm ${interest.isDisabled ? 'text-gray-500' : 'text-gray-800'}`}
    >
      {interest.name}
    </div>
  );
}
