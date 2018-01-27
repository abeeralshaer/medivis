import React from 'react';
import PropTypes from 'prop-types';
import { Col, Row } from 'react-bootstrap';
import classes from './styles/Student.styles.scss';


const DetailsTable = ({ showDetails, data }) => {
  if (showDetails) {
    return (
      <Col md={12}>
        <Row className={classes.detailsTableHead}>
          <Col md={6}>
            <div>Question</div>
          </Col>
          <Col md={2}>
            <div>Answer</div>
          </Col>
          <Col md={2}>
            <div>Submitted</div>
          </Col>
          <Col md={2}>
            <div>Got it right?</div>
          </Col>
        </Row>
        {data.map(elem => (
          <Row className={classes.detailsTableRow}>
            <Col md={6}>
              <div>
                {elem.question}
              </div>
            </Col>
            <Col md={2}>
              <div>
                {elem.answer}
              </div>
            </Col>
            <Col md={2}>
              <div>
                {elem.submitted}
              </div>
            </Col>
            <Col md={2}>
              <div>
                {elem.status}
              </div>
            </Col>
          </Row>
        ))}
      </Col>);
  }
  return null;
};

DetailsTable.propTypes = {
  showDetails: PropTypes.bool.isRequired,
  data: PropTypes.object.isRequired,
};

export default DetailsTable;
