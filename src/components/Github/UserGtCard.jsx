import './Git.css'
export default function UserGtCard({ user }) {
  return (
    <div className="git-card">
      <img src={user.avatar_url} alt={user.login} />

      <h2>{user.name || user.login}</h2>

      <p>{user.bio || "No bio available"}</p>

      <div className="stats">
        <span>Followers: {user.followers}</span>
        <span>Following: {user.following}</span>
        <span>Repos: {user.public_repos}</span>
      </div>

      <a href={user.html_url} target="_blank">
        View Profile
      </a>
    </div>
  );
}