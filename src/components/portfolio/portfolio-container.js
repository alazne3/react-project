import React, { Component } from "react";
import axios from "axios";

import PortfolioItem from "./portfolio-item";

export default class PortfolioContainer extends Component {
    constructor() {
        super();

        this.state = {
            pageTitle: "Welcome",
            isLoading: false, 
            /*data: [
                {title: "Quip", category: "eCommerce", slug: "quip"},
                {title: "Eventbrite", category: "Scheduling", slug: "eventbrite"},
                {title: "Ministry Safe", category: "Enterprise", slug: "ministry-safe"},
                {title: "SwingAway", category: "eCommerce", slug: "swingaway"}
            ]*/
            data: []
        };

        //this.handlePageTitleUpdate = this.handlePageTitleUpdate.bind(this);

        this.handleFilter = this.handleFilter.bind(this);
        /*this.getPortfolioItems = this.getPortfolioItems.bind(this);*/
    }

    //Filter
    handleFilter(filter) {
        if (filter === "CLEAR_FILTERS") {
            this.getPortfolioItems();
        } else {
            /*this.setState({
                data: this.state.data.filter(item => {
                    return item.category === filter;
                })
            });*/
            this.getPortfolioItems(filter);
        }
    }

    getPortfolioItems(filter = null) { //filter es opcional
        axios
        //.get('https://alazne.devcamp.space/portfolio/portfolio_items')
        .get('https://jordan.devcamp.space/portfolio/portfolio_items')
        .then(response => {
            /*console.log(response);*/
            if (filter) {
                this.setState({
                    data: response.data.portfolio_items.filter(item => {
                        return item.category === filter;
                    })
                });
            } else {
                this.setState({
                    data: response.data.portfolio_items
                });
            }
        })
        .catch(error => {
            console.log(error);
        })
    }

    portfolioItems() {
        return this.state.data.map(item => {
            //debugger;
            //console.log("item data", item);
            return <PortfolioItem
                key={item.id}
                /*title={item.name}
                url={item.url}
                slug={item.id}*/
                item={item} />;
            //return <PortfolioItem title={item.title} url={"google.com"} slug={item.slug} />;
            //return <h1>{item}</h1>;
        })
    }

    /*//Change state value
    handlePageTitleUpdate() {
        this.setState({
            pageTitle: "Something else"
        })
    }*/

    componentDidMount() {
        this.getPortfolioItems();
    }

    render() {
        if (this.state.isLoading) {
            return <div>Loading...</div>
        }

        /*this.getPortfolioItems();*/

        return (
            <div className="homepage-wrapper">
                {/*<h2>Portfolio items go here...</h2>*/}
                {/*<h2>{this.state.pageTitle}</h2>*/}
                <div className="filter-links">
                    <button className="btn" onClick={() => this.handleFilter("eCommerce")}>
                        eCommerce
                    </button>
                    <button className="btn" onClick={() => this.handleFilter("Scheduling")}>
                        Scheduling
                    </button>
                    <button className="btn" onClick={() => this.handleFilter("Enterprise")}>
                        Enterprise
                    </button>
                    <button className="btn" onClick={() => this.handleFilter("CLEAR_FILTERS")}>
                        All
                    </button>
                </div>

                <div className="portfolio-items-wrapper">
                    {this.portfolioItems()}
                </div>
                {/*<button onClick={this.handlePageTitleUpdate}>Change title</button>*/}
            </div>
        )
    }
}