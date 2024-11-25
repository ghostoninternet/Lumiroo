const TimeDropdown = ({ options, selectedTime, handleSelectTime }) => {
  return (
    <div className="flex flex-wrap bg-white w-[70%] gap-2 pl-4 py-4 border absolute top-[69px] left-0 z-10">
      {options.map((item, index) => (
        <button
          key={index}
          className={`w-[20%] text-sm rounded-md py-1 border hover:bg-green-700 hover:text-white ${
            item?.value === selectedTime?.value
              ? "bg-green-500 text-white"
              : "bg-white"
          }`}
          onClick={() => handleSelectTime(item)}
        >
          {item.label}
        </button>
      ))}
    </div>
  );
};

export default TimeDropdown;
