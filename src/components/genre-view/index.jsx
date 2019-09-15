import React from "react";

import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

const GenreView = props => {
  const { genre, id } = props;
  return (
    <Card style={{ width: "30rem" }}>
      {/* <Link to={`/movies/${id}`} className="back-link">
        <Button variant="link">Go Back</Button>
      </Link> */}
      <Card.Body>
        <Card.Title as="h1">{genre.Name}</Card.Title>
        <Card.Text>{genre.Description || ""}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default GenreView;
