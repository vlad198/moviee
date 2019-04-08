import React from "react";
import { Card } from "semantic-ui-react";
import { Route, Switch } from "react-router";
import { withRouter } from "react-router-dom";

function Menu(props) {
  return (
    <div>
      <Card.Group>
        {props.data.length > 0
          ? props.data.map((el, index) => {
              return (
                <Card
                  key={index}
                  onClick={() => {
                    props.history.push(`/movie/${el.id}`);
                  }}
                  centered
                  image={
                    el.poster_path !== null
                      ? `https://image.tmdb.org/t/p/w500/${el.poster_path}`
                      : "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/1024px-No_image_available.svg.png"
                  }
                  header={el.original_title}
                />
              );
            })
          : null}
      </Card.Group>
    </div>
  );
}

export default withRouter(Menu);
