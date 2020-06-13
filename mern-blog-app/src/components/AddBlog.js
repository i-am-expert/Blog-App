import React, { Component } from 'react';
import axios from 'axios';

export class AddBlog extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            title: '',
            author: '',
            description: ''
        }
    }
    
    onChangeTitle = (e) => {
        this.setState({
            title: e.target.value
        });
    }
    
    onChangeDescription = (e) => {
        this.setState({
            description: e.target.value
        });
    }

    onChangeAuthor = (e) => {
        this.setState({
            author: e.target.value
        });
    }

    onSubmit = (e) => {
        e.preventDefault();
        const blog = {
            title: this.state.title,
            description: this.state.description,
            author: this.state.author
        }
        console.log(blog);

        axios.post('http://localhost:5000/blogs/add', blog)
        .then(res => console.log(res.data))
        .catch(err => { console.log(err); })

        window.location = '/';
    }

    render() {
        return (
            <div>
                <h3>Add New Blog</h3> <br />
                <form style={formStyle} onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label style={{fontSize: "18px"}} htmlFor="title">Title</label>
                        <input 
                            type="text" 
                            required 
                            className="form-control" 
                            id="title"
                            value={this.state.title}
                            onChange={this.onChangeTitle} 
                        />
                    </div>
                    <div className="form-group">
                        <label style={{fontSize: "18px"}} htmlFor="author">Author</label>
                        <input 
                            type="text" 
                            required
                            className="form-control" 
                            id="author" 
                            value={this.state.author}
                            onChange={this.onChangeAuthor}
                        />
                    </div>
                    <div className="form-group">
                        <label style={{fontSize: "18px"}} htmlFor="description">Description</label>
                        <textarea 
                            className="form-control"
                            required 
                            id="description" 
                            rows="5"
                            value={this.state.description}
                            onChange={this.onChangeDescription}
                        >
                        </textarea>
                    </div>
                    <input type="submit" value="Submit" className="btn btn-primary" />  
                </form>
            </div>
        )
    }
}

const formStyle = {
    marginLeft: "15%",
    marginRight: "15%"
}

export default AddBlog
