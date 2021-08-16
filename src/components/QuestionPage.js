import React from 'react'
import { connect } from 'react-redux'
import Poll from './Poll'
import PageNotFound from './PageNotFound'

function QuestionPage(props) {

  const { id, questions } = props
  const question = questions[id]

  if (question === undefined) {
    return <PageNotFound />
  }

  return (
    <div className='question-page-container'>
      <h2 className='question-page-title'>Answer the Question</h2>
      <Poll id={id} />
    </div>
  )
}

function mapStateToProps({ authedUser, questions }, props) {

  const { id } = props.match.params;

  return {
    id,
    questions
  }
}

export default connect(mapStateToProps)(QuestionPage)
