import React, { useState, useEffect, useRef } from "react";
import Img from "gatsby-image";
import { Row, Col } from "reactstrap";
import MediaPagination from "./MediaPagination/MediaPagination.jsx";
import { useStaticQuery, graphql } from "gatsby";
import "./Media.css";
import { image } from "../../../node_modules/image-q/dist/iq.js";

const Media = () => {
  const data = useStaticQuery(graphql`
    query Images {
      images: allFile(filter: { relativeDirectory: { eq: "images" } }) {
        nodes {
          id
          name
          childImageSharp {
            fluid(maxWidth: 600, maxHeight: 300) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    }
  `);

  const imageArray = [];
  const images = data.images.nodes;

  images.forEach((image) => {
    imageArray.push(image);
  });

  const [currentSlider, setcurrentSlider] = useState(1);
  const imagePerPage = 9;

  const indexOfLastImage = currentSlider * imagePerPage;
  const indexOfFirstImage = indexOfLastImage - imagePerPage;
  const currentImages = imageArray.slice(indexOfFirstImage, indexOfLastImage);
  const paginate = (sliderNum) => setcurrentSlider(sliderNum);

  const [imageToShow, setImageToShow] = useState("");
  const [lightboxDisplay, setLightBoxDisplay] = useState(false);

  const showImage = (image) => {
    setImageToShow(image);
    setLightBoxDisplay(true);
  };

  const hideLightBox = () => {
    setLightBoxDisplay(false);
  };
  
  const showNext = (e) => {
    e.stopPropagation();
    let currentIndex = currentImages.indexOf(imageToShow);
    if (currentIndex >= currentImages.length - 1) {
      setLightBoxDisplay(false);
    } else {
      let nextImage = currentImages[currentIndex + 1];
      setImageToShow(nextImage);
    }
  };

  const showPrev = (e) => {
    e.stopPropagation();
    let currentIndex = currentImages.indexOf(imageToShow);
    if (currentIndex <= 0) {
      setLightBoxDisplay(false);
    } else {
      let nextImage = currentImages[currentIndex - 1];
      setImageToShow(nextImage);
    }
  };

  return (
    <div>
      <section>
        <Row className="justify-content-center">
          {currentImages.map((image) => (
            <Col key={image.id} md="4" sm="6" xs="6" className="pb-0" onClick={() => showImage(image)}>
              <Img
                imgStyle={{
                  borderRadius: "0px 0px 0px 0px",
                  cursor: "initial",
                }}
                fluid={image.childImageSharp.fluid}
              />
            </Col>
          ))}


        </Row>

        <MediaPagination
          imagePerPage={imagePerPage}
          totalImages={images.length}
          paginate={paginate}
          currentSlider={currentSlider}
        />
      </section>

      {
        lightboxDisplay ? 
        <div id="lightbox" onClick={hideLightBox}>
          <button onClick={showPrev}>⭠</button>
          <Img imgStyle={{
            position:"static"
          }} fluid={imageToShow.childImageSharp.fluid} />
          <button onClick={showNext}>⭢</button>
        </div>
       : ""
      }
    </div>
  );
};

export default Media;
