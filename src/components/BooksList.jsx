import React from "react";
import useGlobalContext from "../hooks/useGlobalContext";
import useCollection from "../hooks/useCollection";
import { Link } from "react-router-dom";
function BooksList() {
  let { data } = useCollection();

  return (
    <>
      {!data && (
        <h3 className="text-center mb-10 mt-5 font-bold">
          Loading ...{" "}
          <span className="loading loading-spinner loading-md "></span>
        </h3>
      )}
      <ul className="flex flex-col items-center justify-center gap-3 my-3">
        {data &&
          data.map((dish, id) => {
            return (
              <li
                key={id}
                className=" border p-5 rounded-xl lg:w-[40rem] flex gap-10 w-full "
              >
                <figure className=" place-content-center ">
                  <img
                    className="lg:size-30 size-30 lg:object-cover object-cover"
                    src={dish.image}
                    alt="dish"
                  />
                </figure>
                <div>
                  <div className="flex items-baseline justify-between mb-1">
                    <h1 className="text-xl font-bold ">{dish.name}</h1>
                  </div>
                  <p className="line-clamp-3 lg:w-[30rem] mb-2 w-full ">
                    {dish.description}
                  </p>
                  <div className="flex gap-10 items-baseline ">
                    <span>
                      {" "}
                      <b>Time</b> : {dish.time}
                    </span>
                  </div>
                  <div className="card-actions justify-between flex line-clamp-4">
                    <p className="bg-transparent">
                      <b>Ingredients</b> : {dish.Ingredients}
                    </p>

                    <Link to={`/dish/${dish.name}`} className="btn btn-info">
                      More
                    </Link>
                  </div>
                </div>
              </li>
            );
          })}
      </ul>
    </>
  );
}

export default BooksList;
