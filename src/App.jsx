import { useEffect, useMemo, useState } from 'react';
import GameCard from './GameCard.jsx';
import './style.css';

const BUILD = (import.meta.env.VITE_BUILD_SHA || 'local').slice(0, 7);

function App() {
  const [games, setGames] = useState([]);
  const [status, setStatus] = useState('loading');
  const [field, setField] = useState('All fields');

  useEffect(() => {
    fetch('/schedule.json')
      .then((response) => {
        if (!response.ok) throw new Error('Schedule request failed');
        return response.json();
      })
      .then((data) => {
        setGames(data);
        setStatus('ready');
      })
      .catch(() => setStatus('error'));
  }, []);

  const fields = useMemo(
    () => [...new Set(games.map((game) => game.field))].sort(),
    [games],
  );
  const visibleGames = games.filter(
    (game) => field === 'All fields' || game.field === field,
  );

  function toggleGame(gameId) {
    setGames((currentGames) =>
      currentGames.map((game) =>
        game.id === gameId ? { ...game, cancelled: !game.cancelled } : game,
      ),
    );
  }

  return (
    <main className="page-shell">
      <header className="masthead">
        <img
          className="team-logo"
          src="/ensignit360-team2.png"
          alt="Ensign IT360 Team 2"
        />
        <span className="season-label">FALL 2026 · WASATCH FRONT</span>
        <h1>Wasatch Front Fall Sports Schedule</h1>
        <p className="lede">Find your game, field, and kickoff time.</p>
      </header>

      <section className="schedule-panel" aria-label="Game schedule">
        <div className="schedule-toolbar">
          <div>
            <p className="section-kicker">WEEKEND FIXTURES</p>
            <h2>Upcoming games</h2>
          </div>
          <label className="field-filter">
            <span>Field</span>
            <select value={field} onChange={(event) => setField(event.target.value)}>
              <option>All fields</option>
              {fields.map((fieldName) => (
                <option key={fieldName}>{fieldName}</option>
              ))}
            </select>
          </label>
        </div>

        {status === 'loading' && (
          <p className="message" role="status">Loading the schedule...</p>
        )}
        {status === 'error' && (
          <p className="message error" role="alert">Could not load the schedule.</p>
        )}
        {status === 'ready' && (
          <>
            <p className="game-count" aria-live="polite">
              <strong>{visibleGames.length}</strong>{' '}
              {visibleGames.length === 1 ? 'game' : 'games'} shown
            </p>
            {visibleGames.length > 0 ? (
              <ul className="games-list">
                {visibleGames.map((game) => (
                  <GameCard key={game.id} game={game} onToggle={toggleGame} />
                ))}
              </ul>
            ) : (
              <p className="message">No games are scheduled for this field.</p>
            )}
          </>
        )}
      </section>

      <footer className="build-stamp">Build {BUILD}</footer>
    </main>
  );
}

export default App;
