export const setGrades = percentage => {
  if (percentage >= 97) {
    return "A+";
  } else if (percentage >= 93 && percentage <= 96) {
    return "A";
  } else if (percentage >= 90 && percentage <= 92) {
    return "A-";
  } else if (percentage >= 87 && percentage <= 89) {
    return "B+";
  } else if (percentage >= 83 && percentage <= 86) {
    return "B";
  } else if (percentage >= 80 && percentage <= 82) {
    return "B-";
  } else if (percentage >= 77 && percentage <= 79) {
    return "C+";
  } else if (percentage >= 73 && percentage <= 76) {
    return "C";
  } else if (percentage >= 70 && percentage <= 72) {
    return "C-";
  } else if (percentage >= 67 && percentage <= 69) {
    return "D+";
  } else if (percentage >= 63 && percentage <= 66) {
    return "D-";
  } else if (percentage >= 60 && percentage <= 62) {
    return "D";
  } else {
    return "F/E";
  }
};
