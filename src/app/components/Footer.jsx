export default function Footer() {
  return (
    <footer className="bg-black border-t border-gray-800 py-8 px-6">
      <div className="max-w-6xl text-gray-400 text-sm">
        © {new Date().getFullYear()} Savaqe. All rights reserved.
      </div>
    </footer>
  )
}