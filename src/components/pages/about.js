import React from "react";
import profilePicture from "../../../static/assets/images/bio/street.png";

export default function() {
    return (
        <div className="content-page-wrapper">
            <div
                className="left-column"
                style={{
                    background: "url(" + profilePicture + ") no-repeat",
                    backgroundSize: "cover",
                    backgroundPosition: "center"
                }}
            />
            <div className="right-column">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc ac tristique elit. Nullam sollicitudin purus dui, ac vulputate metus rutrum ac. Phasellus feugiat tortor eu tincidunt fermentum. Proin fermentum enim vitae nisl interdum, sit amet dictum neque imperdiet. Curabitur non congue quam, vitae malesuada massa. Etiam euismod luctus bibendum. Curabitur condimentum placerat mattis. Donec blandit, nulla scelerisque rhoncus mollis, metus odio gravida sem, ut euismod sem enim et orci. Ut sed nisi ut dui convallis tristique sed rhoncus orci. Integer mattis auctor est et pharetra. Quisque ante leo, lacinia sit amet semper id, condimentum aliquam diam. Proin viverra neque quis nibh ullamcorper sagittis.

            Fusce urna lacus, facilisis vel sagittis quis, imperdiet non lacus. Maecenas ullamcorper ultrices urna et egestas. Cras nunc diam, consectetur quis interdum sit amet, pharetra at sem. Sed iaculis tellus ac tempus pretium.
            </div>
        </div>
    );
}