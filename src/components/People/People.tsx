import React from 'react';

import Search from '../Search';
import Persons from '../Persons';
import PersonDetail from '../PersonDetail';

import { PersonType, PersonTypeII } from '../../types';

import { fetchJson } from '../../api';

import LinkContext from "../../contexts/linkContext/linkContext";
import PersonContext from "../../contexts/personContext/personContext";

function People() {
  const { link } = React.useContext(LinkContext);

  const [url, setUrl] = React.useState<string>("people");
  const [people, setPeople] = React.useState<PersonType[]>([]);

  const [person, setPerson] = React.useState<string>("");
  const changePerson = (p: string) => {
    setPerson(p);
  };

  const [next, setNext] = React.useState<String>("");
  const [previous, setPrevious] = React.useState<String>("");

  function clickSearch(name: string) {
    if (link === "swapi.dev") {
      setUrl(`people/?search=${name}`);
    }
    else if (link === "www.swapi.tech") {
      setUrl(`people/?name=${name}`);
    }
  }

  function clickNext() {
    setPerson("");
    if (next !== null) {
      const index = next.indexOf(`${link}/api/people`) + `${link}/api/people`.length;
      setUrl("people" + next.slice(index));
    }
  }
  function clickPrevious() {
    setPerson("");
    if (previous !== null) {
      const index = previous.indexOf(`${link}/api/people`) + `${link}/api/people`.length;
      setUrl("people" + previous.slice(index));
    }
  }

  React.useEffect(() => {
    if (person !== "") {
      return;
    }

    if (link === "swapi.dev") {
      fetchJson<{ results: PersonType[], next: String, previous: String, message: string, total_records: number }>(url, link)
        .then(peopleResponse => {
          setNext(peopleResponse.next);
          setPrevious(peopleResponse.previous);

          setPeople(peopleResponse.results);
        });
    }
    else if (link === "www.swapi.tech") {
      fetchJson<{ results: PersonType[], result: PersonTypeII[], next: String, previous: String, message: string, total_records: number }>(url, link)
        .then(peopleResponse => {
          if (peopleResponse.results) {
            setNext(peopleResponse.next);
            setPrevious(peopleResponse.previous);

            setPeople(peopleResponse.results);
            return;
          }
          else {
            setNext("");
            setPrevious("");

            let response: PersonType[] = peopleResponse.result.map(function (person) {
              return {
                uid: person["uid"],
                name: person["properties"].name,
                url: person["properties"].url
              }
            });
            setPeople(response);
          }
        });
    }
  }, [url, person, link]);

  return (
    <PersonContext.Provider value = {{ changePerson }}>
      <div>
        {
          (person === "")
          ?
          <>
            <Search search={clickSearch} />
            <Persons persons={people} next={clickNext} previous={clickPrevious} />
          </>
          :
          <PersonDetail person={person} />
        }
      </div>
    </PersonContext.Provider>
  );
}

export default People
