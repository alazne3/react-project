import React from "react";
import PortfolioItem from "./portfolio-item";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const PortfolioSidebarList = (props) => {
    const portfolioList = props.data.map(portfolioItem => {
        return (
        <div key={portfolioItem.id} className="portfolio-item-thumb">
            <div className="portfolio-item-thumb-img">
                <img src={portfolioItem.thumb_image_url} />
            </div>
            {/*<h2>{portfolioItem.id}</h2>*/}
            <div className="text-content">
                <div className="title">{portfolioItem.name}</div>
                <div className="actions">
                    <a className="action-icon" onClick={() => props.handleEditClick(portfolioItem)}>
                        <FontAwesomeIcon icon="pencil" />
                    </a>
                    <a className="action-icon" onClick={() => props.handleDeleteClick(portfolioItem)}>
                        <FontAwesomeIcon icon="trash" />
                    </a>
                </div>
            </div>
        </div>
        )
    })

    return <div className="portfolio-sidebar-list-wrapper">
        {portfolioList}
    </div>
}

export default PortfolioSidebarList;