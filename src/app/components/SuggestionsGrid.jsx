import SuggestionCard from './SuggestionCard'

export default function SuggestionsGrid({ onSuggestionClick }) {
  const suggestions = [
    "I'm a fitness enthusiast who knows React",
    "Help me build something for remote teams",
    "I want to solve a problem in education",
    "Generate a wireframe for a habit tracker app"
  ]

  return (
    <section className="bg-black px-6 py-12">
      <div className="max-w-2xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {suggestions.map((suggestion, index) => (
            <SuggestionCard 
              key={index}
              text={suggestion}
              onClick={() => onSuggestionClick(suggestion)}
            />
          ))}
        </div>
      </div>
    </section>
  )
}