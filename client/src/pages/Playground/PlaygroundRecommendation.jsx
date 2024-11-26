import { useEffect, useRef, useState } from "react";
import {
  FaCaretDown,
  FaSearch,
  FaArrowRight,
  FaClock,
  FaDollarSign,
} from "react-icons/fa";
import { openTime, closeTime } from "../../constants/playground";
import FilterCheckbox from "../../components/Checkbox/FilterCheckbox";
import PlaygroundResults from "./PlaygroundResults";
import TimeDropdown from "../../components/Dropdown/TimeDropdown";
import PriceInput from "../../components/Input/PriceInput";
import {
  filterPlaygrounds,
  getAreas,
  getAttractions,
  getPlayground,
} from "../../apis/playground";
import useClickOutside from "../../utils/useClickOutSide";

function PlaygroundRecommendation() {
  const [attractions, setAttractions] = useState([]);
  const [areas, setAreas] = useState([]);
  const [playgrounds, setPlaygrounds] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [limitPerPage, setLimitPerPage] = useState(6);
  const [totalPage, setTotalPage] = useState(null);
  const [isFiltering, setIsFiltering] = useState(false);

  const [selectedArea, setSelectedArea] = useState("すべての地域");

  const [showAreaDropdown, setShowAreaDropdown] = useState(false);

  const shortAttractions = attractions.slice(0, 12);
  const [checkedAttractions, setCheckedAttractions] = useState(
    new Array(attractions.length).fill(false)
  );
  const [attractionSearch, setAttractionSearch] = useState("");
  const [attractionSearchResult, setAttractionSearchResult] = useState([]);
  const [isExpanded, setIsExpanded] = useState(false);

  const [selectedOpenTime, setSelectedOpenTime] = useState(openTime[0]);
  const [showOpenTimeDropdown, setShowOpenTimeDropdown] = useState(false);

  const [selectedCloseTime, setSelectedCloseTime] = useState(closeTime[0]);
  const [showCloseTimeDropdown, setShowCloseTimeDropdown] = useState(false);

  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(99999999);

  const handleToggleArea = (label) => {
    setSelectedArea(label);
    setShowAreaDropdown(false);
  };

  const handleSearchAttraction = (e) => {
    setAttractionSearch(e.target.value);
    const searchResult = attractions.filter((item) =>
      item?.name.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setAttractionSearchResult(searchResult);
  };

  const handleConfirm = () => {
    setIsExpanded(false);
  };

  const handleExpandedAttraction = () => {
    setIsExpanded(true);
  };

  const handleSelectOpenTime = (item) => {
    setSelectedOpenTime(item);
    setShowOpenTimeDropdown(false);
  };

  const handleClickOpenTime = () => {
    setShowOpenTimeDropdown(!showOpenTimeDropdown);
    setShowCloseTimeDropdown(false);
  };

  const handleSelectCloseTime = (item) => {
    setSelectedCloseTime(item);
    setShowCloseTimeDropdown(false);
  };

  const handleClickCloseTime = () => {
    setShowCloseTimeDropdown(!showCloseTimeDropdown);
    setShowOpenTimeDropdown(false);
  };

  const handleClickFilter = async () => {
    console.log("🚀 ~ PlaygroundRecommendation ~ attractions:", attractions);
    console.log("🚀 ~ PlaygroundRecommendation ~ selectedArea:", selectedArea);
    console.log(
      "🚀 ~ PlaygroundRecommendation ~ attractions:",
      attractions.filter((_, index) => checkedAttractions[index])
    );
    console.log(
      "🚀 ~ PlaygroundRecommendation ~ selectedOpenTime:",
      selectedOpenTime
    );
    console.log(
      "🚀 ~ PlaygroundRecommendation ~ selectedCloseTime:",
      selectedCloseTime
    );
    fetchFilterPlaygrounds();
  };

  const fetchAttractions = async () => {
    try {
      const response = await getAttractions();
      const reponseData = response.data;
      setAttractions(reponseData);
      setAttractionSearchResult(reponseData);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchAreas = async () => {
    try {
      const response = await getAreas();
      const reponseData = response.data;
      setAreas([{ name: "すべての地域" }, ...reponseData]);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchPlaygrounds = async () => {
    try {
      const queryParams = new URLSearchParams();
      queryParams.append("limit", limitPerPage);
      queryParams.append("page", currentPage);
      const response = await getPlayground(queryParams);
      const responseData = response.data;
      console.log("🚀 ~ fetchPlaygrounds ~ responseData:", responseData);
      setPlaygrounds(responseData.data);
      setTotalPage(responseData.pagination.totalPage);
      setCurrentPage(Number.parseInt(responseData.pagination.currentPage));
    } catch (error) {
      console.log(error);
    }
  };

  const fetchFilterPlaygrounds = async () => {
    try {
      const selectedAreaValue = selectedArea;
      const selectedAttractions = attractions.filter(
        (_, index) => checkedAttractions[index]
      );
      const openingTime = selectedOpenTime.value;
      const closingTime = selectedCloseTime.value;
      const minAdmissionFee = minPrice;
      const maxAdmissionFee = maxPrice;
      const limit = limitPerPage;
      const page = currentPage;

      const queryParams = new URLSearchParams();

      if (selectedAreaValue !== "すべての地域") {
        queryParams.append("area", selectedAreaValue);
      }

      if (selectedAttractions.length !== 0) {
        selectedAttractions.forEach((attraction) => {
          queryParams.append("attractions", attraction._id);
        });
      }

      queryParams.append("openingTime", openingTime);
      queryParams.append("closingTime", closingTime);
      queryParams.append("minAdmissionFee", minAdmissionFee);
      queryParams.append("maxAdmissionFee", maxAdmissionFee);
      queryParams.append("limit", limit);
      queryParams.append("page", page);

      const response = await filterPlaygrounds(queryParams);
      setIsFiltering(true);
      const responseData = response.data;
      console.log("🚀 ~ fetchFilterPlaygrounds ~ responseData:", responseData);
      setPlaygrounds(responseData.data);
      setTotalPage(responseData.pagination.totalPage);
      setCurrentPage(Number.parseInt(responseData.pagination.currentPage));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (isFiltering) {
      fetchFilterPlaygrounds();
    } else {
      fetchPlaygrounds();
    }
  }, [currentPage]);

  useEffect(() => {
    fetchPlaygrounds();
    fetchAttractions();
    fetchAreas();
  }, []);
  const areaDropdownRef = useRef(null);
  const openTimeDropdownRef = useRef(null);
  const closeTimeDropdownRef = useRef(null);

  useClickOutside(areaDropdownRef, () => setShowAreaDropdown(false));
  useClickOutside(openTimeDropdownRef, () => setShowOpenTimeDropdown(false));
  useClickOutside(closeTimeDropdownRef, () => setShowCloseTimeDropdown(false));

  return (
    <div
      className="flex overflow-y-none"
      style={{ height: "calc(100vh - 130px)" }}
    >
      <div className="w-[21%] flex flex-col gap-8 py-4 px-4 bg-green-50 border">
        <div className="relative" ref={areaDropdownRef}>
          <button
            className="flex w-[70%] border items-center bg-white"
            onClick={() => setShowAreaDropdown(!showAreaDropdown)}
          >
            <span className="flex-1 text-left pl-1">{selectedArea}</span>
            <FaCaretDown className="border-l w-[1.5rem] h-[1.5rem]" />
          </button>

          {showAreaDropdown && (
            <div className="flex flex-col border w-[70%] absolute top-7 left-0 z-10 bg-white h-[200px] overflow-y-auto">
              {areas.map((item, index) => (
                <button
                  key={index}
                  className={`text-left pl-1 hover:bg-green-700 hover:text-white ${
                    item.name === selectedArea
                      ? "bg-green-500 text-white"
                      : "bg-white"
                  }`}
                  onClick={() => handleToggleArea(item.name)}
                >
                  {item.name}
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
            <div className="flex flex-col gap-5 absolute top-[94px] left-[16px] z-30 bg-white w-[50%] px-3 pt-4 border pb-5">
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
              <div className="border">
                <FilterCheckbox
                  options={attractionSearchResult}
                  checkedState={checkedAttractions}
                  setCheckedState={setCheckedAttractions}
                  checkboxWidth="15%"
                />
              </div>
              <div className="ml-auto px-8">
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

        <div className="flex flex-col gap-1 relative">
          <span className="font-bold">時間</span>
          <div className="border bg-white flex w-[70%] items-center px-4 h-10">
            <div className="flex-1 flex gap-4 items-center">
              <div ref={openTimeDropdownRef}>
                <button
                  className="w-30 text-sm rounded-md py-1 px-2 border"
                  onClick={() => handleClickOpenTime()}
                >
                  {selectedOpenTime.label}
                </button>
                {showOpenTimeDropdown && (
                  <TimeDropdown
                    options={openTime}
                    selectedTime={selectedOpenTime}
                    handleSelectTime={handleSelectOpenTime}
                  />
                )}
              </div>
              <FaArrowRight />
              <div ref={closeTimeDropdownRef}>
                <button
                  className="w-30 text-sm rounded-md py-1 px-2 border"
                  onClick={() => handleClickCloseTime()}
                >
                  {selectedCloseTime.label}
                </button>
                {showCloseTimeDropdown && (
                  <TimeDropdown
                    options={closeTime}
                    selectedTime={selectedCloseTime}
                    handleSelectTime={handleSelectCloseTime}
                  />
                )}
              </div>
            </div>
            <FaClock />
          </div>
        </div>

        <div className="flex flex-col gap-1">
          <span className="font-bold">価格帯</span>
          <div className="border bg-white flex w-[70%] items-center px-4 h-10">
            <div className="flex-1 flex gap-1 items-center">
              <PriceInput value={minPrice} setValue={setMinPrice} />
              <FaArrowRight />
              <PriceInput value={maxPrice} setValue={setMaxPrice} />
            </div>
            <FaDollarSign />
          </div>
        </div>

        <button
          className="w-20 text-sm bg-green-500 hover:bg-green-700 rounded-md shadow-md text-gray-50 text-white py-1 px-2 items-center self-center mt-2"
          onClick={() => handleClickFilter()}
        >
          確認する
        </button>
      </div>

      <div className="w-[79%]">
        <PlaygroundResults
          playgrounds={playgrounds}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          limitPerPage={limitPerPage}
          setLimitPerPage={setLimitPerPage}
          totalPage={totalPage}
        />
      </div>
    </div>
  );
}

export default PlaygroundRecommendation;
