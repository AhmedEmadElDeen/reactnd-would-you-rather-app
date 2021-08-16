import React, { Component } from 'react'
import { connect } from 'react-redux'
import { handleAddQuestionAnswer } from '../actions/questions'
import AnsweredQuestions from './AnsweredQuestions'

class Poll extends Component {

  state = {
    option: '',
    toResults: false
  }

  handleChange = (event) => {
    this.setState({
      option: event.target.value
    })
  }

  handleSubmit = (event) => {
    event.preventDefault()

    const { dispatch, question, authedUser } = this.props
    const { option } = this.state

    if (option === '') {
      alert('Please select an answer')
    } else {
      dispatch(handleAddQuestionAnswer({
        authedUser,
        qid: question.id,
        answer: option
      }))
      this.setState(() => ({
        toResults: true
      }))
    }
  }

  render() {

    const { authedUser, question, users, id } = this.props
    const { toResults } = this.state

    if (toResults === true) {
      return <AnsweredQuestions id={id} />
    }

    return (

      <div className='question'>

       <form className="question-form" onSubmit={this.handleSubmit}>
         {authedUser === question.author
           ? <div className="question-author">You asked:</div>
           : <div className="question-author">{users[question.author].name} asks:</div>}
         <h3 className='question-form-title'>Would you rather...</h3>
         <div className='choice'>
           <input type='radio' name='options' value='optionOne'
            id='optionOne' onChange={this.handleChange}/>
           <label className="question-choice option-one" htmlFor='optionOne'>{question.optionOne.text}</label>
           <br/>

           <input type='radio' name='options' value='optionTwo'
            id='optionTwo' onChange={this.handleChange}/>
           <label className="question-choice option-two" htmlFor='optionTwo'>{question.optionTwo.text}</label>
           <br/>

           <button className='submit-btn' type='submit'>SUBMIT</button>
         </div>
       </form>

       <img
         src={users[question.author].avatarURL}
         alt={`Avatar of ${users[question.author].name}`}
         className='user-avatar'
       />
     </div>
    )
  }
}

function mapStateToProps({ authedUser, users, questions }, { id }) {
  const question = questions[id]

  return {
    authedUser,
    question,
    users
  }
}

export default connect(mapStateToProps)(Poll)
