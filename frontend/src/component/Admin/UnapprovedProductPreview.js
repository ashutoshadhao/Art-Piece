import React, { Fragment, useEffect, useState } from "react";
import "./UnApprovedProductPreview.css";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { useSelector, useDispatch } from "react-redux";
import Carousel from "react-material-ui-carousel";
import MetaData from "../layout/MetaData";
import {
  clearErrors,
  getProductDetails,
  deleteProduct,
  verifyProduct,
} from "../../actions/productAction";
import { getUserDetails } from "../../actions/userAction";
import { useParams } from "react-router-dom";
import LoadingBar from "../layout/Loader/LoadingBar";
import { useAlert } from "react-alert";
import { useNavigate } from "react-router-dom";
import { DELETE_PRODUCT_RESET } from "../../constants/productConstants";

const UnapprovedProductPreview = () => {
  const history = useNavigate();
  const dispatch = useDispatch();
  const alert = useAlert();
  const params = useParams();
  const { product, loading, error, isVerified, success } = useSelector(
    (state) => state.productDetails
  );
  const { user } = useSelector((state) => state.userDetails);

  const { error: deleteError, isDeleted } = useSelector(
    (state) => state.product
  );
  const deleteProductHandler = (id) => {
    dispatch(deleteProduct(id));
    alert.success("Product Deleted Successfully");
    history("/admin/verify/products");
  };

  const verifySuccess = (id) => {
    dispatch(verifyProduct(id));
    alert.success("Product Verified Successfully");
    history("/admin/verify/products");
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (deleteError) {
      alert.error(deleteError);
      dispatch(clearErrors());
    }
    if (success) {
      dispatch(getUserDetails(product.user));
    }
    dispatch(getProductDetails(params.id));
  }, [
    dispatch,
    params.id,
    error,
    alert,
    user,
    history,
    deleteError,
    isDeleted,
    isVerified,
    success,
  ]);
  return (
    <>
      {loading ? (
        <LoadingBar />
      ) : (
        <div className="container">
          <MetaData title={`${product.name}`} />
          <div className="text-center m-3">
            <h1> Product For Approval </h1>
          </div>
          <div className="row">
            <div className="col" style={{ height: "500px" }}>
              <Carousel>
                {product.images &&
                  product.images.map((item, i) => (
                    <img
                      className="CarouselImage"
                      key={i}
                      src={item.url}
                      alt={`${i} Slide`}
                      width="500px"
                      height="470px"
                    />
                  ))}
              </Carousel>
            </div>
            <div className="col">
              <div className="container ">
                <h2 className="mt-3 mb-3">{product.name}</h2>
                <div className="d-flex ">
                  <h3 className="main_price">₹ {product.price}</h3>
                </div>
                <div className="mt-4 description_width">
                  <h4>Description</h4>
                  <p>{product.description}</p>
                </div>
                <div className="mt-4 mb-4">
                  <h5>
                    Stock :
                    <b
                      className={product.Stock < 1 ? "redColor" : "greenColor"}
                    >
                      {product.Stock}
                    </b>
                  </h5>
                </div>

                <div>
                  <div className="mt-4 mb-4">
                    <h5>
                      Seller ID :<b>{user._id}</b>
                    </h5>
                  </div>
                  <div className="mt-4 mb-4">
                    <h5>
                      Seller Name :<b>{user.name}</b>
                    </h5>
                  </div>
                  <div className="mt-4 mb-4">
                    <h5>
                      Seller Email :<b>{user.email}</b>
                    </h5>
                  </div>
                </div>

                <div className="d-flex mt-3">
                  <Button
                    size="medium"
                    className="button_addToCart "
                    onClick={() => deleteProductHandler(params.id)}
                  >
                    Delete
                  </Button>
                  <Button
                    size="medium"
                    className="button_buyNow"
                    onClick={() => verifySuccess(params.id)}
                  >
                    Approved
                  </Button>
                </div>
              </div>
            </div>
          </div>
          <hr />
        </div>
      )}
    </>
  );
};

export default UnapprovedProductPreview;
