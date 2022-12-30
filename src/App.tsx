import React, { useCallback, useEffect, useState, useMemo } from "react";
import getAuthorsRequest from "./api/authors/getAuthorsRequest";
import getCommentsRequest from "./api/comments/getCommentsRequest";
import { Author, IPagination, Comment, Pagination } from "./types";
import { ErrorAlertComponent, LoadingComponent, MainComponent } from "./components";
import "./App.css";

const firstPage = 1;

function App() {
    const [page, setPage] = useState<number>(firstPage);
    const [loading, setLoading] = useState<boolean>(false);
    const [requestError, setRequestError] = useState<boolean>(false);

    const [authors, setAuthors] = useState<Author[]>();
    const [comments, setComments] = useState<Comment[]>();
    const [pagination, setPagination] = useState<Pagination>();

    useEffect(() => {
        setRequestError(false);
        makeRequest();
    }, [page]);

    const toggleLoading = useCallback(() => setLoading(state => !state), []);

    const getLikes: number = useMemo(() => {
        if (!comments) return 0;

        return comments.reduce((acc: number, el: Comment) => {
            acc += el.likes;
            return acc;
        }, 0);
    }, [comments]);

    const makeRequest = useCallback(async () => {
        toggleLoading();

        try {
            const authorsRes: Author[] = await getAuthorsRequest();
            const iPaginationRes: IPagination = await getCommentsRequest(page);

            setAuthors(authorsRes);
            setPagination(iPaginationRes.pagination);

            //  filter and set outher comments
            !comments ? setComments(iPaginationRes.data.filter(el => !el.parent))
                : setComments([...comments, ...iPaginationRes.data.filter(el => !el.parent)]);
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
            {requestError && <ErrorAlertComponent />}

            {(authors && pagination && comments) && (
                <MainComponent
                    page={page}
                    setPage={setPage}
                    authors={authors}
                    loading={loading}
                    pagination={pagination}
                    comments={comments}
                    likes={getLikes}
                />
            )}
        </div>
    );
}

export default App;
