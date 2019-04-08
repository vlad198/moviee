import React, { Component } from "react";
import "./App.css";
import Search from "./components/Search";
import Axios from "axios";
import Header from "./components/Header";
import Input from "./components/Input";
import Borderless from "./components/Borderless";
import Menu from "./components/Menu";
import { Pagination, Icon, Menu as Meniu } from "semantic-ui-react";
import { BrowserRouter as Router } from "react-router-dom";
import { Switch, Route, Redirect } from "react-router";
import AdvancedSearch from "./components/AdvancedSearch";
import ShowMovieDetails from "./components/ShowMovieDetails";
import NoResults from "./components/NoResults";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      totalPages: 0,
      input: "",
      current: 1
    };

    this.getData = this.getData.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.sayHello = this.sayHello.bind(this);
    this.handleGoinHome = this.handleGoinHome.bind(this);
    this.clearData = this.clearData.bind(this);
  }

  handleGoinHome() {
    Axios(
      `https://api.themoviedb.org/3/discover/movie?api_key=4e35294ab5cc3ca4056266da95a743db&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1`
    )
      .then(res => {
        const pages = res.data.total_pages > 1000 ? 1000 : res.data.total_pages;
        this.setState({
          data: res.data.results,
          totalPages: pages,
          input: ""
        });
      })
      .catch(err => console.log(err));
  }

  componentDidMount() {
    this.handleGoinHome();
  }

  getData(title, page) {
    Axios(
      `https://api.themoviedb.org/3/search/movie?api_key=4e35294ab5cc3ca4056266da95a743db&language=en-US&query=${title}&page=${page}&include_adult=false`
    )
      .then(res => {
        const pages = res.data.total_pages > 1000 ? 1000 : res.data.total_pages;
        this.setState({
          data: res.data.results,
          totalPages: pages,
          current: page
        });
      })
      .catch(err => console.log(err));
  }

  handleChange(e) {
    e.preventDefault();
    console.log(this.state.input);
    this.setState({
      input: e.target.value
    });
    if (e.target.value.length > 0) {
      this.getData(e.target.value, 1);
    } else {
      Axios(
        `https://api.themoviedb.org/3/discover/movie?api_key=4e35294ab5cc3ca4056266da95a743db&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1`
      )
        .then(res => {
          const pages =
            res.data.total_pages > 1000 ? 1000 : res.data.total_pages;
          this.setState({
            data: res.data.results,
            totalPages: pages
          });
        })
        .catch(err => console.log(err));
    }
  }

  sayHello(page) {
    console.log(page);
  }

  handlePagination(page) {
    this.setState({
      current: page
    });

    if (this.state.input === "") {
      Axios(
        `https://api.themoviedb.org/3/discover/movie?api_key=4e35294ab5cc3ca4056266da95a743db&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}`
      )
        .then(res => {
          const pages =
            res.data.total_pages > 1000 ? 1000 : res.data.total_pages;
          this.setState({
            data: res.data.results,
            totalPages: pages
          });
        })
        .catch(err => console.log(err));
    } else {
      this.getData(this.state.input, page);
    }
  }

  clearData() {
    this.setState({
      data: [],
      input: ""
    });
  }

  render() {
    return (
      <Router>
        <div className="App ui center aligned container">
          <Header handleGoinHome={this.handleGoinHome} />
          <Switch>
            <Route
              exact
              path="/"
              render={props => {
                return (
                  <div>
                    <h1 style={{ textAlign: "center" }}>Search a movie</h1>
                    <Input
                      value={this.state.input}
                      handleChange={this.handleChange}
                    />
                    <p />
                    {this.state.data.length > 0 ? (
                      <Pagination
                        onPageChange={(x, y) =>
                          this.handlePagination(y.activePage)
                        }
                        activePage={this.state.current}
                        ellipsisItem={{
                          content: <Icon name="ellipsis horizontal" />,
                          icon: true
                        }}
                        firstItem={{
                          content: <Icon name="angle double left" />,
                          icon: true
                        }}
                        lastItem={{
                          content: <Icon name="angle double right" />,
                          icon: true
                        }}
                        prevItem={{
                          content: <Icon name="angle left" />,
                          icon: true
                        }}
                        nextItem={{
                          content: <Icon name="angle right" />,
                          icon: true
                        }}
                        totalPages={this.state.totalPages}
                      />
                    ) : null}
                    <p />
                    <Menu clearData={this.clearData} data={this.state.data} />
                    <p />
                    {this.state.data.length === 0 ? <NoResults /> : null}
                    {this.state.data.length > 0 ? (
                      <Pagination
                        onPageChange={(x, y) =>
                          this.handlePagination(y.activePage)
                        }
                        activePage={this.state.current}
                        ellipsisItem={{
                          content: <Icon name="ellipsis horizontal" />,
                          icon: true
                        }}
                        firstItem={{
                          content: <Icon name="angle double left" />,
                          icon: true
                        }}
                        lastItem={{
                          content: <Icon name="angle double right" />,
                          icon: true
                        }}
                        prevItem={{
                          content: <Icon name="angle left" />,
                          icon: true
                        }}
                        nextItem={{
                          content: <Icon name="angle right" />,
                          icon: true
                        }}
                        totalPages={this.state.totalPages}
                      />
                    ) : null}
                    <p />
                    <div
                      className="ui inverted vertical footer segment"
                      style={{ wordSpacing: "2px" }}
                    >
                      Built with ReactJS , Semantic UI and TheMovieDB.
                    </div>
                  </div>
                );
              }}
            />
            <Route
              exact
              path="/movie/:id"
              render={props => <ShowMovieDetails {...props} />}
            />
            <Route exact path="/advancedsearch" component={AdvancedSearch} />
            <Redirect to="/" />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
