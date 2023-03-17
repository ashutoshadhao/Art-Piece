import React from "react";
import { Link } from "react-router-dom";
import "./Home.css";
import mainframePhoto1 from "../../images/MainframePhoto1.png";
import mainframePhoto2 from "../../images/MainframePhoto2.jpeg";
import mainframePhoto3 from "../../images/MainframePhoto3.png";
import mainframePhoto4 from "../../images/MainframePhoto4.png";
const MainFrame = () => {
  return (
    <div className="col">
      <div className="container">
        <div className="row d-lg-flex flex-lg-row d-flex flex-column-reverse bg-light  d-flex align-items-center justify-content-center width_height ">
          <div className="col">
            <div className="p-5" id={2}>
              <p className="fs-6 p-green">BEST QUALITY</p>
              <p className=" mainframe_heading fw-bold">
              Handmade with Love <span style={{color : "red"}}>❤</span>
              </p>
              <p className=" mainframe_heading fw-bold">Elevate Your Space With Unique Artisanal Pieces</p>
              <p className="text-muted mb-4">Free Delivery Available</p>
              <Link to="/products" className="btn fw-bold btn-me-mainframe ">
                SHOP NOW
              </Link>
            </div>
          </div>
          <div className="col">
            <div id={1}>
              <div
                id="carouselExampleInterval"
                className="carousel slide"
                data-bs-ride="carousel"
              >
                <div className="carousel-inner">
                  <div className="carousel-item active" data-bs-interval={2000}>
                    <img
                      src={mainframePhoto1}
                      className="d-block w-100"
                      width={"200px"}
                      height={"580px"}
                      alt="..."
                    />
                  </div>
                  
                  <div className="carousel-item ">
                    <img
                      src={mainframePhoto3}
                      className="d-block w-100"
                      alt="..."
                      width={"200px"}
                      height={"580px"}
                    />
                  </div>
                  <div className="carousel-item ">
                    <img
                      src={mainframePhoto2}
                      className="d-block w-100"
                      alt="..."
                      width={"100px"}
                      height={"580px"}
                    />
                  </div>
                  <div className="carousel-item ">
                    <img
                      src={mainframePhoto4}
                      className="d-block w-100"
                      alt="..."
                      width={"200px"}
                      height={"580px"}
                    />
                  </div>
                </div>
                <button
                  className="carousel-control-prev"
                  type="button"
                  data-bs-target="#carouselExampleInterval"
                  data-bs-slide="prev"
                >
                  <span
                    className="carousel-control-prev-icon"
                    aria-hidden="true"
                  />
                  <span className="visually-hidden">Previous</span>
                </button>
                <button
                  className="carousel-control-next"
                  type="button"
                  data-bs-target="#carouselExampleInterval"
                  data-bs-slide="next"
                >
                  <span
                    className="carousel-control-next-icon"
                    aria-hidden="true"
                  />
                  <span className="visually-hidden">Next</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainFrame;
