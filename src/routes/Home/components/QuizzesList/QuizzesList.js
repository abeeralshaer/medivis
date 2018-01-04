import React from 'react'
import PropTypes from 'prop-types'
import { map } from 'lodash'
import { compose } from 'recompose'
import { isLoaded, isEmpty, withFirebase } from 'react-redux-firebase'
import CircularProgress from 'material-ui/CircularProgress'
import Paper from 'material-ui/Paper'
import Subheader from 'material-ui/Subheader'
import { withNotifications } from 'modules/notification'
import classes from './QuizzesList.scss'
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn
} from 'material-ui/Table'

const QuizzesList = ({ quizzes }) => (
  <Paper className={classes.container}>
    {!isLoaded(quizzes) ? (
      <CircularProgress />
    ) : !isEmpty(quizzes) ? (
      <div>
        <Subheader>Quizzes</Subheader>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHeaderColumn>ID</TableHeaderColumn>
              <TableHeaderColumn>Name</TableHeaderColumn>
              <TableHeaderColumn>Score</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody>
            {map(quizzes, (quiz, id) => (
              <TableRow>
                <TableRowColumn>{quiz.quizID}</TableRowColumn>
                <TableRowColumn>{quiz.quizName}</TableRowColumn>
                <TableRowColumn>{quiz.quizScore}</TableRowColumn>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    ) : (
      <div className={classes.list}>No Quizzes</div>
    )}
  </Paper>
)

QuizzesList.propTypes = {
  quizzes: PropTypes.object,
  firebase: PropTypes.object // eslint-disable-line react/no-unused-prop-types
}

export default compose(
  withFirebase, // firebaseConnect() can also be used
  withNotifications // adds props.showError from notfication module
)(QuizzesList)
