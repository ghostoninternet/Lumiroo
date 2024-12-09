const convertTime = (hours, minutes) => {
  const seconds = parseInt(hours, 10) * 3600 + parseInt(minutes, 10) * 60;
  return seconds;
};

export default convertTime;
