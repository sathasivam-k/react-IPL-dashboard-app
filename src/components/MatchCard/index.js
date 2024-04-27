// Write your code here
import './index.css'

const MatchCard = props => {
  const {matchCardDetails} = props
  const {competingTeamLogo, competingTeam, matchStatus, result} =
    matchCardDetails
  return (
    <li>
      <div>
        <img src={competingTeamLogo} alt={`competing team ${competingTeam}`} />
        <p>{competingTeam}</p>
        <p>{result}</p>
        <p>{matchStatus}</p>
      </div>
    </li>
  )
}

export default MatchCard
