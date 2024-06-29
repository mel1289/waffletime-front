import moment from "moment"

export const isBusinessOpen = () => {
  const date = moment()

  if (date.day() == 5 || date.day() == 6 || date.day() == 0) {

    if (date.hours() >= 18 && date <= date.endOf('day')) {
      return true;
    }
    if (date.hours() >= 0 && date.hours() <= 4) {
      return true;
    }
  } else {
    if (date.hours() >= 18 && date <= date.endOf('day')) {
      return true;
    }
    if (date.hours() >= 0 && date.hours() <= 1) {
      return true;
    }
  }
  return true;
};
