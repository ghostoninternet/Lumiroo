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
import FilterInput from "../../components/Input/FilterInput";
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
    const [checkedAttractions, setCheckedAttractions] = useState(new Array(attractions.length).fill(false));
    const [attractionSearch, setAttractionSearch] = useState("");
    const [attractionSearchResult, setAttractionSearchResult] = useState([]);
    const [isExpanded, setIsExpanded] = useState(false);
    const [previousCheckedState, setPreviousCheckedState] = useState([]);
    const [selectedOpenTime, setSelectedOpenTime] = useState(openTime[0]);
    const [showOpenTimeDropdown, setShowOpenTimeDropdown] = useState(false);

    const [selectedCloseTime, setSelectedCloseTime] = useState(closeTime[0]);
    const [showCloseTimeDropdown, setShowCloseTimeDropdown] = useState(false);

    const [minPrice, setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState(99999999);
    const [isLoading, setIsLoading] = useState(false);

    const handleToggleArea = (label) => {
      setSelectedArea(label);
      setShowAreaDropdown(false);
    };

    const handleSearchAttraction = (e) => {
    const value = e.target.value;
    setAttractionSearch(value);
    const searchResult = attractions.filter((item) =>
      item?.name.toLowerCase().includes(value.toLowerCase())
    );
    setAttractionSearchResult(searchResult);
  };

    const handleConfirm = () => {
      setIsExpanded(false);
    };

    const handleExpandedAttraction = () => {
      setPreviousCheckedState([...checkedAttractions]);
      setIsExpanded(true);
    };

    const handleCancel = () => {
      setCheckedAttractions(previousCheckedState);
      setIsExpanded(false);
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
        setPlaygrounds(responseData.data);
        setTotalPage(responseData.pagination.totalPage);
        setCurrentPage(Number.parseInt(responseData.pagination.currentPage));
      } catch (error) {
        console.log(error);
      }
    };

    const fetchFilterPlaygrounds = async () => {
      setIsLoading(true);
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
        setPlaygrounds(responseData.data);
        setTotalPage(responseData.pagination.totalPage);
        setCurrentPage(Number.parseInt(responseData.pagination.currentPage));
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
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
      style={{ height: "calc(100vh - 89px)" }}
    >
      <div className="w-[21%] flex flex-col gap-8 py-4 px-4 bg-green-50 border mt-[57px] border-b-0 border-t-0">
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
                  className="flex w-full items-center bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                  onClick={() => setShowAreaDropdown(!showAreaDropdown)}
                >
                  <span className="flex-1 text-left p-2.5 text-sm">{selectedArea}</span>
                  <FaCaretDown className="w-10 h-10 p-2.5 text-gray-500 border-l border-gray-200" />
                </button>
                {showAreaDropdown && (
                  <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-10 max-h-60 overflow-y-auto">
                    {areas.map((item, index) => (
                      <button
                        key={index}
                        className={`w-full text-left p-2.5 text-sm hover:bg-green-50 transition-colors
                          ${item.name === selectedArea ? 'bg-green-100 text-green-800' : 'text-gray-700'}`}
                        onClick={() => handleToggleArea(item.name)}
                      >
                        {item.name}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </section>

            {/* Attractions */}
            <section className="mb-8">
              <h3 className="text-base font-semibold text-gray-900 mb-3">アトラクション</h3>
              <div className="bg-white rounded-lg border border-gray-200 p-4 mb-2">
                <FilterCheckbox
                  options={shortAttractions}
                  checkedState={checkedAttractions}
                  setCheckedState={setCheckedAttractions}
                  checkboxWidth="full"
                />
              </div>
              <button
                className="w-full px-4 py-2 text-sm bg-green-600 hover:bg-green-700 text-white rounded-lg shadow transition-colors"
                onClick={handleExpandedAttraction}
              >
                もっと
              </button>
            </section>

            {/* Time Selection */}
            <section className="mb-8">
              <h3 className="text-base font-semibold text-gray-900 mb-3">時間</h3>
              <div className="bg-white rounded-lg border border-gray-200 p-4 flex items-center">
                <div className="flex-1 flex gap-3 items-center">
                  <div ref={openTimeDropdownRef} className="relative flex-1">
                    <button
                      className="w-full px-3 py-2 text-sm rounded-lg border border-gray-200 hover:bg-gray-50"
                      onClick={handleClickOpenTime}
                    >
                      {selectedOpenTime.label}
                    </button>
                    {showOpenTimeDropdown && (
                      <TimeDropdown
                        options={openTime}
                        selectedTime={selectedOpenTime}
                        onTimeSelect={handleSelectOpenTime} 
                      />
                    )}
                  </div>
                  <FaArrowRight className="text-gray-400 flex-shrink-0" />
                  <div ref={closeTimeDropdownRef} className="relative flex-1">
                    <button
                      className="w-full px-3 py-2 text-sm rounded-lg border border-gray-200 hover:bg-gray-50"
                      onClick={handleClickCloseTime}
                    >
                      {selectedCloseTime.label}
                    </button>
                    {showCloseTimeDropdown && (
                      <TimeDropdown
                      options={closeTime}
                      selectedTime={selectedCloseTime}
                      onTimeSelect={handleSelectCloseTime} // Đổi handleSelectTime thành onTimeSelect
                      isEndTime={true}
                      />
                    )}
                  </div>
                </div>
                <FaClock className="text-gray-400 ml-3" />
              </div>
            </section>

            {/* Price Range */}
            <section className="mb-8">
              <h3 className="text-base font-semibold text-gray-900 mb-3">価格帯</h3>
              <div className="bg-white rounded-lg border border-gray-200 p-4 flex items-center">
                <div className="flex-1 flex gap-3 items-center">
                  <PriceInput value={minPrice} onChange={setMinPrice} />
                  <FaArrowRight className="text-gray-400 flex-shrink-0" />
                  <PriceInput value={maxPrice} onChange={setMaxPrice} />
                </div>
                <FaDollarSign className="text-gray-400 ml-3" />
              </div>
            </section>

            {/* Filter Button */}
            <button
              className="w-full px-4 py-3 text-sm font-medium bg-green-600 hover:bg-green-700 text-white rounded-xl shadow-sm transition-all hover:shadow-md"
              onClick={handleClickFilter}
            >
              確認する
            </button>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1">
          <div className="h-full overflow-y-auto">
            <div className="p-6">
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
        </main>

        {/* Modal Overlay */}
        {isExpanded && (
          <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50">
            <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-11/12 max-w-2xl bg-white rounded-xl shadow-xl">
              <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-medium text-gray-900">アトラクション</h3>
                  <div className="relative w-64">
                    <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      className="w-full pl-10 pr-4 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                      type="text"
                      placeholder="検索"
                      value={attractionSearch}
                      onChange={handleSearchAttraction}
                    />
                  </div>
                </div>
                <div className="border border-gray-200 rounded-lg p-4 bg-white max-h-[60vh] overflow-y-auto">
                  <FilterCheckbox
                    options={attractionSearchResult}
                    checkedState={checkedAttractions}
                    setCheckedState={setCheckedAttractions}
                    checkboxWidth="1/3"
                  />
                </div>
                <div className="mt-4 flex justify-end gap-3">
                  <button
                    className="px-6 py-2 text-sm bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg shadow transition-colors"
                    onClick={handleCancel}
                  >
                    キャンセル
                  </button>
                  <button
                    className="px-6 py-2 text-sm bg-green-600 hover:bg-green-700 text-white rounded-lg shadow transition-colors"
                    onClick={handleConfirm}
                  >
                    確認する
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  export default PlaygroundRecommendation;