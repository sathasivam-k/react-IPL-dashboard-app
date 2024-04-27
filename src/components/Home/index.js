// Write your code here
import {Component} from 'react'
import Loader from 'react-loader-spinner'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import TeamCard from '../TeamCard'
import './index.css'

class Home extends Component {
  state = {matchData: [], isLoading: true}

  componentDidMount() {
    this.getTeamCardData()
  }

  getTeamCardData = async () => {
    const response = await fetch('https://apis.ccbp.in/ipl')
    const data = await response.json()
    const formatedData = data.teams.map(eachitem => ({
      name: eachitem.name,
      id: eachitem.id,
      teamImageUrl: eachitem.team_image_url,
    }))
    this.setState({matchData: formatedData, isLoading: false})
  }

  renderTeamList = () => {
    const {matchData} = this.state
    return (
      <ul>
        {matchData.map(eachitem => (
          <TeamCard key={eachitem.id} cardDetails={eachitem} />
        ))}
      </ul>
    )
  }

  renderLoader = () => {
    return (
      <div data-testid="loader">
        <Loader type="Oval" color="#ffffff" height={50} width={50} />
      </div>
    )
  }

  render() {
    const {isLoading} = this.state
    return (
      <div>
        <div>
          <img
            src="https://assets.ccbp.in/frontend/react-js/ipl-logo-img.png"
            alt="ipl logo"
          />
          <h1>IPL Dashboard</h1>
        </div>
        <div>{isLoading ? this.renderLoader() : this.renderTeamList()}</div>
      </div>
    )
  }
}

export default Home
