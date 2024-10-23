import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import Skeleton from "../UI/Skeleton";
import axios from "axios";
import Aos from "aos";
import 'aos/dist/aos.css';

const HotCollections = () => {
  const [hotCollections, setHotCollections] = useState([]);
  const [loading, setLoading] = useState(false);
  const options = {
    loop: true,
    margin: 10,
    nav: true,
    dots: false,
    responsive: {
      0: {
        items: 1,
      },
      600: {
        items: 2,
      },
      900: {
        items: 3,
      },
      1200: {
        items: 4,
      },
    },
  };

  const fetchHotCollections = async () => {
    setLoading(true);
    const { data } = await axios.get(
      "https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections"
    );
    setHotCollections(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchHotCollections();
    Aos.init()
  }
  , []);
  
  return (
    <section id="section-collections" className="no-bottom">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>Hot Collections</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          {loading ? (
            <OwlCarousel className="owl-theme" {...options}>
              {hotCollections.map((nft) => (
                <div className="nft_coll" key={nft.id} data-aos="fade-up" data-aos-duration="800">
                  <div className="nft_wrap">
                    <Link to={`/item-details/${nft.nftId}`}>
                      <img
                        src={nft.nftImage}
                        className="lazy img-fluid"
                        alt=""
                      />
                    </Link>
                  </div>
                  <div className="nft_coll_pp">
                    <Link to={`/author/${nft.authorId}`}>
                      <img
                        className="lazy pp-coll"
                        src={nft.authorImage}
                        alt=""
                      />
                    </Link>
                    <i className="fa fa-check"></i>
                  </div>
                  <div className="nft_coll_info">
                    <Link to="/explore">
                      <h4>{nft.title}</h4>
                    </Link>
                    <span>ERC-{nft.code}</span>
                  </div>
                </div>
              ))}
            </OwlCarousel>
          ) : (
            <OwlCarousel className="owl-theme owl-loaded" {...options}>
              {new Array(8).fill(0).map((_, index) => (
                <div className="nft_coll" key={index}>
                  <div className="nft_wrap">
                    <Link to={""}>
                      <Skeleton width="100%" height="200px" />
                    </Link>
                  </div>
                  <div className="nft_coll_pp">
                    <Link to={""}>
                      <Skeleton width="50px" height="50px" borderRadius="50%" />
                    </Link>
                  </div>
                  <div className="nft_coll_info">
                    <Link to={""}>
                      <Skeleton width="100px" height="20px" />
                    </Link>
                    <Skeleton width="60px" height="20px" />
                  </div>
                </div>
              ))}
            </OwlCarousel>
          )}
        </div>
      </div>
    </section>
  );
};

export default HotCollections;
