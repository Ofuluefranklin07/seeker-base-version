export default function GitSearch({ query, setQuery }) {
  return (
    <div className="search">
      <input
        type="text"
        placeholder="Search GitHub username..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
    </div>
  );
}