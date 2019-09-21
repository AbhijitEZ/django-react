import React, { Component } from "react";
import axios from "axios";
import { Card, Button } from "antd";
import CustomForm from "../components/Form";

class ArticleDetailView extends Component {
  state = {
    article: {}
  };

  handleDelete = async e => {
    e.preventDefault();
    let { articleID } = this.props.match.params;
    await axios.delete(
      `http://127.0.0.1:8000/api/article/${articleID}/delete/`
    );
    this.props.history.push("/");
  };

  async componentDidMount() {
    try {
      let { articleID } = this.props.match.params;
      let data = await axios.get(
        `http://127.0.0.1:8000/api/article/${articleID}`
      );
      this.setState({
        article: data.data
      });
    } catch (error) {
      console.log(error, "catch-error");
    }
  }

  render() {
    const { article } = this.state;
    let { articleID } = this.props.match.params;

    return (
      <div>
        <Card title={article.title}>
          <p>{article.content}</p>
        </Card>
        <CustomForm
          requestType="put"
          labelText="update"
          articleID={articleID}
        />
        <form onSubmit={this.handleDelete}>
          <Button type="danger" htmlType="submit">
            Delete
          </Button>
        </form>
      </div>
    );
  }
}

export default ArticleDetailView;
