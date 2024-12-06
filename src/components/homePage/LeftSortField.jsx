import React, { useEffect, useState } from "react";
import { Switch } from "@headlessui/react";
import languages from "./language";
import { useDispatch, useSelector } from "react-redux";
import { getTopRatedBusiness } from "../../functions/business";
import { addFilter } from "../../redux/slices/filter";

const LeftSortField = ({ handleChildData }) => {
  const filter = useSelector((state) => state.filter);
  const [isOpen, setIsOpen] = useState(false);
  const [budget, setBudget] = useState(filter.budget);
  const [enabled, setEnabled] = useState(
    filter.city === "National" ? true : false
  );
  const [city, setCity] = useState(filter.city);
  const [topRated, setTopRated] = useState(filter.topRated);
  const [mostPopular, setMostPopular] = useState(filter.mostPopular);
  const [languageFilter, setLanguageFilter] = useState(false);
  const dispatch = useDispatch();

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      submitBudgetValue();
    }
  };
  useEffect(() => {
    console.log("filter", filter);
  }, [filter]);
  useEffect(() => {
    console.log("filter", filter);
  }, [filter]);

  const submitBudgetValue = () => {
    // Do something with the value, like submit it to a server
    
  };

  const [showAll, setShowAll] = useState(false);
  const visibleOptions = showAll ? languages : languages.slice(0, 11);

  // const fetchedTopRatedBusiness = () => {
  //   getTopRatedBusiness(topRated)
  //     .then((res) => {
  //       setData(res.data.data.data);
  //     })
  //     .catch((err) => {
  //       console.log("errrr", err);
  //     });
  // };
 

  return (
    <div className="my-6 flex justify-end">
      <div className="max-w-2xl w-[12rem]">
        <div className="border border-gray-300 rounded-lg relative">
          {/* SORT FILTER */}
          <div
            className="flex items-center justify-between px-4 py-3 cursor-pointer"
            onClick={() => setIsOpen(!isOpen)}
          >
            <h2 className="text-lg font-medium">Filter</h2>
            <svg
              className={`w-5 h-5 transition-transform transform ${
                isOpen ? "rotate-180" : ""
              }`}
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M6.293 6.293a1 1 0 0 1 1.414 0L10 8.586l2.293-2.293a1 1 0 1 1 1.414 1.414l-3 3a1 1 0 0 1-1.414 0l-3-3a1 1 0 0 1 0-1.414zM10 16a1 1 0 0 1-.707-.293l-3-3a1 1 0 0 1 1.414-1.414L10 13.586l2.293-2.293a1 1 0 0 1 1.414 1.414l-3 3A1 1 0 0 1 10 16z"
                clipRule="evenodd"
              />
            </svg>
          </div>

          {isOpen && (
            <div className="p-4 bg-white border border-gray-300 absolute left-0 w-full top-12 z-40">
              <div className="grid grid-cols gap-4 ">
                <div className="flex items-center space-x-2">
                  <label htmlFor="checkbox1">Budget</label>
                  <input
                    type="text"
                    id="budgetBox"
                    value={budget}
                    onChange={(event) => {
                      setBudget(event.target.value);
                      setTimeout(() => {
                        dispatch(
                          addFilter({ ...filter, budget: event.target.value })
                        );
                      }, 1000);
                    }}
                    onKeyPress={handleKeyPress}
                    className="border-gray-400 border-2 w-[5rem] pl-2 rounded-md"
                    placeholder="£150"
                  />
                </div>

                <div className="relative inline-flex items-center cursor-pointer">
                  <span className="mr-3">City</span>
                  <Switch
                    checked={enabled}
                    onChange={() => {
                      dispatch(
                        addFilter({
                          ...filter,
                          city: !enabled ? "National" : city,
                        })
                      );
                      setEnabled(!enabled);
                    }}
                    className={`${
                      !enabled ? "bg-gray-700" : "bg-[#014e56]"
                    } relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}
                  >
                    <span className="sr-only">Use setting</span>
                    <span
                      aria-hidden="true"
                      className={`${
                        enabled ? "translate-x-[1.27rem]" : "translate-x-0"
                      } pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
                    />
                  </Switch>
                  <span className="ml-3">National</span>
                </div>

                <div className="flex items-center space-x-2 ">
                  <input
                    type="checkbox"
                    id="checkbox1"
                    className="w-7 h-7 accent-[#014e56]"
                    checked={topRated}
                    onChange={(e) => {
                      setTopRated(e.target.checked);
                      if (e.target.checked) {
                        setMostPopular(false);
                        dispatch(
                          addFilter({
                            ...filter,
                            topRated: e.target.checked,
                            mostPopular: false,
                          })
                        );
                      } else {
                        dispatch(
                          addFilter({ ...filter, topRated: e.target.checked })
                        );
                      }
                    }}
                  />
                  <label htmlFor="checkbox1">Top rated</label>
                </div>

                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="checkbox2"
                    checked={mostPopular}
                    className="w-7 h-7 accent-[#014e56]"
                    onChange={(e) => {
                      setMostPopular(e.target.checked);
                      if (e.target.checked) {
                        setTopRated(false);
                        dispatch(
                          addFilter({
                            ...filter,
                            mostPopular: e.target.checked,
                            topRated: false,
                          })
                        );
                      } else {
                        dispatch(
                          addFilter({
                            ...filter,
                            mostPopular: e.target.checked,
                          })
                        );
                      }
                    }}
                  />
                  <label htmlFor="checkbox2">Most popular</label>
                </div>
              </div>

              {/* LANGUAGE FILTER */}
              <div className="border border-gray-300 rounded-lg mt-3">
                <div
                  className="flex items-center justify-between px-4 py-3 cursor-pointer"
                  onClick={() => setLanguageFilter(!languageFilter)}
                >
                  <h2 className="text-lg font-medium">Languages</h2>
                  <svg
                    className={`w-5 h-5 transition-transform transform ${
                      languageFilter ? "rotate-180" : ""
                    }`}
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M6.293 6.293a1 1 0 0 1 1.414 0L10 8.586l2.293-2.293a1 1 0 1 1 1.414 1.414l-3 3a1 1 0 0 1-1.414 0l-3-3a1 1 0 0 1 0-1.414zM10 16a1 1 0 0 1-.707-.293l-3-3a1 1 0 0 1 1.414-1.414L10 13.586l2.293-2.293a1 1 0 0 1 1.414 1.414l-3 3A1 1 0 0 1 10 16z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>

                {languageFilter && (
                  <div className="p-4">
                    <div className="grid grid-cols gap-4">
                      {visibleOptions.map((language) => (
                        <div
                          key={languages}
                          className="flex items-center space-x-2 text-lg"
                        >
                          <input
                            type="checkbox"
                            id={language}
                            name={language}
                            className="w-7 h-7 accent-[#014e56]"
                          />
                          <label htmlFor={language}>{language}</label>
                        </div>
                      ))}
                      {!showAll && (
                        <button
                          onClick={() => setShowAll(true)}
                          className="flex-start flex underline text-lg"
                        >
                          Show more
                        </button>
                      )}
                      {showAll && (
                        <button
                          onClick={() => setShowAll(false)}
                          className="flex-start flex underline text-lg "
                        >
                          Show less
                        </button>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LeftSortField;
