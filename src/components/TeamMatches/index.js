// Write your code here
import {Component} from 'react'
import Loader from 'react-loader-spinner'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import LatestMatch from '../LatestMatch'
import MatchCard from '../MatchCard'
import './index.css'

const iplUrl = 'https://apis.ccbp.in/ipl/'

class TeamMatches extends Component {
  state = {teamMatchDetails: [], isLoading: true}

  componentDidMount() {
    this.getTeamMatchesData()
  }

  getFormattedData = data => ({
    umpires: data.umpires,
    result: data.result,
    manOfTheMatch: data.man_of_the_match,
    id: data.id,
    date: data.date,
    venue: data.venue,
    competingTeam: data.competing_team,
    competingTeamLogo: data.competing_team_logo,
    firstInnings: data.first_innings,
    secondInnings: data.second_innings,
    matchStatus: data.match_status,
  })

  getTeamMatchesData = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params
    const response = await fetch(`${iplUrl}${id}`)
    const data = await response.json()
    const formattedData = {
      teamBannerUrl: data.team_banner_url,
      latestMatchDetails: this.getFormattedData(data.latest_match_details),
      recentMatches: data.recent_matches.map(eachTeam =>
        this.getFormattedData(eachTeam),
      ),
    }
    this.setState({teamMatchDetails: formattedData, isLoading: false})
  }

  renderLoader = () => {
    return (
      <div data-testid="loader">
        <Loader type="Oval" color="#ffffff" height={50} width={50} />
      </div>
    )
  }

  renderMatchCard = () => {
    const {teamMatchDetails} = this.state
    const {recentMatches} = teamMatchDetails
    return (
      <ul>
        {recentMatches.map(eachItem => (
          <MatchCard key={eachItem.id} matchCardDetails={eachItem} />
        ))}
      </ul>
    )
  }

  renderLatestMatch = () => {
    const {teamMatchDetails} = this.state
    const {teamBannerUrl, latestMatchDetails} = teamMatchDetails
    return (
      <div>
        <img src={teamBannerUrl} alt="team banner" />
        <LatestMatch latestMatchData={latestMatchDetails} />
        {this.renderMatchCard()}
      </div>
    )
  }

  render() {
    const {isLoading} = this.state
    return (
      <div>{isLoading ? this.renderLoader() : this.renderLatestMatch()}</div>
    )
  }
}

export default TeamMatches
