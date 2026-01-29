export default function SuggestionCard({ text, onClick }) {
  return (
    <button
      onClick={onClick}
      className="bg-gray-800 hover:bg-gray-700 border border-gray-700 rounded-lg p-4 text-left transition-colors duration-200 cursor-pointer"
    >
      <p className="text-white font-medium">{text}</p>
    </button>
  )
}