// TODO: test

import { render, screen } from '@testing-library/react';

import { PersonType } from '../../types';
import Person from './Person'

describe('<Person />', () => {
  test('should render the person\'s name', () => {
    //const person: PersonType = { name: 'Jek Tono Porkins'}
    const person: PersonType = { name: 'Jek Tono Porkins', uid: "", url: "" }

    //render(<Person person={person} />)
    render(<Person name={person.name} uid={person.uid} url={person.url} />)

    screen.getByText(person.name)
  })
});
