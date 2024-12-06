import React, { useEffect, useState } from "react";
import LeftSortField from "./LeftSortField";
import NavbarTwo from "./NavbarTwo";
import { Link } from "react-router-dom";
import { getBusiness, getBusinessStats } from "../../functions/business";
import HeartComponent from "../HeartComponent";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";
import { useSelector } from "react-redux";

import { StarIcon } from "@heroicons/react/solid";

const HomeBody = () => {
  const [data, setFetchedBusinesses] = useState(null);
  const [childData, setChildData] = useState("");
  const filters = useSelector((state) => state.filter);

  useEffect(() => {
    fetchedBusiness(null, filters ? filters : null);
  }, []);

  useEffect(() => {
    if (data && filters.budgetPrice !== 0) {
      setFetchedBusinesses(
        data.filter((item) => item.avgPrice <= filters.budget)
      );
    }
  }, [filters.budget]);

  const fetchedBusiness = (title, filters) => {
    getBusiness(title, filters)
      .then((res) => {
        setFetchedBusinesses(res.data.data.data);
      })
      .catch((err) => {
        console.log("errrr", err);
      });
  };

  const handleChildData = (data, filters) => {
    // Process the data received from the child component
    if (filters && data) {
      fetchedBusiness(data, filters);
    } else if (filters) {
      fetchedBusiness(null, filters);
    } else if (data) {
      fetchedBusiness(data, null);
    }
  };

  return (
    <>
      <div className="mx-auto px-6 max-w-[1500px] relative">
        <NavbarTwo onChildData={handleChildData} />

        <LeftSortField handleChildData={handleChildData} />
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8">
          {data &&
            data.map((businessData, ind) => (
              <Link
                to={`/BusinessServices/${businessData._id}`}
                key={ind}
                className="group"
                state={{
                  title: businessData.title,
                  summary: businessData.summary,
                }}
              >
                <div className="w-full">
                  <div className="aspect-square rounded-2xl bg-gray-100 relative">
                    <span className="absolute top-0 right-0 z-30 m-3">
                      <HeartComponent />
                    </span>
                    <Swiper
                      spaceBetween={10}
                      slidesPerView={1}
                      navigation
                      pagination={{ clickable: true, dynamicBullets: true }}
                      modules={[Pagination, Navigation]}
                      className="card-swiper"
                    >
                      <SwiperSlide>
                        <div className="block aspect-square rounded-2xl bg-gray-100 overflow-hidden">
                          <img
                            className="h-full w-full rounded-2xl transition-all duration-500 group-hover:scale-105"
                            src="https://images.unsplash.com/photo-1535025639604-9a804c092faa?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=6cb0ceb620f241feb2f859e273634393&auto=format&fit=crop&w=500&q=80"
                            alt="Card image cap"
                          />
                        </div>
                      </SwiperSlide>
                      <SwiperSlide>
                        <div className="block aspect-square rounded-2xl bg-gray-100 overflow-hidden">
                          <img
                            className="h-full w-full rounded-2xl transition-all duration-500 group-hover:scale-105"
                            src="https://images.unsplash.com/photo-1518895949257-7621c3c786d7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=388&q=80"
                            alt="Card image cap"
                          />
                        </div>
                      </SwiperSlide>
                      <SwiperSlide>
                        <div className="block aspect-square rounded-2xl bg-gray-100 overflow-hidden">
                          <img
                            className="h-full w-full rounded-2xl transition-all duration-500 group-hover:scale-105"
                            src="https://images.unsplash.com/photo-1508138221679-760a23a2285b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80"
                            alt="Card image cap"
                          />
                        </div>
                      </SwiperSlide>
                    </Swiper>
                  </div>

                  <div className="mt-2 px-2">
                    <div className="flex items-start gap-2">
                      <div className="mr-auto">
                        <h5 className="text-base font-semibold line-clamp-1">
                          {businessData?.title}
                        </h5>
                        <h6 className="text-sm font-medium text-gray-500 line-clamp-2">
                          {businessData?.summary}
                        </h6>
                        <h6 className="text-sm font-medium text-gray-500 line-clamp-2">
                          Average Price: {Math.round(businessData?.avgPrice)}
                        </h6>
                      </div>
                      <div className="flex items-center">
                        <StarIcon className="h-5 w-5 text-yellow-500" />
                        <span className="text-sm font-semibold">
                          {businessData?.ratingsAverage}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
        </div>
      </div>
    </>
  );
};

export default HomeBody;
