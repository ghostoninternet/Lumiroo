const convertStringToTime = (timeString) => {
  if (!timeString) return null;

  const [hour, minute] = timeString.split(":");
  return parseInt(hour) * 3600 + parseInt(minute) * 60;
};

export default convertStringToTime;
