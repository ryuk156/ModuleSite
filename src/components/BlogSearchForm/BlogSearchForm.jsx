import React from "react";
import { navigate } from "gatsby";
import { Button, Col, Form, FormGroup, Input, Label, Row } from "reactstrap";

const SearchForm = ({ query, tag, author }, props) => {
  console.log(props);

  let srcLocation = props.location;
  if (typeof window !== `undefined`) {
    // eslint-disable-next-line no-restricted-globals
    srcLocation = location.search;
  }

  var urlTag = new URLSearchParams(srcLocation).get("tag") || "";
  var urlAuthor = new URLSearchParams(srcLocation).get("author") || "";

  return (
    <Form role="search" method="GET">
      <div class="row justify-content-center" form  id="search-form" >
       
        <Col md="6">
          <FormGroup>
            <Label for="searchQuery">
              <h6>Search</h6>
            </Label>
            <Input
              type="search"
              id="search-input"
              name="keywords"
              bsSize="lg"
              aria-controls="search-results-count"
              onChange={(e) =>
                navigate(
                  `${location.pathname}?keywords=${encodeURIComponent(
                    e.target.value
                  )}&tag=${tag === undefined ? `${urlTag}` : `${tag}`}&author=${
                    author === undefined ? `${urlAuthor}` : `${author}`
                  }`
                )
              }
              placeholder="Search..."
              value={query}
            />
          </FormGroup>
        </Col>
        <Col md="2">
          <Button type="submit" color="primary" size="lg" id="search-btn">
            Search
          </Button>
        </Col>
        
      </div>
      {/* search filter */}


      <div class="row justify-content-center">


      <Col md="8"> 

      <div class="row mt-0">
       
      
        <Col md="2">
          <FormGroup>
          <Label for="searchQuery">
              <h6>Tags</h6>
            </Label>

            <Input
              type="select"
              name="author"
              id="search-tag"
              bsSize="lg"
              aria-controls="search-results-count"
              onChange={(e) =>
                navigate(
                  `${
                    location.pathname
                  }?keywords=${query}&tag=${encodeURIComponent(
                    e.target.value
                  )}&author=${
                    author === undefined ? `${urlAuthor}` : `${author}`
                  }`
                )
              }
              value={tag}
            >
              <option value="">TAGS</option>
              <option value="gsoc">GSOC</option>
              <option value="project">Project</option>
              <option value="TeraSaturday">TeraSaturday</option>
              <option value="update">Update</option>
            </Input>
          </FormGroup>
        </Col>
        <Col md="2">
          <FormGroup>
          <Label for="searchQuery">
              <h6>Author</h6>
            </Label>
            <Input
              type="select"
              name="author"
              id="search-tag"
              bsSize="lg"
              aria-controls="search-results-count"
              onChange={(e) =>
                navigate(
                  `${location.pathname}?keywords=${query}&tag=${
                    tag === undefined ? `${urlTag}` : `${tag}`
                  }&author=${encodeURIComponent(e.target.value)}`
                )
              }
              value={author}
            >
              <option value="">Author</option>
              <option value="Skaldarnar">Skaldarnar</option>
              <option value="Niruandaleth">Niruandaleth</option>
              <option value="cervator">cervator</option>
            </Input>
          </FormGroup>
        </Col>
        <Col md="2">
          <FormGroup>
          <Label for="searchQuery">
              <h6>Date</h6>
            </Label>

            <Input
              type="select"
              name="author"
              id="search-tag"
              bsSize="lg"
              aria-controls="search-results-count"
              onChange={(e) =>
                navigate(
                  `${location.pathname}?keywords=${query}&tag=${
                    tag === undefined ? `${urlTag}` : `${tag}`
                  }&author=${encodeURIComponent(e.target.value)}`
                )
              }
              value={author}
            >
              <option value="">Author</option>
              <option value="Skaldarnar">Skaldarnar</option>
              <option value="Niruandaleth">Niruandaleth</option>
              <option value="cervator">cervator</option>
            </Input>
          </FormGroup>
        </Col>
      </div>
      </Col>
      </div>
    </Form>
    
  );
};

export default SearchForm;
