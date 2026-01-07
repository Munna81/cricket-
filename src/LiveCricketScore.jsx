import { useEffect, useState } from "react";
import "./LiveCricketScore.css";

export default function LiveCricketScore() {
  const [score, setScore] = useState(null);
  const [error, setError] = useState(false);

  const loadScore = async () => {
    try {
      const response = await fetch(
        "62035dbd-5297-4ee5-9e64-971e795d4b67"
      );

      const data = await response.json();

      setScore({
        team1: data.team1,
        score1: data.score1,
        over1: data.over1,
        team2: data.team2,
        score2: data.score2,
      });
    } catch (err) {
      setError(true);
    }
  };

  useEffect(() => {
    loadScore();
    const interval = setInterval(loadScore, 15000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="page">
      <div className="scorebox">
        {!score && !error && (
          <div className="loading">Loading Live Score...</div>
        )}

        {error && (
          <div className="error">Failed to load score</div>
        )}

        {score && (
          <>
            <div className="team">{score.team1}</div>
            <div className="score">{score.score1}</div>
            <div className="over">Overs: {score.over1}</div>

            <hr />

            <div className="team">{score.team2}</div>
            <div className="score">{score.score2}</div>
          </>
        )}
      </div>
    </div>
  );
}

