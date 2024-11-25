import React, { useEffect, useState } from "react";
// import { getPlayground } from "../../apis/playground";
import { FaCaretDown, FaSearch, FaArrowRight, FaClock } from "react-icons/fa";
import { addresses, attractions } from "../../constants/playground";
import FilterCheckbox from "../../components/Checkbox/FilterCheckbox";
import PlaygroundResults from "./PlaygroundResults";


function PlaygroundRecommendation() {
  const [selectedAddress, setSelectedAdress] = useState("All addresses");
  const [showAddressDropdown, setShowAddressDropdown] = useState(false);
  const shortAttractions = attractions.slice(0, 12);
  const [checkedAttractions, setCheckedAttractions] = useState(
    new Array(attractions.length).fill(false)
  );
  const [attractionSearch, setAttractionSearch] = useState("");
  const [attractionSearchResult, setAttractionSearchResult] =
    useState(attractions);
  const [isExpanded, setIsExpanded] = useState(false);

  const handleToggleAddress = (label) => {
    setSelectedAdress(label);
    setShowAddressDropdown(false);
  };

  const handleSearchAttraction = (e) => {
    setAttractionSearch(e.target.value);
    const searchResult = attractions.filter((item) =>
      item?.label.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setAttractionSearchResult(searchResult);
  };

  const handleConfirm = () => {
    setIsExpanded(false);
  };

  const handleExpandedAttraction = () => {
    setIsExpanded(true);
  };
  // const fetchPlayground = async () => {
  //   try {
  //     const response = await getPlayground();
  //     const data = response.data;
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // useEffect(() => {
  //   fetchPlayground();
  // }, []);

  return (
    <div className="flex" style={{ height: "calc(100vh - 130px)" }}>
      <div className="w-[20%] flex flex-col gap-6 py-4 px-4 bg-green-50 border">
        <div className="relative">
          <button
            className="flex w-[70%] border items-center bg-white"
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
                    item.label === selectedAddress ? "bg-gray-300" : "bg-white"
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
          <div className="border">
            <FilterCheckbox
              options={shortAttractions}
              checkedState={checkedAttractions}
              setCheckedState={setCheckedAttractions}
              checkboxWidth="45%"
            />
          </div>
          <button
            className="w-14 text-[12px] bg-green-500 hover:bg-green-700 rounded-md shadow-md text-gray-50 text-white py-1 px-2"
            onClick={() => handleExpandedAttraction()}
          >
            もっと
          </button>
        </div>

        {isExpanded && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-20">
            <div className="flex flex-col gap-5 absolute top-[94px] left-[16px] z-30 bg-white w-[50%] h-[50%] px-3 pt-4 border">
              <div className="flex flex-col pl-2 pr-4 gap-2">
                <span className="font-bold">アトラクション</span>
                <div className="flex items-center rounded-2xl border w-[50%] ml-auto gap-4 px-4 py-1 ">
                  <FaSearch />
                  <input
                    className="w-full focus:outline-none"
                    type="text"
                    placeholder="検索"
                    value={attractionSearch}
                    onChange={handleSearchAttraction}
                  />
                </div>
              </div>
              <div className="h-[290px] border">
                <FilterCheckbox
                  options={attractionSearchResult}
                  checkedState={checkedAttractions}
                  setCheckedState={setCheckedAttractions}
                  checkboxWidth="15%"
                />
              </div>
              <div className="ml-auto px-8 ">
                <button
                  className="w-30 text-sm bg-green-500 hover:bg-green-700 rounded-md shadow-md text-gray-50 text-white py-1 px-2"
                  onClick={() => handleConfirm()}
                >
                  確認する
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="flex flex-col gap-1">
          <span className="font-bold">時間</span>
          <div className="border bg-white flex w-[70%] items-center px-4 h-10">
            <div className="flex-1 flex gap-4 items-center">
              <button className="w-30 text-sm rounded-md py-1 px-2 border">
                06:00
              </button>
              <FaArrowRight />
              <button className="w-30 text-sm rounded-md py-1 px-2 border">
                22:00
              </button>
            </div>
            <FaClock />
          </div>
        </div>

        {/* <div className="flex flex-col gap-1">
          <span className="font-bold">価格帯</span>
          <div className="border bg-white flex w-[70%] items-center px-4 h-10">
            <div className="flex-1 flex gap-4 items-center">
              <button className="w-30 text-sm rounded-md py-1 px-2 border">
                06:00
              </button>
              <FaArrowRight />
              <button className="w-30 text-sm rounded-md py-1 px-2 border">
                22:00
              </button>
            </div>
            <FaClock />
          </div>
        </div>
        <div></div>
        <button>filter</button> */}
      </div>

      <div className="w-[80%]">
        <PlaygroundResults />
      </div>

    </div>
  );
}

export default PlaygroundRecommendation;
