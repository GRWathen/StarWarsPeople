import React from "react";

import Species from '../Species';
import Films from '../Films';

import { PersonDetailType } from '../../types';

import { fetchJson } from '../../api';

import LinkContext from "../../contexts/linkContext/linkContext";
import PersonContext from "../../contexts/personContext/personContext";

function PersonDetail(person: PersonDetailType) {
  const { link } = React.useContext(LinkContext);
  const { changePerson } = React.useContext(PersonContext);

  const [name, setName] = React.useState<string>("");
  const [gender, setGender] = React.useState<string>("");
  const [birthYear, setBirthYear] = React.useState<string>("");
  const [height, setHeight] = React.useState<string>("");
  const [mass, setMass] = React.useState<string>("");
  const [hairColor, setHairColor] = React.useState<string>("");
  const [eyeColor, setEyeColor] = React.useState<string>("");
  const [skinColor, setSkinColor] = React.useState<string>("");
  const [speciesUrl, setSpeciesUrl] = React.useState<string>("");
  const [filmsUrls, setFilmsUrls] = React.useState<string[]>([]);

  function clickBack() {
    changePerson("");
  }

  React.useEffect(() => {
    const index = person.person.indexOf("/api/people") + 5; // skip '/api/'
    const url = person.person.slice(index);

    fetchJson<{ results: object }>(url, link)
      .then(personResponse => {
        if (link === "swapi.dev") {
          setName(Object(personResponse)["name"]);
          setGender(Object(personResponse)["gender"]);
          setBirthYear(Object(personResponse)["birth_year"]);
          setHeight(Object(personResponse)["height"]);
          setMass(Object(personResponse)["mass"]);
          setHairColor(Object(personResponse)["hair_color"]);
          setEyeColor(Object(personResponse)["eye_color"]);
          setSkinColor(Object(personResponse)["skin_color"]);
          setSpeciesUrl(Object(personResponse)["species"][0]);
          setFilmsUrls(Object(personResponse)["films"]);
        }
        else if (link === "www.swapi.tech") {
          setName(Object(personResponse)["result"]["properties"]["name"]);
          setGender(Object(personResponse)["result"]["properties"]["gender"]);
          setBirthYear(Object(personResponse)["result"]["properties"]["birth_year"]);
          setHeight(Object(personResponse)["result"]["properties"]["height"]);
          setMass(Object(personResponse)["result"]["properties"]["mass"]);
          setHairColor(Object(personResponse)["result"]["properties"]["hair_color"]);
          setEyeColor(Object(personResponse)["result"]["properties"]["eye_color"]);
          setSkinColor(Object(personResponse)["result"]["properties"]["skin_color"]);
          setSpeciesUrl("");
          setFilmsUrls([]);
        }
      });
  }, [person, link]);

  return (
    <div className="person-detail">
      <div><span className="person-detail-label">Name:</span>{name}</div>
      <div><span className="person-detail-label">Gender:</span>{gender}</div>
      <div><span className="person-detail-label">Birth Year:</span>{birthYear}</div>
      <div><span className="person-detail-label">Height:</span>{height}</div>
      <div><span className="person-detail-label">Mass:</span>{mass}</div>
      <div><span className="person-detail-label">Hair Color:</span>{hairColor}</div>
      <div><span className="person-detail-label">Eye Color:</span>{eyeColor}</div>
      <div><span className="person-detail-label">Skin Color:</span>{skinColor}</div>
      <Species speciesUrl={speciesUrl} />
      <Films filmsUrls={filmsUrls} />
      <div>
        <button onClick={clickBack}>Back</button>
      </div>
    </div>
  )
}

export default PersonDetail
