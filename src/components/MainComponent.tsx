import React, { useCallback } from "react";
import { Author } from "../types";
import { AuthorComponent } from "../components";
import { Data } from "../App";

interface MainComponentProps {
    data: Data,
    page: number;
    setPage: (page: number) => void;
}

export const MainComponent: React.FC<MainComponentProps> = ({
    data,
    page,
    setPage,
}: MainComponentProps): JSX.Element => {
    const handleLoadComments = useCallback(() => setPage(page + 1), [page]);

    const getLikes = useCallback(() => {
        let likes = 0;
        data.iPagination.data.forEach(el => likes += el.likes);
        return likes;
    }, [data]);

    const getComments = useCallback(() => {
        let comments = 0; 
        data.iPagination.data.forEach(el => comments = el.text ? comments + 1 : comments);
        return comments;
    }, [data]);
    
    console.log(data);

    return (
        <React.Fragment>
            <header className="App-header">
                <span>{getComments()} comments</span>
                <span>&#10084; {getLikes()}</span>
            </header>

            <main className="App-main">
                {data.authors.map((author: Author, i: number) => <AuthorComponent key={i} data={data} author={author}/>)}
            </main>

            {/* <div>
                {data[1].data.map((comment: Comment) => <div key={comment.id}>{comment.text}</div>)}
            </div> */}

            <button disabled={!data || page === data.iPagination.pagination.total_pages} onClick={handleLoadComments}>Load more comments</button>
        </React.Fragment>
    );
};
