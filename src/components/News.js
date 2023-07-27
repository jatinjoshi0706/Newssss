import React, { Component } from "react";
import NewsItem from "./NewsItem";

export default class News extends Component {
  
    
     constructor(){
    super();
    console.log("construct");
    this.state={
      articles: [],
      loading: false,
    }
  }
  async componentDidMount(){
    let url = "https:newsapi.org/v2/top-headlines?country=in&apiKey=032417be4c0646cfac0507f62d1b8a7c";
    let data= await fetch(url);
    let parseData= await data.json()
    console.log(parseData);
    this.setState({articles : parseData.articles})
  }

  handleNextClick = async()=>{
    console.log("next");

    let url = `https:newsapi.org/v2/top-headlines?country=in&apiKey=032417be4c0646cfac0507f62d1b8a7c&page=${this.state.page + 1}`;
    let data= await fetch(url);
    let parseData= await data.json()
    console.log(parseData);

    this.setState(
      {
        page : this.state.page+1,
        articles : parseData.articles
      }
    )


  }
  handlePrevClick = async ()=>{
    console.log("prev");

    let url = `https:newsapi.org/v2/top-headlines?country=in&apiKey=032417be4c0646cfac0507f62d1b8a7c&page=${this.state.page - 1}`;
    let data= await fetch(url);
    let parseData= await data.json()
    console.log(parseData);

    this.setState(
      {
        page : this.state.page - 1,
        articles : parseData.articles
      }
    )

    
  }

  render() {
    return <>
      <div className="container my-3">
        <h1>Newsss!- Top headlines-</h1>
        <div className="row">
        {this.state.articles.map((element)=>{
          return (<div className="col-md-4" key={element.url}>
              <NewsItem title={ element.title ? element.title.slice(0,45):""} description={element.description ? element.description.slice(0,88):""} imgurl={element.urlToImage} url={element.url} />
            </div>);
        })}
        </div>
        <div className="container d-flex justify-content-between">
          <button disabled = {this.state.page <= 1} type="button" className="btn btn-dark"onClick={this.handlePrevClick}>&larr; Previous</button>
          <button type="button" className="btn btn-dark" onClick={this.handleNextClick}>next &rarr;</button>
        </div>
      </div>
      </>
    
  }
}


