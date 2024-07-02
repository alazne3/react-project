import React, { Component } from "react";
import axios from "axios";
import ReactHtmlParser from "react-html-parser";

import BlogFeaturedImage from "../blog/blog-featured-image";
import BlogForm from "./blog-form";

export default class BlogDetail extends Component {
    constructor(props) {
        super(props);

        this.state = {
            currentId: this.props.match.params.slug,
            blogItem: {},
            editMode: false
        };

        this.handleEditClick = this.handleEditClick.bind(this);
        this.handleFeaturedImageDelete = this.handleFeaturedImageDelete.bind(this);
        this.handleUpdateFormSubmission = this.handleUpdateFormSubmission.bind(this);
    }

    getBlogItem() {
        axios.get(`https://alazne.devcamp.space/portfolio/portfolio_blogs/${this.state.currentId}`)
        .then(response => {
            //console.log("response", response);
            this.setState({
                blogItem: response.data.portfolio_blog
            });
        }).catch(error => {
            console.log("getblogitem error", error);
        });
    }

    componentDidMount() {
        this.getBlogItem();
    }

    handleEditClick() {
        this.setState({ editMode: true });
    }

    handleFeaturedImageDelete() {
        this.setState({
            blogItem: {
                featured_image_url: ""
            }
        })
    }

    handleUpdateFormSubmission(blog) {
        this.setState({
            blogItem: blog,
            editMode: false
        })
    }

    render() {
        /*console.log("currentId", this.state.currentId);*/

        const {
            blog_status,
            title,
            content,
            featured_image_url
        } = this.state.blogItem;

        const contentManager = () => {
            if (this.state.editMode && this.props.loggedInStatus === "LOGGED_IN") {
                return <BlogForm
                    editMode={this.state.editMode}
                    blog={this.state.blogItem}
                    handleFeaturedImageDelete={this.handleFeaturedImageDelete}
                    handleUpdateFormSubmission={this.handleUpdateFormSubmission}
                    />
            } else {
                return (
                    <div className="content-container">
                        <h1 onClick={this.handleEditClick}>{title}</h1>

                        <BlogFeaturedImage img={featured_image_url} />
                        <div className="content">
                            {ReactHtmlParser(content)}
                        </div>
                    </div>
                );
            }
        }

        return (
            <div className="blog-container">
                {/*<div className="content-container">
                    <h1 onClick={this.handleEditClick}>{title}</h1>*/}

                    {/*featured_image_url ?
                        (<div className="featured-image-wrapper">
                            <img src={featured_image_url} />
                        </div>) : null
                    */}

                    {/*<BlogFeaturedImage img={featured_image_url} />
                    <div className="content">
                        {ReactHtmlParser(content)}
                    </div>
                </div>*/}

                {contentManager()}
                
            </div>
        );
    }
}