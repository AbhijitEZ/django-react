import React, { Component } from "react";
import axios from "axios";
import Articles from "../components/Article";
import CustomForm from "../components/Form";

class ArticleListView extends Component {
  state = {
    articles: []
  };
  async componentDidMount() {
    try {
      let data = await axios.get("http://127.0.0.1:8000/api/article/");
      this.setState({
        articles: data.data
      });
    } catch (error) {
      console.log(error, "catch-error");
    }
  }
  render() {
    let { articles } = this.state;
    return (
      <div>
        <Articles data={articles} />
        <br />
        <CustomForm requestType="post" labelText="Add" />
      </div>
    );
  }
}

export default ArticleListView;
