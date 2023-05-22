import {Component} from 'react'

import TabsList from '../TabsList'

import ImagesList from '../ImagesList'

import './index.css'

class MatchGame extends Component {
  state = {
    randomImg:
      'https://assets.ccbp.in/frontend/react-js/match-game/orange-img.png',
    activeTabId: 'FRUIT',
    score: 0,
    timerInSec: 60,
    isGameRunning: true,
  }

  componentDidMount() {
    this.timerId = setInterval(this.timeLimit, 1000)
  }

  componentWillUnmount() {
    clearInterval(this.timerId)
  }

  timeLimit = () => {
    const {timerInSec} = this.state

    if (timerInSec > 0) {
      this.setState(prevState => ({timerInSec: prevState.timerInSec - 1}))
    } else {
      this.setState({isGameRunning: false})
      clearInterval(this.timerId)
    }
  }

  getFilterImagesList = () => {
    const {imagesList} = this.props

    const {activeTabId} = this.state

    const filterImages = imagesList.filter(
      eachImg => eachImg.category === activeTabId,
    )

    return filterImages
  }

  toggleTab = tabId => {
    this.setState({activeTabId: tabId})
  }

  imageClicked = imageUrl => {
    const {randomImg} = this.state

    if (imageUrl === randomImg) {
      this.setState(prevState => ({score: prevState.score + 1}))
      this.generateRandomImage()
    } else {
      this.setState({isGameRunning: false})
      clearInterval(this.timerId)
    }
  }

  generateRandomImage = () => {
    const {imagesList} = this.props

    const randomImageListItem =
      imagesList[Math.floor(Math.random() * (imagesList.length - 1))]

    this.setState({randomImg: randomImageListItem.imageUrl})
  }

  resetGameAndStart = () => {
    this.setState({
      randomImg:
        'https://assets.ccbp.in/frontend/react-js/match-game/orange-img.png',
      activeTabId: 'FRUIT',
      score: 0,
      timerInSec: 60,
      isGameRunning: true,
    })
    this.timerId = setInterval(this.timeLimit, 1000)
  }

  renderMatchGamePage = () => {
    const {tabsList} = this.props

    const {randomImg, activeTabId} = this.state

    const filterImagesList = this.getFilterImagesList()
    return (
      <div className="match-game-app">
        <div>
          <img src={randomImg} alt="match" className="match-image-pic" />
        </div>
        <ul className="tab-list-container">
          {tabsList.map(eachTab => (
            <TabsList
              key={eachTab.tabId}
              toggleTab={this.toggleTab}
              eachTabItem={eachTab}
              isTabActive={eachTab.tabId === activeTabId}
            />
          ))}
        </ul>
        <ul className="image-list-container">
          {filterImagesList.map(eachImage => (
            <ImagesList
              key={eachImage.id}
              imageClicked={this.imageClicked}
              eachImageItem={eachImage}
            />
          ))}
        </ul>
      </div>
    )
  }

  renderScoreCardPage = () => {
    const {score} = this.state

    return (
      <div className="score-card-app-page">
        <div className="score-card-bg-container">
          <div className="score-card-items">
            <img
              src="https://assets.ccbp.in/frontend/react-js/match-game-trophy.png"
              alt="trophy"
              className="trophy-logo"
            />
            <p>YOUR SCORE</p>
            <p className="score-text-score-card">{score}</p>
            <button
              type="button"
              onClick={this.resetGameAndStart}
              className="play-again-button"
            >
              <div className="play-again-button-container">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/match-game-play-again-img.png"
                  alt="reset"
                  className="reset-logo"
                />
                <p className="play-again-text">PLAY AGAIN</p>
              </div>
            </button>
          </div>
        </div>
      </div>
    )
  }

  render() {
    const {score, isGameRunning, timerInSec} = this.state

    return (
      <div className="app-container">
        <ul className="navbar-container">
          <li>
            <img
              src="https://assets.ccbp.in/frontend/react-js/match-game-website-logo.png"
              alt="website logo"
              className="match-game-logo"
            />
          </li>
          <li className="score-time-container">
            <p className="score-text">
              Score: <span className="score-count">{score}</span>
            </p>
            <div className="timer-details-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/match-game-timer-img.png"
                alt="timer"
                className="timer-logo"
              />
              <p className="timer-text">{timerInSec} sec</p>
            </div>
          </li>
        </ul>
        {isGameRunning
          ? this.renderMatchGamePage()
          : this.renderScoreCardPage()}
      </div>
    )
  }
}

export default MatchGame
