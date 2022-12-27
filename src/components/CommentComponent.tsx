import React from "react";
import { Author, Comment } from "../types";
import { LikesComponent } from "./LikesComponent";

interface CommentComponentProps {
    comment: Comment;
    author: Author[];
    // innerComments: Comment[];
}

export const CommentComponent: React.FC<CommentComponentProps> = ({
    comment,
    author,
    // innerComments,
}: CommentComponentProps): JSX.Element => {
    // console.log(innerComments);

    return (
        <>
            <div className="App-comment">
                <img className="App-avatar" src={author[0].avatar} alt="avatar" />

                <div style={{ width: 'calc(100% - 50px - 5%)', padding: '0 0 0 5%' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span>{author[0].name}</span>

                        <LikesComponent likes={comment.likes} />
                    </div>

                    <div>{comment.created}</div>
                    <div>{comment.text}</div>
                </div>
            </div>

            {/* {
                innerComments.length ? innerComments.map((innerComment: Comment, i: number) => (
                    (
                        <div className="App-childComment" key={i}>
                            <img className="App-avatar" src='' alt="avatar" />

                            <div style={{ width: 'calc(100% - 50px - 5%)', padding: '0 0 0 5%' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <span>{`author[0].name`}</span>
                                    <div>&#10084; {innerComment.likes}</div>
                                </div>

                                <div>{innerComment.created}</div>
                                <div>{innerComment.text}</div>
                            </div>
                        </div>
                    )
                )) : null
            } */}
        </>
    );
};
