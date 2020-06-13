import React, { Component } from 'react'
import axios from 'axios';
import { FaUserCircle } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Blog = props => (
    <div className="container" style={{paddingLeft: "100px", paddingRight: "100px", marginBottom: "3rem"}}>
        <div style={{display: "flex", flexDirection: "row", marginBottom: "10px"}}>
            <FaUserCircle size={34} style={{marginRight: "10px"}}/>
            <h6>Author : {props.blog.author}</h6>
        </div>
        <h4><Link to={"/"+props.blog._id}>{props.blog.title}</Link></h4>
        <p style={descStyle}>{props.blog.description}</p>
        <div style={{display: "flex"}}>
            <Link className="btn btn-primary btn-success" style={editLinkStyle} to={"/blogs/update/" + props.blog._id}>Edit</Link>
            <a href="/" onClick={() => { props.deleteBlog(props.blog._id) }} className="btn btn-primary btn-danger" style={{width: "10%"}}>Delete</a>
        </div>
    </div>
)

class Blogs extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
             blogs: []
        }
    }
    
    async componentDidMount() {
        await axios.get('http://localhost:5000/blogs')
        .then(res => {
            this.setState({
                blogs: res.data
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

    blogList = () => {
        return this.state.blogs.map(currentBlog => {
            return <Blog blog={currentBlog} deleteBlog={this.deleteBlog} key={currentBlog._id} />
        });
    }

    render() {
        return (
            <div>
                { this.blogList() }
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

const descStyle = {
    lineHeight: "1.5em",
    maxHeight: "4.5em",
    overflow: "hidden",
    textOverflow: "ellipsis",
    width: "100%",
    display: "-webkit-box", 
    /* The number of lines to be displayed */ 
    WebkitLineClamp: "3",
    WebkitBoxOrient: "vertical" 

}

export default Blogs
