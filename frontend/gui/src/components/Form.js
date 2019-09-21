import React from "react";
import { Form, Input, Button } from "antd";
import axios from "axios";
const formLayout = "horizontal";
const formItemLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 14 }
};
const buttonItemLayout = {
  wrapperCol: { span: 14, offset: 4 }
};

class CustomForm extends React.Component {
  handleFormSubmit = async (e, requestType, articleID = null) => {
    let title = e.target.elements.title.value;
    let content = e.target.elements.content.value;
    try {
      switch (requestType) {
        case "post":
          await axios.post("http://127.0.0.1:8000/api/article/create/", {
            title: title,
            content: content
          });
          break;
        case "put":
          await axios.put(
            `http://127.0.0.1:8000/api/article/${articleID}/update/`,
            {
              title: title,
              content: content
            }
          );
          break;
        default:
          break;
      }
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    const { requestType, articleID, labelText } = this.props;
    return (
      <Form
        layout={formLayout}
        onSubmit={event => this.handleFormSubmit(event, requestType, articleID)}
      >
        <Form.Item label="Title" {...formItemLayout}>
          <Input name="title" placeholder="Title placeholder" />
        </Form.Item>
        <Form.Item label="Content" {...formItemLayout}>
          <Input name="content" placeholder="Content placeholder" />
        </Form.Item>
        <Form.Item {...buttonItemLayout}>
          <Button type="primary" htmlType="submit">
            {labelText}
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

export default CustomForm;
