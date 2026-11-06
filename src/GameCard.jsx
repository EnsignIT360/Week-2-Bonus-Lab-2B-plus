function GameCard({ game, onToggle }) {
  const formattedDate = new Date(`${game.date}T00:00:00`).toLocaleDateString(
    'en-US',
    { month: 'short', day: 'numeric' },
  );

  return (
    <li className={game.cancelled ? 'game-card cancelled' : 'game-card'}>
      <div className="game-date" aria-label={game.date}>{formattedDate}</div>
      <div className="game-details">
        <strong className="matchup">{game.home} <span>vs</span> {game.away}</strong>
        <span className="game-meta">{game.time} · {game.field}</span>
      </div>
      <button
        className={game.cancelled ? 'game-action reinstate' : 'game-action'}
        type="button"
        onClick={() => onToggle(game.id)}
        aria-label={`${game.cancelled ? 'Reinstate' : 'Cancel'} ${game.home} vs ${game.away}`}
      >
        {game.cancelled ? 'Reinstate' : 'Cancel'}
      </button>
    </li>
  );
}

export default GameCard;
