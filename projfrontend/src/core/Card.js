import React, { useState, useEffect } from "react";
import ImageHelper from "./helper/ImageHelper";
import { Redirect } from "react-router-dom";
import addItemToCart, { removeItemFromCart } from "./helper/CartHelper";

export default function Card({
  product,
  addToCart = true,
  removeFromCart = false,
  setReload = (f) => f,
  reload = undefined,
}) {
  const [redirect, setRedirect] = useState(false);
  const [count, setCount] = useState(product.count);

  function addProductToCart() {
    addItemToCart(product, () => {
      setRedirect(true);
    });
  }
  function getRedirect(redirect) {
    if (redirect) {
      return <Redirect to="/cart"></Redirect>;
    }
  }
  return (
    <div className="card text-white bg-dark border border-info ">
      <div className="card-header lead">{product.name}</div>
      <div className="card-body">
        <ImageHelper product={product} />
        <p className="lead bg-success font-weight-normal text-wrap">
          {product.description}
        </p>
        <p className="btn btn-success rounded  btn-sm px-4">
          $ {product.price}
        </p>
        <div className="row">
          <div className="col-12">
            {addToCart && (
              <button
                onClick={addProductToCart}
                className="btn btn-block btn-outline-success mt-2 mb-2"
              >
                Add to Cart
              </button>
            )}
            {getRedirect(redirect)}
          </div>
          <div className="col-12">
            {removeFromCart && (
              <button
                onClick={() => {
                  removeItemFromCart(product._id);
                  setReload(!reload);
                }}
                className="btn btn-block btn-outline-danger mt-2 mb-2"
              >
                Remove from cart
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
