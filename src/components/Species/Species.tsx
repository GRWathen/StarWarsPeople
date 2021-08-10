import React from 'react';

import { SpeciesType } from '../../types';

import { fetchJson } from '../../api';

import LinkContext from "../../contexts/linkContext/linkContext";

function Species(speciesType: SpeciesType) {
    const { link } = React.useContext(LinkContext);
    const [species, setSpecies] = React.useState<string>("");

    React.useEffect(() => {
        if (speciesType.speciesUrl === undefined) {
            setSpecies("");
        }
        else {
            const index = speciesType.speciesUrl.indexOf("/api/species") + 5; // skip '/api/'
            const url = speciesType.speciesUrl.slice(index);
            fetchJson<{ results: object }>(url, link)
                .then(speciesResponse => {
                    if (speciesType.speciesUrl.length > 0) {
                        setSpecies(Object(speciesResponse)["name"]);
                    }
                });
        }
    }, [speciesType, species, link]);

    return (
        <div><span className="person-detail-label">Species:</span>{species}</div>
    );
}

export default Species;
