// Write your code here
import {Component} from 'react'
import './index.css'

class DigitalTimer extends Component {
  state = {
    timerValue: 25,
    minutes: 25,
    secoends: 0,
    isTimerRunning: false,
  }

  componentDidMount() {
    const {minutes} = this.state
    if (minutes > 0) {
      this.timerid = setInterval(this.onTimerStart, 1000)
    }
  }

  componentWillUnmount() {
    clearInterval(this.timerid)
    this.setState({secoends: 0})
  }

  onClickStartBtn = () => {
    const {isTimerRunning} = this.state
    this.setState({isTimerRunning: !isTimerRunning})
  }

  onDecrement = () => {
    const {isTimerRunning, minutes} = this.state

    if (isTimerRunning === false && minutes > 0) {
      this.setState(prevState => ({
        timerValue: prevState.timerValue - 1,
        minutes: prevState.minutes - 1,
      }))
    }
  }

  onIncrement = () => {
    const {isTimerRunning} = this.state

    if (isTimerRunning === false) {
      this.setState(prevState => ({
        timerValue: prevState.timerValue + 1,
        minutes: prevState.minutes + 1,
      }))
    }
  }

  onResetBtnClick = () => {
    const {timerValue} = this.state
    this.setState({isTimerRunning: false, secoends: 0, minutes: timerValue})
  }

  onTimerStart = () => {
    const {isTimerRunning, secoends, minutes, timerValue} = this.state

    if (minutes === 0 && secoends === 2) {
      this.componentWillUnmount()
      this.setState({isTimerRunning: false, minutes: timerValue, secoends: 0})
    }

    if (isTimerRunning === true && secoends === 0 && minutes > -1) {
      this.setState(prevState => ({
        secoends: 60,
        minutes: prevState.minutes - 1,
      }))
    }

    if (isTimerRunning === true && minutes > -1) {
      this.setState(prevState => ({secoends: prevState.secoends - 1}))
    }
  }

  render() {
    const {isTimerRunning, secoends, timerValue, minutes} = this.state

    return (
      <div className="bg">
        <h1 className="head">Digital Timer</h1>
        <div className="bg-2">
          <div className="timer-container">
            <div className="timer">
              <h1 className="timer-count">
                {minutes < 10 ? `0${minutes}` : `${minutes}`}:
                {secoends < 10 ? `0${secoends}` : `${secoends}`}
              </h1>
              <p className="timer-para">
                {' '}
                {isTimerRunning ? 'Running' : 'Paused'}
              </p>
            </div>
          </div>
          <div className="controls-container">
            <div className="control-butoon-container">
              <button
                onClick={this.onClickStartBtn}
                className="control-button"
                type="button"
              >
                <img
                  className="control-img"
                  alt={isTimerRunning ? 'pause icon' : 'play icon'}
                  src={
                    isTimerRunning
                      ? 'https://assets.ccbp.in/frontend/react-js/pause-icon-img.png'
                      : 'https://assets.ccbp.in/frontend/react-js/play-icon-img.png '
                  }
                />
                {isTimerRunning ? 'Pause' : 'Start'}
              </button>
              <button
                onClick={this.onResetBtnClick}
                className="control-button"
                type="button"
              >
                <img
                  className="control-img"
                  alt="reset icon"
                  src="https://assets.ccbp.in/frontend/react-js/reset-icon-img.png "
                />
                Reset
              </button>
            </div>
            <p className="ic-para">Set Timer limit</p>
            <div className="iccontainer">
              <button
                onClick={this.onDecrement}
                className="ic-btn"
                type="button"
              >
                -
              </button>
              <p className="count-Info">{timerValue}</p>
              <button
                onClick={this.onIncrement}
                className="ic-btn"
                type="button"
              >
                +
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default DigitalTimer
