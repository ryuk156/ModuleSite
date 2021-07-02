import React, { useState, useEffect } from "react";
import { Table, NavLink, Input, Row, Col, Alert } from "reactstrap";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const GsocTsoc = () => {
  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  const [readyProjects, setReadyprojects] = useState([]);
  const [ongoingProjects, setOngoingprojects] = useState([]);

  const readyIdeas = async () => {
    const url =
      "https://api.trello.com/1/lists/5c3aab0bd640fe19e4069de5/cards?fields=name,labels,cover,desc&customFields=true&customFieldItems=true&attachments=true&attachment_fields=all";

    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      setReadyprojects(data);
      console.log(data);
    } else {
      console.log("not found");
    }
  };

  const ongoingIdeas = async () => {
    const url =
      "https://api.trello.com/1/lists/60ddd7cf64da4b3ee8c5a2e9/cards?fields=name,labels,cover,desc&customFields=true&customFieldItems=true&attachments=true&attachment_fields=all";

    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      setOngoingprojects(data);
      console.log(data);
    } else {
      console.log("not found");
    }
  };

  useEffect(() => {
    readyIdeas();
    ongoingIdeas();
  }, []);

  return (
    <div>
      <Carousel responsive={responsive}>
        {readyProjects.map((project) => {
          return (
            <div className="m-4">
              <Col md="12" className="row_shadow  h-100">
                
                  <div>
                    <h5>{project.name}</h5>
                  
                </div>
              </Col>
            </div>
          );
        })}
      </Carousel>
      
      <Carousel responsive={responsive}>
      {ongoingProjects.map((project) => {
          return (
            <div className="m-4">
              <Col md="12" className="row_shadow  h-100">
                
                  <div>
                    <h5>{project.name}</h5>
                  </div>
                
              </Col>
            </div>
          );
        })}
      </Carousel>
    </div>
  );
};
export default GsocTsoc;
