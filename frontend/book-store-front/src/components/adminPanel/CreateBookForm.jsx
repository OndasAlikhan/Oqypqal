import React, { Component } from 'react';
import { Input, Form, Button, AutoComplete } from 'antd';
import axios from 'axios';
import 'antd/dist/antd.css';
import './CreateBookForm.css';
const endpoint = process.env.REACT_APP_SERVICE_URI ? process.env.REACT_APP_SERVICE_URI : 'https://foo.api.net/';
class CreateBookForm extends Component {

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, val) => {
            if (!err) {
                val.releaseDate = 0;
                this.sendCreateBookRequest(val);
                this.props.onCreateBook();
            }
        })
    }

    sendCreateBookRequest = (reqData) => {
        axios.post(endpoint.concat('/admin-panel/create-book'), reqData)
            .then(res => console.log(res))
            .catch(err => console.log(err));
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <div>
                <h3 style={{ 'margin': '10px' }}>Create New Book</h3>
                <Form onSubmit={this.handleSubmit} className="create-book-form">
                    <Form.Item>
                        {getFieldDecorator('name', {
                            rules: [{ required: true, message: "Please input book's name" }]
                        })(
                            <AutoComplete>
                                <Input
                                    autoComplete='off'
                                    placeholder="Name"
                                />
                            </AutoComplete>

                        )}
                    </Form.Item>
                    <Form.Item>
                        {getFieldDecorator('author', {
                            rules: [{ required: true, message: "Please input book's author" }]
                        })(
                            <AutoComplete>
                                <Input
                                    autoComplete='off'
                                    placeholder="Author"
                                />
                            </AutoComplete>
                        )}
                    </Form.Item>
                    <Form.Item>
                        {getFieldDecorator('genre', {
                            rules: [{ required: true, message: "Please input book's genre" }]
                        })(
                            <AutoComplete>
                                <Input
                                    autoComplete='off'
                                    placeholder="Genre"
                                />
                            </AutoComplete>

                        )}
                    </Form.Item>
                    <Form.Item>
                        {getFieldDecorator('price', {
                            rules: [{ required: true, message: "Please input book's price" }]
                        })(
                            <AutoComplete>
                                <Input
                                    autoComplete='off'
                                    className='create-book-form-inputnumber'
                                    placeholder="Price"
                                />
                            </AutoComplete>
                        )}
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" >
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        )
    }
}

const WrappedCreateBookForm = Form.create()(CreateBookForm);
export default WrappedCreateBookForm;