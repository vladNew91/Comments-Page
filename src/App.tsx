import React, { useCallback, useEffect, useState } from "react";
import getAuthorsRequest from "./api/authors/getAuthorsRequest";
import getCommentsRequest from "./api/comments/getCommentsRequest";
import { ErrorAlertComponent, LoadingComponent, MainComponent } from "./components";
import { Author, IPagination, Comment, Pagination } from "./types";
import "./App.css";

const firstPage = 1;

function App() {
    const [page, setPage] = useState<number>(firstPage);
    const [requestError, setRequestError] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);

    const [authors, setAuthors] = useState<Author[]>();
    const [pagination, setPagination] = useState<Pagination>();
    const [comments, setComments] = useState<Comment[]>();

    useEffect(() => {
        setRequestError(false);
        makeRequest();
    }, [page]);

    const toggleLoading = useCallback(() => setLoading(state => !state), []);

    const makeRequest = useCallback(async function makeRequest() {
        toggleLoading();

        try {
            const authorsRes: Author[] = await getAuthorsRequest();
            const iPaginationRes: IPagination = await getCommentsRequest(page);

            setAuthors(authorsRes);
            setPagination(iPaginationRes.pagination);

            !comments ? setComments(iPaginationRes.data) : setComments([...comments, ...iPaginationRes.data]);
        } catch (error) {
            console.log(error);
            setRequestError(true);
            makeRequest();
        }

        toggleLoading();
    }, [comments, page, toggleLoading]);

    return (
        <div className="App">
            {loading && <LoadingComponent />}
            {!authors && !pagination && <LoadingComponent />}

            {
                (authors && pagination && comments)
                &&
                <MainComponent
                    page={page}
                    setPage={setPage}
                    authors={authors}
                    pagination={pagination}
                    comments={comments.filter(el => !el.parent)}
                    likes={comments.filter(el => !el.parent).reduce((acc: number, el: Comment) => {
                        acc += el.likes;
                        return acc;
                    }, 0)}
                    loading={loading}
                />
            }

            {requestError && <ErrorAlertComponent />}
        </div>
    );
}

export default App;
