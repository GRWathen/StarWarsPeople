export interface PersonsType {
  persons: PersonType[];
  next: () => void;
  previous: () => void;
}

export interface PersonType {
  name: string;
  uid: string;
  url: string;
}

export interface PersonPropertiesType {
  name: string;
  url: string;
}

export interface PersonTypeII {
  properties: PersonPropertiesType;
  uid: string;
}

export interface PersonDetailType {
  person: string;
}

export interface SpeciesType {
  speciesUrl: string;
}

export interface FilmsType {
  filmsUrls: string[];
}

export interface SearchType {
  search: (name: string) => void;
}
