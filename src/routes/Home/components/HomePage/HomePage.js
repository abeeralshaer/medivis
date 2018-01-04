import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { compose } from 'recompose'
import { firebaseConnect, populate } from 'react-redux-firebase'
import Theme from 'theme'
import { withNotifications } from 'modules/notification'
import QuizzesList from '../QuizzesList'
import classes from './HomePage.scss'

// Populate owner from users collection
const populates = [
  {
    child: 'owner', // parameter to populate
    root: 'users' // collection from which to gather children
    // childAlias: 'ownerObj' // place result somewhere else on object
  }
]

// Component enhancer
const enhance = compose(
  withNotifications, // adds props.showError from notfication module
  firebaseConnect([
    // Create Firebase query for for 20 most recent quizzes
    {
      path: 'quizzes/fakeStudentID',
      queryParams: ['orderByKey', 'limitToLast=10'],
      populates
    }
  ]),
  // firestoreConnect([{ collection: 'quizzes' }]) // get data from firestore
  connect(({ firebase, firebase: { auth } }) => ({
    uid: auth.uid,
    quizzes: populate(firebase, 'quizzes', populates) // populate quizzes with users data from redux
    // quizzes: firebase.ordered.quizzes // if using ordering such as orderByChild or orderByKey
    // quizzes: firestore.ordered.quizzes, // firestore data from firestoreConnect
  }))
)

const Home = ({ quizzes, uid }) => {
  return (
    <div
      className={classes.container}
      style={{ color: Theme.palette.primary2Color }}>
      <div className={classes.quizzes}>
        {uid &&
          quizzes && <QuizzesList quizzes={quizzes.fakeStudentID} uid={uid} />}
        {!uid && <h1>Welcome to Medivis!</h1>}
      </div>
    </div>
  )
}

Home.propTypes = {
  quizzes: PropTypes.oneOfType([
    PropTypes.object, // object if using firebase.data
    PropTypes.array // array if using firebase.ordered
  ]),
  uid: PropTypes.string
}

export default enhance(Home)
