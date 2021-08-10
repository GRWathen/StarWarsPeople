import React from 'react';

import { SearchType } from '../../types';

function Search(search: SearchType) {
    const initialState = {
        name: ""
    }

    const [formData, setFormData] = React.useState(initialState);
    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setFormData(formData => ({
            ...formData,
            [name]: value
        }));
    }

    const handleSubmit = (e: React.SyntheticEvent) => {
        e.preventDefault();
        search.search(formData.name);
        setFormData(initialState);
    }

    return (
        <form className="search" onSubmit={handleSubmit}>
            <label htmlFor="name">Name: </label>
            <input
                id="name"
                type="text"
                name="name"
                placeholder="name"
                value={formData.name}
                onChange={handleChange}
            />

            <button>Search</button>
        </form>
    );
}

export default Search;
