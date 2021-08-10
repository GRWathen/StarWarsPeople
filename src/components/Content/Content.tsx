import React from 'react';

import People from '../People';
import Title from '../Title';

import LinkContext from "../../contexts/linkContext/linkContext";

function Content() {
    // swapi.dev / www.swapi.tech (Content.tsx, linkContext.tsx)
    const [link, setLink] = React.useState("swapi.dev");
    const value = { link, setLink };

    return (
        <LinkContext.Provider value={value}>
            <div>
                <Title />
                <People />
            </div>
        </LinkContext.Provider>
    );
}

export default Content;
