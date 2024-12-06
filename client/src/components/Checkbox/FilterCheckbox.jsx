const FilterCheckbox = ({
  options,
  checkedState,
  setCheckedState,
  checkboxWidth,
}) => {
  const handleSelectCheckbox = (position) => {
    const updateCheckedState = [...checkedState];
    updateCheckedState[position] = !updateCheckedState[position];
    setCheckedState(updateCheckedState);
  };
  return (
    <div
      className={`flex flex-wrap gap-1 py-1 px-2 items-start gap-x-4 gap-y-8 bg-white`}
    >
      {options.map((item, index) => (
        <div
          key={index}
          className="flex gap-1"
          style={{ width: checkboxWidth }}
        >
          <input
            className="cursor-pointer accent-green-500"
            type="checkbox"
            value={item.name}
            checked={checkedState[index]}
            onChange={() => handleSelectCheckbox(index)}
          />
          <label
            className="text-sm cursor-pointer"
            htmlFor={`custom-checkbox-${index}`}
          >
            {item.name}
          </label>
        </div>
      ))}
    </div>
  );
};

export default FilterCheckbox;
