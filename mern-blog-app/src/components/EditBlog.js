import React, { Component } from 'react';
import axios from 'axios';

export class EditBlog extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            title: '',
            author: '',
            description: ''
        }
    }

    componentDidMount() {
        // console.log(window.location.pathname);
        const id = window.location.pathname.substring(14,);
        axios.get('http://localhost:5000/blogs/'+id)
        .then(response => {
            console.log(response)
            this.setState({
            author: response.data.author,
            description: response.data.description,
            title: response.data.title
            })   
        })
        .catch(function (error) {
            console.log(error);
        })
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
        // console.log(blog);
        const id = window.location.pathname.substring(14,);
        axios.post('http://localhost:5000/blogs/update/' + id, blog)
        .then(res => console.log(res.data))
        .catch(err => { console.log(err); })

        window.location = '/' + id;        
    }

    handleCancel = (e) => {
        e.preventDefault();
        const id = window.location.pathname.substring(14,);
        window.location = '/' + id;   
    }

    render() {
        return (
            <div>
                <form style={formStyle} autoCorrect="off" autoComplete="off">
                    <h3>Edit Blog</h3> <br />
                    <div className="form-group">
                        <label style={{fontSize: "18px"}} htmlFor="title">Title</label>
                        <input 
                            type="text" 
                            required 
                            spellCheck="false"
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
                            spellCheck="false"
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
                            spellCheck="false"
                            id="description" 
                            rows="5"
                            value={this.state.description}
                            onChange={this.onChangeDescription}
                        >
                        </textarea>
                    </div>
                    <input type="submit" value="Submit" className="btn btn-primary" onClick={this.onSubmit} style={btnStyle} />  
                    <input type="submit" value="Cancel" className="btn btn-secondary" onClick={this.handleCancel} style={btnStyle} />   
                </form>
            </div>
        )
    }
}

const formStyle = {
    marginLeft: "15%",
    marginRight: "15%"
}

const btnStyle = {
    marginRight: "1em"
}

export default EditBlog
