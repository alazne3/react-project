import React, { Component } from "react";
import axios from "axios";
import DropzoneComponent from "react-dropzone-component";

import "../../../react-project/node_modules/react-dropzone-component/styles/filepicker.css";
import "../../../react-project/node_modules/dropzone/dist/min/dropzone.min.css";


export default class PortfolioForm extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            name: "",
            description: "",
            category: "eCommerce", //valor por defecto
            position: "",
            url: "",
            thumb_image: "",
            banner_image: "",
            logo: "",
            editMode: false,
            apiUrl: "https://alazne.devcamp.space/portfolio/portfolio_items",
            apiAction: "post"
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.componentConfig = this. componentConfig.bind(this);
        this.djsConfig = this.djsConfig.bind(this);
        this.handleThumbDrop = this.handleThumbDrop.bind(this);
        this.handleBannerDrop = this.handleBannerDrop.bind(this);
        this.handleLogoDrop = this.handleLogoDrop.bind(this);
        this.deleteImage = this.deleteImage.bind(this);

        this.thumbRef = React.createRef();
        this.bannerRef = React.createRef();
        this.logoRef = React.createRef();
    }

    handleThumbDrop() {
        return {
            addedfile: File => this.setState({ thumb_image: File })
        };
    }

    handleBannerDrop() {
        return {
            addedfile: File => this.setState({ banner_image: File })
        };
    }

    handleLogoDrop() {
        return {
            addedfile: File => this.setState({ logo: File })
        };
    }

    componentConfig() {
        return {
            iconFiletypes: [".jpg", ".png"],
            showFiletypeIcon: true,
            postUrl: "https://httpbin.org/post"
        }
    }

    djsConfig() {
        return {
            addRemoveLinks: true,
            maxFiles: 1
        }
    }

    buildForm() {
        let formData = new FormData();

        formData.append("portfolio_item[name]", this.state.name);
        formData.append("portfolio_item[url]", this.state.url);
        formData.append("portfolio_item[position]", this.state.position);
        formData.append("portfolio_item[category]", this.state.category);
        formData.append("portfolio_item[description]", this.state.description);
        
        if (this.state.thumb_image) {
            formData.append("portfolio_item[thumb_image]", this.state.thumb_image);
        }

        if (this.state.banner_image) {
            formData.append("portfolio_item[banner_image]", this.state.banner_image);
        }

        if (this.state.logo) {
            formData.append("portfolio_item[logo]", this.state.logo);
        }

        return formData;
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    deleteImage(imageType) {
        axios.delete(`https://api.devcamp.space/portfolio/delete-portfolio-image/${this.state.id}?image_type=${imageType}`,
            { withCredentials: true }
        ).then(response => {
            this.setState({
                [`${imageType}_url`]: ""
            });
        }).catch(error => {
            console.log("imagerror", error);
        });
    }

    handleSubmit(event) {
        /*axios.post(
            "https://alazne.devcamp.space/portfolio/portfolio_items",
            this.buildForm(),
            {withCredentials: true}
            )*/
        axios({
            method: this.state.apiAction,
            url: this.state.apiUrl,
            data: this.buildForm(),
            withCredentials: true
        })
           .then(response => {
                if (this.state.editMode) {
                    this.props.handleEditFormSubmission();
                } else {
                    this.props.handleNewFormSubmission(response.data.portfolio_item);
                    console.log("response", response);
                }

                this.setState({
                    name: "",
                    description: "",
                    category: "eCommerce", //valor por defecto
                    position: "",
                    url: "",
                    thumb_image: "",
                    banner_image: "",
                    logo: "",
                    editMode: false,
                    apiUrl: "https://alazne.devcamp.space/portfolio/portfolio_items",
                    apiAction: "post"
                });
                
                [this.thumbRef, this.bannerRef, this.logoRef].forEach(ref => {
                    ref.current.dropzone.removeAllFiles();
                })
            }).catch(error => {
                console.log("error", error);
            });

        event.preventDefault();
    }

    componentDidUpdate() {
        if (Object.keys(this.props.portfolioToEdit).length > 0) {
            const {
                id,
                name,
                description,
                category,
                position,
                url,
                thumb_image_url,
                banner_image_url,
                logo_url
            } = this.props.portfolioToEdit;

            this.props.clearPortfolioToEdit();

            this.setState({
                id: id,
                name: name || "",
                description: description || "",
                category: category || "eCommerce",
                position: position || "",
                url: url || "",
                editMode: true,
                apiUrl: `https://alazne.devcamp.space/portfolio/portfolio_items/${id}`,
                apiAction: "patch",
                thumb_image_url: thumb_image_url || "",
                banner_image_url: banner_image_url || "",
                logo_url: logo_url || ""
            })
        }
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit} className="portfolio-form-wrapper">
                <div className="two-column">
                    <input
                        type="text"
                        name="name"
                        placeholder="Portfolio Item Name"
                        value={this.state.name}
                        onChange={this.handleChange}
                    />

                    <input
                        type="text"
                        name="url"
                        placeholder="URL"
                        value={this.state.url}
                        onChange={this.handleChange}
                    />
                </div>
                <div className="two-column">
                    <input
                        type="text"
                        name="position"
                        placeholder="Position"
                        value={this.state.position}
                        onChange={this.handleChange}
                    />

                    <select
                        name="category"
                        value={this.state.category}
                        onChange={this.handleChange}
                        className="select-element"
                    >
                        <option value="eCommerce">eCommerce</option>
                        <option value="Scheduling">Scheduling</option>
                        <option value="Enterprise">Enterprise</option>
                    </select>
                </div>
                <div className="one-column">
                    <textarea
                        type="text"
                        name="description"
                        placeholder="Description"
                        value={this.state.description}
                        onChange={this.handleChange}
                    />
                </div>
                <div className="image-uploaders three-column">
                    {this.state.thumb_image_url && this.state.editMode ? (
                        <div className="portfolio-manager-image-wrapper">
                            <img src={this.state.thumb_image_url} />

                            <div className="image-removal-link">
                                <a onClick={() => this.deleteImage("thumb_image")}>Remove</a>
                            </div>
                        </div>
                    ) : (
                        <DropzoneComponent
                            ref={this.thumbRef}
                            config={this.componentConfig()}
                            djs={this.djsConfig()}
                            eventHandlers={this.handleThumbDrop()}
                        >
                            <div className="dz-message">Thumbnail</div>
                        </DropzoneComponent>)
                    }
                    
                    {this.state.banner_image_url && this.state.editMode ? (
                        <div className="portfolio-manager-image-wrapper">
                            <img src={this.state.banner_image_url} />

                            <div className="image-removal-link">
                                <a onClick={() => this.deleteImage("banner_image")}>Remove</a>
                            </div>
                        </div>
                    ) : (
                        <DropzoneComponent
                            ref={this.bannerRef}
                            config={this.componentConfig()}
                            djs={this.djsConfig()}
                            eventHandlers={this.handleBannerDrop()}
                        >
                            <div className="dz-message">Banner</div>
                        </DropzoneComponent>
                    )}
                    
                    {this.state.logo_url && this.state.editMode ? (
                        <div className="portfolio-manager-image-wrapper">
                            <img src={this.state.logo_url} />

                            <div className="image-removal-link">
                                <a onClick={() => this.deleteImage("logo")}>Remove</a>
                            </div>
                        </div>
                    ) : (
                        <DropzoneComponent
                            ref={this.logoRef}
                            config={this.componentConfig()}
                            djs={this.djsConfig()}
                            eventHandlers={this.handleLogoDrop()}
                        >
                            <div className="dz-message">Logo</div>
                        </DropzoneComponent>
                    )}
                    
                </div>
                <div>
                    <button type="submit" className="btn">Save</button>
                </div>
            </form>
        );
    }
}