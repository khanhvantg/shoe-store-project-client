import React, { useState, useEffect } from "react";
import { Link, useParams, useSearchParams  } from "react-router-dom";
const LEFT_PAGE = "LEFT";
const RIGHT_PAGE = "RIGHT";
const range = (from, to, step = 1) => {
  let i = from;
  const range = [];

  while (i <= to) {
    range.push(i);
    i += step;
  }

  return range;
};

const Paginations = (props) => {
  const {
    totalRecords,
    pageLimit,
    pageNeighbours,
    onPageChanged,
    currentPage
  } = props;
  const totalPages = Math.ceil(totalRecords / pageLimit)
  // useEffect(() => {
  //   setTotalPages(Math.ceil(totalRecords / pageLimit));
  // }, [setTotalPages]);
  // const [searchParams, setSearchParams] = useSearchParams()
  // const currentPage = searchParams.get("page")
  const fetchPageNumbers = () => {
    const totalNumbers = pageNeighbours * 2 + 3;
    const totalBlocks = totalNumbers + 2;
    console.log(currentPage)
    if (totalPages > totalBlocks) {
      // const startPage = Math.max(2, Number(currentPage) - pageNeighbours);
      // const endPage = Math.min(totalPages - 1, Number(currentPage) + pageNeighbours);
      const startPage = Math.max(2, Number(currentPage));
      const endPage = Math.min(totalPages - 1, Number(currentPage) + pageNeighbours);
      let pages = range(startPage, endPage);
      const hasLeftSpill = startPage > 2;
      const hasRightSpill = totalPages - endPage > 1;
      const spillOffset = totalNumbers - (pages.length + 4);

      switch (true) {
        case Number(currentPage) === 1:{
          pages = [...pages, RIGHT_PAGE];
          break;
        }
        case hasLeftSpill && !hasRightSpill: {
          const extraPages = range(startPage - spillOffset, startPage - 1);
          pages = [LEFT_PAGE, ...extraPages, ...pages];
          break;
        }
        case hasLeftSpill && hasRightSpill:
        default: {
          pages = [LEFT_PAGE, ...pages, RIGHT_PAGE];
          break;
        }
      }
      return [1, ...pages, totalPages];
    }
    return range(1, totalPages);
  };
  const pages = fetchPageNumbers() || [];
  console.log("c",currentPage)
  return (
    <nav aria-label="Page navigation sample">
      <ul className="pagination">
        {pages.map((page, index) => {
          if (page === LEFT_PAGE)
            return (
              <a key={index} className="page-item">
                <button
                  // to={`/manage/orders/page/${Number(currentPage) - 1}`}
                  className="page-link"
                  aria-label="Previous"
                  style = {{height: "34px", fontSize: "14px"}}
                  onClick={(e) => {onPageChanged(e, Number(currentPage)-1)}}
                >
                  <span aria-hidden="true">&laquo;</span>
                </button>
              </a>
            );

          if (page === RIGHT_PAGE)
            return (
              <a key={index} className="page-item">
                <button
                  className="page-link"
                  aria-label="Next"
                  style = {{height: "34px", fontSize: "14px"}}
                  onClick={(e) => {onPageChanged(e,Number(currentPage)+1)}}
                >
                  <span aria-hidden="true">&raquo;</span>
                </button>
              </a>
            );

          return (
            <li
              key={index}
              className={`page-item${Number(currentPage) === Number(page) ? " active" : ""}`}
            >
              <a
                className="page-link"
                style = {{height: "34px", fontSize: "14px"}}
                // value = {page}
                onClick={(e) => {onPageChanged(e, page)}}
              >
                {page}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default Paginations;
