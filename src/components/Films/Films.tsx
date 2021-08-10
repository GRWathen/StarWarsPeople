import React from 'react';

import { FilmsType } from '../../types';

import { fetchJson } from '../../api';

import LinkContext from "../../contexts/linkContext/linkContext";

function Films(filmType: FilmsType) {
    const { link } = React.useContext(LinkContext);
    const [films, setFilms] = React.useState<string[]>([]);

    React.useEffect(() => {
        if (link === "www.swapi.tech") {
            return;
        };

        const promises = [];
        for (let index = 0; index < filmType.filmsUrls.length; index++) {
            const idx = filmType.filmsUrls[index].indexOf("/api/films") + 5; // skip '/api/'
            const url = filmType.filmsUrls[index].slice(idx);

            promises.push(
                fetchJson<{ results: object }>(url, link)
            );
        }

        Promise.all(promises)
            .then(function(films) {
                const array: Array<string> = [];
                films.forEach(function(film) {
                    array.push(Object(film)["title"]);
                });
                // TODO: Can't perform a React state update on an unmounted component.
                setFilms(array);
            });
    }, [filmType, films, link]);

    return (
        <div>
            <div>Films:</div>
            {
                films.map(function (value: string) {
                    return <div key={value}><span className="films-label">&nbsp;</span>{value}</div>;
                })
            }
        </div>
    );
}

export default Films;
