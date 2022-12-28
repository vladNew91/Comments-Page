import React from "react";
import { Author } from "../types";

interface AuthorComponentProps {
    author: Author;
}

export const AuthorComponent: React.FC<AuthorComponentProps> = ({
    author
}: AuthorComponentProps): JSX.Element => {
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
