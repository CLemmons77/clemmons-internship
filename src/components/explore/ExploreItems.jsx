import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import CountDown from "../CountDown";
import Skeleton from "../UI/Skeleton";
import NftCard from "../UI/NftCard";

const ExploreItems = () => {
  const [exploreItems, setExploreItems] = useState([]);
  const [itemCount, setItemCount] = useState(8)
  const [skeletonLoading, setSkeletonLoading] = useState(true)

  const fetchExploreItems = async () => {
    const { data } = await axios.get(
      "https://us-central1-nft-cloud-functions.cloudfunctions.net/explore"
    );
    setExploreItems(data);
  };

  const filterItems = async (filter) => {
    setSkeletonLoading(false)
    const { data } = await axios.get(
      `https://us-central1-nft-cloud-functions.cloudfunctions.net/explore?filter=${filter}`
    );
    setExploreItems(data);
    setSkeletonLoading(true)
  };

  useEffect(() => {
    fetchExploreItems();
  }, []);

  return (
    <>
      <div>
        <select
          id="filter-items"
          defaultValue=""
          onChange={(event) => filterItems(event.target.value)}
        >
          <option value="">Default</option>
          <option value="price_low_to_high">Price, Low to High</option>
          <option value="price_high_to_low">Price, High to Low</option>
          <option value="likes_high_to_low">Most liked</option>
        </select>
      </div>
      {exploreItems.length && skeletonLoading ? (
        <>
          {exploreItems.slice(0, itemCount).map((item) => (
            <div
              key={item.id}
              className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
              style={{ display: "block", backgroundSize: "cover" }}
            >
              <NftCard item={item} />
            </div>
          ))}
        </>
      ) : (
        <>
          {new Array(8).fill(0).map((_, index) => (
            <div key={index} className="col-lg-3 col-md-6 col-sm-6 col-xs-12">
              <Skeleton width="100%" height="400px" borderRadius='5%'/>
            </div>
          ))}
        </>
      )}
      <div className="col-md-12 text-center">
        {itemCount !== 16 && (<Link to="" id="loadmore" className="btn-main lead" onClick={() => setItemCount(itemCount + 4)}>
          Load more
        </Link>)}
      </div>
    </>
  );
};

export default ExploreItems;
