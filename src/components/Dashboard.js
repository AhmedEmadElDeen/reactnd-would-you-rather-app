import React, { Component} from 'react'
import { connect } from 'react-redux'
import UnansweredQuestions from './UnansweredQuestions'
import AnsweredQuestions from './AnsweredQuestions'

class Dashboard extends Component {

  state = {
    showPendingQuestions: true
  }

  viewQuestions = () => {
    this.setState({
      showPendingQuestions: true
    })
  }

  viewResults = () => {
    this.setState({
      showPendingQuestions: false
    })
  }

  render() {

    const { showPendingQuestions } = this.state
    const { questionIds, answeredQuestionIds } = this.props

    return (
      <div className='dashboard-container'>
        <div className='questions-btns'>
          <button className='question-btn unanswered-btn' onClick={this.viewQuestions}>UNANSWERED</button>
          <button className='question-btn results-btn' onClick={this.viewResults}>ANSWERED</button>
        </div>

        {(showPendingQuestions && questionIds.length === 0) &&
          <div className='question-end'>Nothing left to answer!</div>}

        <div>
          {(showPendingQuestions === true) &&
            <ul className='questions-list'>
              {questionIds.map((id) => (
                <li key={id}>
                  <UnansweredQuestions id={id}/>
                </li>
              ))}
            </ul>}

          {showPendingQuestions === false &&
            <ul className='questions-list'>
              {answeredQuestionIds.map((id) => (
                <li key={id}>
                  <AnsweredQuestions id={id}/>
                </li>
              ))}
            </ul>}
        </div>
      </div>
    )
  }
}

function mapStateToProps({ authedUser, questions }) {

  const unansweredQuestions = Object.values(questions)
    .filter((question) =>
      !question.optionOne.votes.includes(authedUser) &&
      !question.optionTwo.votes.includes(authedUser))

  const answeredQuestions = Object.values(questions)
    .filter((question) =>
      question.optionOne.votes.includes(authedUser) ||
      question.optionTwo.votes.includes(authedUser))

  return {
    authedUser,
    questionIds: Object.values(unansweredQuestions)
      .sort((a,b) => b.timestamp - a.timestamp).map((question) => question.id),
    answeredQuestionIds: Object.values(answeredQuestions)
      .sort((a,b) => b.timestamp - a.timestamp).map((question) => question.id)
  }
}

export default connect(mapStateToProps)(Dashboard)
