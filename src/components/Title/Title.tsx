import React from 'react';

import LinkContext from "../../contexts/linkContext/linkContext";

function Title() {
    const { link, setLink } = React.useContext(LinkContext);

    function clickDev() {
        setLink("swapi.dev");
    }

    function clickTech() {
        setLink("www.swapi.tech");
    }

    return (
        <div className="sw-title">
            <div className="sw-title-text">STAR WARS People </div>
            <div className="sw-title-link">{link} </div>
            <div>
                <button onClick={clickDev}>swapi.dev</button>
                <button onClick={clickTech}>www.swapi.tech</button>
            </div>
        </div>
    );
}

export default Title;
