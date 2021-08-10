import React from "react";

import { PersonType } from '../../types';

import PersonContext from "../../contexts/personContext/personContext";

function Person({ name, uid, url }: PersonType) {
  const { changePerson } = React.useContext(PersonContext);

  function clickDetails() {
    changePerson(url);
  }

  return (
    <div>
      <button onClick={clickDetails}>Details</button>
      {name}
    </div>
  )
}

export default Person
