import React, { useEffect, useState } from "react";
import "./LiveCricketScore.css";

const LiveCricketScore = () => {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(
      "https://api.cricapi.com/v1/currentMatches?apikey=62035dbd-5297-4ee5-9e64-971e795d4b67&offset=0"
    )
      .then((res) => res.json())
      .then((result) => {
        setMatches(result.data || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="loading">Loading...</div>;

  return (
    <div className="scoreboard">
      {matches.map((match) => (
        <div className="match-card" key={match.id}>
          {/* Header */}
          <div className="match-header">
            <span className="match-type">{match.matchType.toUpperCase()}</span>
            <span className="match-status">{match.status}</span>
          </div>

          {/* Teams */}
          <div className="teams">
            <div className="team">
              <img src={match.teamInfo[0]?.img} alt="" />
              <h3>{match.teamInfo[0]?.name}</h3>
            </div>

            <span className="vs">VS</span>

            <div className="team">
              <img src={match.teamInfo[1]?.img} alt="" />
              <h3>{match.teamInfo[1]?.name}</h3>
            </div>
          </div>

          {/* Scores */}
          <div className="scores">
            {match.score?.map((inning, index) => (
              <p key={index}>
                <strong>{inning.inning}</strong>: {inning.r}/{inning.w} (
                {inning.o} ov)
              </p>
            ))}
          </div>

          {/* Footer */}
          <div className="match-footer">
            <p>{match.venue}</p>
            <p>{match.date}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default LiveCricketScore;
