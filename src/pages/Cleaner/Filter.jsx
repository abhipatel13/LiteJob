import { useEffect, useState } from "react";
import { Switch } from "@headlessui/react";
import { useDispatch, useSelector } from "react-redux";
import { addFilter, setProfessionInput } from "../../redux/slices/filter";
import { useLocation } from "react-router-dom";
// import { getTopRatedBusiness } from "../../functions/business";

const Filter = ({ cityInput, setCityInput, handleSearch }) => {
  const filter = useSelector((state) => state.filter);
  const [isOpen, setIsOpen] = useState(false);
  const [budget, setBudget] = useState(filter.budget);
  const [enabled, setEnabled] = useState(
    filter.city === "National" ? true : false
  );
  const [city, setCity] = useState(filter.city);
  const [topRated, setTopRated] = useState(filter.topRated);
  const [mostPopular, setMostPopular] = useState(filter.mostPopular);
  const [tempBudget, setTempBudget] = useState(budget);
  const dispatch = useDispatch();


  return (
    <div className="my-6 flex justify-end w-[130px] h-[48px]">
      <div className="max-w-2xl w-[12rem]">
        <div className="border border-gray-300 rounded-lg relative">
          {/* SORT FILTER */}
          <div
            className="flex items-center justify-between px-[16px] py-[12px] cursor-pointer"
            onClick={() => setIsOpen(!isOpen)}
          >
            <svg
              className={`w-5 h-5 transition-transform transform`}
              width="21"
              height="16"
              viewBox="0 0 21 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M2 4H14M14 4C14 5.65685 15.3431 7 17 7C18.6569 7 20 5.65685 20 4C20 2.34315 18.6569 1 17 1C15.3431 1 14 2.34315 14 4ZM7 12H18M7 12C7 13.6569 5.65685 15 4 15C2.34315 15 1 13.6569 1 12C1 10.3431 2.34315 9 4 9C5.65685 9 7 10.3431 7 12Z"
                stroke="#111111"
                strokeLinecap="round"
              />
            </svg>
            <h2 className="text-[16px] font-bold">Filter</h2>
          </div>

          {isOpen && (
            <div className="p-2 bg-white border border-gray-300 absolute left-0 w-full top-12 z-40 overflow-auto max-h-screen">
              <div className="flex flex-col justify-start w-full max-h-screen items-start gap-4 ">
                <div className="flex items-center space-x-2 text-sm">
                  {/* Added text-sm class */}
                  <label htmlFor="checkbox1">Budget</label>
                  <input
                    type="text"
                    id="budgetBox"
                    value={tempBudget === 1000000 ? "" : tempBudget}
                    onChange={(event) => {
                      let newBudget = event.target.value;
                      if (newBudget === "") {
                        newBudget = 1000000; // Reset to initial value when input is cleared
                      }
                      setTempBudget(newBudget);
                      setBudget(newBudget); // Set budget from tempBudget when input changes
                      dispatch(addFilter({ ...filter, budget: newBudget })); // Apply filter when input changes
                    }}
                    className="border-gray-400 border-2 w-full pl-2 rounded-md text-sm"
                    placeholder="£150"
                  />
                </div>

                <div className="border border-gray-300 lg:hidden rounded-lg">
                  <div className="flex items-center justify-between px-2 cursor-pointer">
                    <input
                      type="text"
                      placeholder="Your City"
                      value={cityInput}
                      onChange={(e) => setCityInput(e.target.value)}
                      className="w-full lg:hidden p-2 text-sm"
                    />
                  </div>
                </div>

                <div className="relative inline-flex items-center cursor-pointer text-xs">
                  {" "}
                  {/* Added text-xs class */}
                  <span className="mr-3">City</span>
                  <Switch
                    checked={enabled}
                    onChange={() => {
                      const newEnabled = !enabled;
                      dispatch(
                        addFilter({
                          ...filter,
                          city: newEnabled ? "National" : city,
                          enabled: newEnabled,
                        })
                      );
                      if (newEnabled) {
                        dispatch(setProfessionInput("")); // Dispatch the new action
                      }
                      setEnabled(newEnabled);

                      // Check if the filter is set to 'City'
                      if (!newEnabled) {
                        // Reset the current page to 1
                        setCurrentPage(1);
                        localStorage.setItem("currentPage", 1);
                      }
                    }}
                    className={`${
                      !enabled ? "bg-gray-700" : "bg-[#014e56]"
                    } relative inline-flex h-4 w-7 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`} // Adjusted height and width
                  >
                    <span className="sr-only">Use setting</span>
                    <span
                      aria-hidden="true"
                      className={`${
                        enabled ? "translate-x-[0.875rem]" : "translate-x-0"
                      } pointer-events-none inline-block h-3 w-3 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`} // Adjusted translate-x and size
                    />
                  </Switch>
                  <span className="ml-3">National</span>
                </div>

                <div className="flex items-center space-x-2 ">
                  <input
                    type="checkbox"
                    id="checkbox1"
                    className="w-4 h-4 accent-[#014e56] border"
                    checked={topRated}
                    onChange={(e) => {
                      setTopRated(e.target.checked);
                      dispatch(
                        addFilter({ ...filter, topRated: e.target.checked })
                      );
                    }}
                  />
                  <label htmlFor="checkbox1" className="text-sm">
                    Top rated
                  </label>
                </div>

                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="checkbox2"
                    checked={mostPopular}
                    className="w-4 h-4 accent-[#014e56] border"
                    onChange={(e) => {
                      setMostPopular(e.target.checked);
                      dispatch(
                        addFilter({ ...filter, mostPopular: e.target.checked })
                      );
                    }}
                  />
                  <label htmlFor="checkbox2" className="text-sm">
                    Most popular
                  </label>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Filter;
