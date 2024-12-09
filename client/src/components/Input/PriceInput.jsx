const PriceInput = ({ value, onChange }) => {
  const handleChangeValue = (e) => {
    const inputValue = e.target.value;
    if (
      inputValue === "" ||
      (Number(inputValue) >= 0 && Number(inputValue) <= 9999999)
    ) {
      onChange(inputValue);
    }
  };
  return (
    <input
      type="number"
      value={value}
      onChange={handleChangeValue}
      min="0"
      max="9999999"
      className="border rounded-md w-20 text-sm text-center py-1 focus:outline-none focus:ring-2 focus:ring-green-500"
      placeholder="入力する"
    />
  );
};
export default PriceInput;
