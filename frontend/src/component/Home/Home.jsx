import React from "react";
// import { NavLink } from "react-router-dom";
import "../layout/Header/Header.css";
import MetaData from "../layout/MetaData";
import MainFrame from "./MainFrame";
// import SideBar from "./SideBar.jsx";
import ProductCard from "./ProductCard.jsx";
import { clearErrors, getProduct } from "../../actions/productAction";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import LoadingBar from "../layout/Loader/LoadingBar";
import { useAlert } from "react-alert";
import "./Home.css"
const Home = () => {
  const alert = useAlert();
  const dispatch = useDispatch();
  const { loading, error, products } = useSelector((state) => state.products);

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    dispatch(getProduct());
  }, [dispatch, error, alert]);

  return (
    <>
      {loading ? (
        <LoadingBar />
      ) : (
        <>
          <MetaData title="Art-Piece" />
          <div className="">
            {/* <SideBar /> */}
            <MainFrame />
            <hr className="hr_profile" />
            <div>
              <h2 className="text-center heading-home-me m-4"> Best Selling Products </h2>
              <hr className="hr_profile" />
              <div className="d-flex justify-content-evenly flex-wrap container ">
                {products &&
                  products.map((product) => (
                    <ProductCard key={product._id} product={product} />
                  ))}
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Home;
