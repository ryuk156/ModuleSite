import React, { useState } from "react";
import { Pagination, PaginationItem, PaginationLink } from "reactstrap";
import { IconContext } from "react-icons";
import { GiPlainSquare, GiSquare } from "react-icons/gi";

import "./MediaPagination.css";

const MediaPagination = ({
  imagePerPage,
  totalImages,
  paginate,
  currentSlider,
}) => {
  const sildeNumber = [];

  for (let i = 1; i <= Math.ceil(totalImages / imagePerPage); i++) {
    sildeNumber.push(i);
  }

  return (
    <div className="d-flex page-section">
      {sildeNumber.map((number) => {
        return (
          <PaginationItem key={number} className="mt-3">
            <PaginationLink onClick={() => paginate(number)} href="#">
              {(() => {
                if (currentSlider == number) {
                  return (
                    <IconContext.Provider
                      value={{ className: "pagination-icon" }}
                    >
                      <GiPlainSquare />
                    </IconContext.Provider>
                  );
                } else {
                  return (
                    <IconContext.Provider
                      value={{ className: "pagination-icon" }}
                    >
                      <GiSquare />
                    </IconContext.Provider>
                  );
                }
              })()}
            </PaginationLink>
          </PaginationItem>
        );
      })}
    </div>
  );
};

export default MediaPagination;
