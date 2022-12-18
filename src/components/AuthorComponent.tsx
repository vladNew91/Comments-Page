import React from "react";
import { Data } from "../App";
import { Author } from "../types";

interface AuthorComponentProps {
    author: Author;
    data: Data,
}

export const AuthorComponent: React.FC<AuthorComponentProps> = ({ author, data }: AuthorComponentProps): JSX.Element => {
    // console.log(data[1].data.filter(el => el.id === author.id)[0].text);

    console.log();
    

    return (
        <div className="App-comment">
            <img className="App-avatar" src={author.avatar} alt="avatar" />

            <div>
                <span>{author.name}</span>
                <span>{author.id}</span>
            </div>
        </div>
    );
};
