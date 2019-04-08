import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { Pagination, Icon, Button } from "semantic-ui-react";
import { Menu as Meniu } from "semantic-ui-react";

class Header extends Component {
  render() {
    return (
      <div className="header__component">
        <div
          style={{ cursor: "pointer" }}
          onClick={() => {
            this.props.handleGoinHome();
            this.props.history.push("/");
          }}
          className="header__component-logo"
        >
          <i className="map react loading inverted white icon" />
          Moviee
        </div>
        {/*<Button onClick={() => this.props.history.push("/advancedsearch")} basic inverted color='white'>Advanced Search</Button>*/}
      </div>
    );
  }
}

export default withRouter(Header);
