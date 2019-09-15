import React from "react";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

const DirectorView = props => {
  const { director, id } = props;
  return (
    <Card style={{ width: "30rem" }}>
      {/* <Link to={`/movies/${id}`} className="back-link">
        <Button variant="link">Go Back</Button>
      </Link> */}
      <Card.Body>
        <Card.Title as="h1">{director.Name}</Card.Title>
        <Card.Text>{director.Bio || ""}</Card.Text>
        <Card.Text>{director.Birth || ""}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default DirectorView;
