const TimeInput = ({ hour, onChangeHour, minute, onChangeMinute }) => {
  const handleChangeHour = (e) => {
    let inputValue = e.target.value;
    if (inputValue === "") {
      onChangeHour("");
      return;
    }
    const numericValue = parseInt(inputValue, 10);
    if (!isNaN(numericValue) && numericValue >= 0 && numericValue <= 23) {
      const formattedValue = numericValue.toString().padStart(2, "0");
      onChangeHour(formattedValue);
    }
  };
  const handleChangeMinute = (e) => {
    let inputValue = e.target.value;
    if (inputValue === "") {
      onChangeMinute("");
      return;
    }
    const numericValue = parseInt(inputValue, 10);
    if (!isNaN(numericValue) && numericValue >= 0 && numericValue <= 59) {
      const formattedValue = numericValue.toString().padStart(2, "0");
      onChangeMinute(formattedValue);
    }
  };
  return (
    <div className="text-center border w-[80px] rounded-md">
      <input
        type="text"
        value={hour}
        onChange={handleChangeHour}
        min="0"
        max="23"
        className="w-5 text-sm text-center py-1 focus:outline-none"
        placeholder="入力する"
      />
      <span>:</span>
      <input
        type="text"
        value={minute}
        onChange={handleChangeMinute}
        min="0"
        max="59"
        className="w-5 text-sm text-center py-1 focus:outline-none"
        placeholder="入力する"
      />
    </div>
  );
};
export default TimeInput;
