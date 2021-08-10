import React from "react";

// swapi.dev / www.swapi.tech (Content.tsx, linkContext.tsx)
const LinkContext = React.createContext({
    link: "swapi.dev",
    setLink: (link: string) => {}
});

export default LinkContext;
