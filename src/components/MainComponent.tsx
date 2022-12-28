import React, { useCallback } from "react";
import Button from '@mui/material/Button';
import LoadingButton from '@mui/lab/LoadingButton';
import { Author, Comment, Pagination } from "../types";
import { CommentComponent, LikesComponent } from "../components";

interface MainComponentProps {
    authors: Author[];
    pagination: Pagination;
    page: number;
    likes: number;
    loading: boolean;
    comments: Comment[];
    setPage: (page: number) => void;
}

export const MainComponent: React.FC<MainComponentProps> = ({
    authors,
    pagination,
    page,
    likes,
    loading,
    comments,
    setPage,
}: MainComponentProps): JSX.Element => {
    const handleLoadComments = useCallback(() => setPage(page + 1), [page, setPage]);

    const isDisabledButton: boolean = page === pagination.total_pages;

    return (
        <React.Fragment>
            <header className="App-header">
                <span>{comments.length} comments</span>

                <LikesComponent likes={likes} />
            </header>

            <main className="App-main">
                {comments.map(comment => {
                    return (
                        <CommentComponent
                            key={comment.id}
                            comment={comment}
                            author={authors.filter((author: Author) => author.id === comment.author)}
                        // innerComments={pagination.data.filter(el => el.parent === comment.id)}
                        />
                    );
                })}
            </main>

            {!loading ?
                (
                    <Button
                        variant="contained"
                        disabled={isDisabledButton}
                        onClick={handleLoadComments}
                        fullWidth
                    >
                        Load more comments
                    </Button>
                )
                :
                (
                    <LoadingButton loading variant="outlined">
                        Loading
                    </LoadingButton>
                )
            }
        </React.Fragment>
    );
};
