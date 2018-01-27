import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { Col, Row } from 'react-bootstrap';
import classes from './styles/Student.styles.scss';
import DetailsTable from './DetailsTable';
import data from './data';


class QuizesTable extends Component {
  static propTypes = {
    quiz: PropTypes.object.isRequired,
  }

  state = {
    showDetails: false,
  }

  render() {
    const { showDetails } = this.state;
    const {
      quiz: {
        name,
        progress,
        score,
        questions,
        data,
      },
    } = this.props;
    return (
      <Col md={12} classes={classes.quizesTableRow}>
        <Row className={classes.tableRow}>
          <Col md={6}>
            <div>
              {name}
            </div>
          </Col>
          <Col md={2}>
            <div>
              {progress}
            </div>
          </Col>
          <Col md={2}>
            <div>
              {score}
            </div>
          </Col>
          <Col md={2}>
            <div className={classes.detailsCell}>
              <div>
                {questions}
              </div>
              <div
                className={showDetails ? classes.arrowDown : classes.arrowUp}
                onClick={() => this.setState({ showDetails: !showDetails })}
                role="presentation"
              />
            </div>
          </Col>
        </Row>
        <DetailsTable showDetails={showDetails} data={data} />
      </Col>);
  }
}

export default QuizesTable;
