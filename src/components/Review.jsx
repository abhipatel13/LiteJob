import moment from "moment";
import React from "react";
import { Rating, Stack } from "@mui/material";

function Review({review}) {
  return (
    <Stack direction={"row"} justifyContent={"space-between"}>
      <div className="d-flex flex-column gap-1 ">
        <p style={{ fontSize: 12 }} className=" text-muted m-0">
          {moment(review?.createdAt).format("DD/MM/YYYY")}
        </p>
        <h6 className="m-0"></h6>
        <p className="text-muted  m-0" style={{ fontSize: 12 }}>
          {review?.review}
        </p>
      </div>
      <div className=" d-flex flex-column justify-content-between align-items-end">
        <Rating value={review?.rating} ></Rating>
        <p className="m-0">$200</p>
      </div>
    </Stack>
  );
}

export default Review;
