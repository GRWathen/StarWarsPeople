import React from "react";

import Person from '../Person';

import { PersonsType } from '../../types';

function Persons({ persons, next, previous }: PersonsType) {
  return (
    <div className="persons">
      {persons.map((person) => <Person key={person.name} name={person.name} uid={person.uid} url={person.url} />) }
      <div className="persons-buttons">
          <button onClick={previous}>PREVIOUS</button>
          <button onClick={next}>NEXT</button>
        </div>
    </div>
  )
}

export default Persons
