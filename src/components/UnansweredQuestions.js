import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

function UnansweredQuestions (props) {

  const { authedUser, question, users, id } = props

  return (
    <div className='question-box'>
      <div className='question-box-form'>
        {authedUser === question.author
          ? <div className="question-author">You asked:</div>
          : <div className="question-author">{users[question.author].name} asks:</div>}
        <h3 className='question-form-title'>Would you rather...</h3>
        <div className='box-choice'>
          <p>{question.optionOne.text}</p>
          <p>or</p>
          <p>{question.optionTwo.text}</p>
        </div>
        <Link to={`question/${id}`} className='quiz-btn'>
          GO TO POLL
        </Link>
      </div>
      <img
        src={users[question.author].avatarURL}
        alt={`Avatar of ${users[question.author].name}`}
        className='user-avatar'
      />
   </div>
  )
}

function mapStateToProps({ authedUser, users, questions }, { id }) {
  const question = questions[id]

  return {
    authedUser,
    question,
    users
  }
}

export default connect(mapStateToProps)(UnansweredQuestions )
