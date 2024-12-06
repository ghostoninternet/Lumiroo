import PropTypes from 'prop-types';
import { useState } from 'react';

const TimeDropdown = ({ options, selectedTime, onTimeSelect, isEndTime }) => {
  const [inputTime, setInputTime] = useState(selectedTime?.value || '');

  const handleTimeInput = (e) => {
    let value = e.target.value;
    setInputTime(value);

    // Validate time format using regex
    const timeRegex = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/;
    if (timeRegex.test(value)) {
      onTimeSelect({ label: value, value: value });
    }
  };

  return (
    <div className={`absolute ${isEndTime ? 'left-[-100px]' : 'left-0'} top-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-[9999] w-[280px]`}>
      {/* Input section */}
      <div className="p-3 border-b border-gray-200">
        <input
          type="time"
          value={inputTime}
          onChange={handleTimeInput}
          className="w-full px-3 py-1.5 text-sm border border-gray-200 rounded-md 
                   focus:outline-none focus:ring-2 focus:ring-green-500"
          step="300" // 5 minutes interval
        />
      </div>

      {/* Quick selection buttons */}
      <div className="p-2 grid grid-cols-4 gap-2">
        {options.map((item) => (
          <button
            key={item.value}
            className={`
              px-2 py-1.5 text-sm rounded-md border
              transition-colors duration-200
              ${item.value === selectedTime?.value
                ? 'bg-green-600 text-white border-green-600'
                : 'bg-white text-gray-700 border-gray-200 hover:bg-green-50'
              }
            `}
            onClick={() => {
              setInputTime(item.value);
              onTimeSelect(item);
            }}
          >
            {item.label}
          </button>
        ))}
      </div>
    </div>
  );
};

TimeDropdown.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired
    })
  ).isRequired,
  selectedTime: PropTypes.shape({
    label: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired
  }),
  onTimeSelect: PropTypes.func.isRequired,
  isEndTime: PropTypes.bool
};

export default TimeDropdown;