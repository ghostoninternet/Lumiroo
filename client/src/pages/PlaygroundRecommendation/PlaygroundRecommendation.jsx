import React, { useEffect, useState } from "react";
import { getPlayground } from "../../apis/playground";
import { FaCaretDown } from "react-icons/fa";
import { addresses, attractions } from "../../constants/playground";

function PlaygroundRecommendation() {
  const [selectedAddress, setSelectedAdress] = useState("All addresses");
  const [showAddressDropdown, setShowAddressDropdown] = useState(false);
  const sortAttractions = attractions.slice(0, 12);
  const [checkedSortAttractions, setCheckedSortAttractions] = useState(
    new Array(sortAttractions.length).fill(false)
  );

  const handleToggleAddress = (label) => {
    setSelectedAdress(label);
    setShowAddressDropdown(false);
  };

  const handleSelectSortAttractions = (position) => {
    const updateCheckedState = checkedSortAttractions.map((item, index) => {
      index === position ? !item : item;
    });
    setCheckedSortAttractions(updateCheckedState);
  };

  const fetchPlayground = async () => {
    try {
      const response = await getPlayground();
      const data = response.data;
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchPlayground();
  }, []);

  return (
    <div className="flex h-full">
      <div className="w-[20%] h-screen flex flex-col gap-6 py-4 px-4">
        <div className="relative">
          <button
            className="flex w-[70%] border items-center"
            onClick={() => setShowAddressDropdown(!showAddressDropdown)}
          >
            <span className="flex-1 text-left pl-1">{selectedAddress}</span>
            <FaCaretDown className="border-l w-[1.5rem] h-[1.5rem]" />
          </button>
          {showAddressDropdown && (
            <div className="flex flex-col border w-[70%] absolute top-7 left-0 z-10 bg-white">
              {addresses.map((item, index) => (
                <button
                  key={index}
                  className={`text-left pl-1 hover:bg-gray-50 ${
                    item.label === selectedAddress ? "bg-green-50" : "bg-white"
                  }`}
                  onClick={() => handleToggleAddress(item.label)}
                >
                  {item.label}
                </button>
              ))}
            </div>
          )}
        </div>
        <div className="flex flex-col gap-1">
          <span className="font-bold">アトラクション</span>
          <div className="flex flex-wrap border gap-1 py-1 px-2">
            {sortAttractions.map((item, index) => (
              <div key={index} className="flex gap-1 w-[49%]">
                <input
                  className="cursor-pointer accent-green-500"
                  type="checkbox"
                  id={`custom-checkbox-${index}`}
                  name={item.value}
                  value={item.label}
                  checked={checkedSortAttractions[index]}
                  onChange={() => handleSelectSortAttractions(index)}
                />
                <label
                  className="text-sm cursor-pointer"
                  htmlFor={`custom-checkbox-${index}`}
                >
                  {item.label}
                </label>
              </div>
            ))}
          </div>
          <button className="w-[4rem] text-sm bg-green-500 hover:bg-green-700 rounded-[2px]">
            もっと
          </button>
        </div>
        <div>時間</div>
        <div>価格帯</div>
        <button>filter</button>
      </div>

      <div className="w-[80%] bg-green-500"> result filter</div>
    </div>
  );
}

export default PlaygroundRecommendation;
