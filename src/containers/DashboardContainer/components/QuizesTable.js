import React from 'react';
import { Col, Row } from 'react-bootstrap';
import classes from './styles/Student.styles.scss';
import QuizesTableRow from './QuizesTableRow';
import data from './data';


const QuizesTable = () => (
  <Row className={classes.tableContainer}>
    <Col md={12} className={classes.quizesTable}>
      <div className={classes.quizesTableHeader}>
        <div className={classes.menuIcon} />
        <div>Overview</div>
      </div>
      <Row className={classes.quizesTableHeader}>
        <Col md={6}>
          <div>Tasks</div>
        </Col>
        <Col md={2}>
          <div>Progress</div>
        </Col>
        <Col md={2}>
          <div>Status</div>
        </Col>
        <Col md={2}>
          <div>Question</div>
        </Col>
      </Row>
      {data.map(elem => (
        <QuizesTableRow quiz={elem} />
        ))}
    </Col>
  </Row>
);

export default QuizesTable;
