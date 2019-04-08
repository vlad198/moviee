import React, { Component } from 'react'
import Axios from 'axios';
import {Grid , Image ,List } from 'semantic-ui-react';


export default class ShowMovieDetails extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data : {}
        }
    }

    async componentDidMount(){
        const {id} = this.props.match.params;
        const res = await Axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=4e35294ab5cc3ca4056266da95a743db&language=en-US`);
        console.log(res.data);
        this.setState({
          data : res.data
        });
    }

  render() {

    const {poster_path ,genres,release_date,title,vote_average,vote_count ,overview , runtime} = this.state.data;

    return (
      <div>
        <p/>
        
      <Grid>

      <Grid.Column width={6}>
        <Image src={this.state.data.poster_path !== null ? `https://image.tmdb.org/t/p/w500/${this.state.data.poster_path}` : 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/1024px-No_image_available.svg.png'} />
      </Grid.Column>

      <Grid.Column width={10}>

      <h1>{title}</h1>
      <div style={{textAlign:'left'}}>

      <h3>Release data : {release_date}</h3>
      <h3>Rating : {vote_average}</h3>
      <h3>Vote count : {vote_count}</h3>
      <h3>Runtime : {runtime} min</h3>
      <h3>{overview}</h3>
      </div>
      

      </Grid.Column>


      </Grid>


      </div>
    )
  }
}
