import React from "react";
import { useParams } from "react-router-dom";
import useCollection from "../hooks/useCollection";

function SingleDish() {
  let { name } = useParams();
  let { data } = useCollection();
  console.log(name);
  let newSingleDish;
  if (data) {
    newSingleDish = data.filter((dish) => {
      return name == dish.name;
    });
  }

  return (
    <>
      {!newSingleDish && (
        <h3 className="text-center mb-10 mt-16 font-bold">
          Loading ...
          <span className="loading loading-spinner loading-md "></span>
        </h3>
      )}
      {newSingleDish &&
        newSingleDish.map((dish, id) => {
          return (
            <div
              key={id}
              className="card md:w-96 w-80 lg:w-[500px] bg-base-100 shadow-xl place-content-center aligen-content my-16"
            >
              <figure className="px-10 pt-10">
                <img src={dish.image} alt="Shoes" className="rounded-xl" />
              </figure>
              <div className="card-body text-center">
                <h2 className="card-title text-3xl mb-2 font-bold place-content-center text-center">
                  {dish.name}
                </h2>
                <p className="flex justify-between gap-5">
                  <span>
                    <b>Ingredients</b> : {dish.Ingredients}
                  </span>
                  <span>
                    <b>Time</b>: {dish.time}m
                  </span>
                </p>
                <p className="text-start">{dish.description}</p>
              </div>
            </div>
          );
        })}
    </>
  );
}

export default SingleDish;
