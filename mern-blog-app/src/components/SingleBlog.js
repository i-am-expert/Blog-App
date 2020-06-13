import React, { Component } from 'react'
import { FaUserCircle } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import axios from 'axios';

class SingleBlog extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            blog: {}
        }
    }
    
    async componentDidMount() {
        await axios.get(`http://localhost:5000/blogs`+window.location.pathname)
        .then(res => {
            this.setState({
                blog: res.data
            })
        })
        .catch(err => console.log(err));
    }

    deleteBlog = (id) => {
        axios.delete('http://localhost:5000/blogs/' + id)
        .then(res => console.log(res.data));
        this.setState({
            blogs: this.state.blogs.filter(blog => blog._id !== id)
        })
    }

    goBack = (e) => {
        window.location = '/'
    }

    render() {
        return (
            <div className="container" style={{paddingLeft: "100px", paddingRight: "100px"}}>
                <div style={{display: "flex", flexDirection: "row", marginBottom: "10px"}}>
                    <FaUserCircle size={34} style={{marginRight: "10px"}}/>
                    <h6>Author : {this.state.blog.author}</h6>
                </div>
                <h4 style={{color: "#007BFF"}}>{this.state.blog.title}</h4>
                <p>{this.state.blog.description}</p>
                <div style={{display: "flex"}}>
                    <Link className="btn btn-primary btn-success" style={editLinkStyle} to={"/blogs/update/"+this.state.blog._id}>Edit</Link>
                    <a href="/" onClick={() => { this.deleteBlog(this.state.blog._id) }} className="btn btn-primary btn-danger" style={{width: "10%", marginRight: "10px"}}>Delete</a>
                    <input type="submit" value="Go Back" className="btn btn-secondary" onClick={this.goBack} style={{width: "12%"}}/>
                </div>
            </div>
        )
    }
}

const editLinkStyle = {
    color: "white",
    textDecoration: "none",
    width: "10%", 
    marginRight: "10px"
}

export default SingleBlog
