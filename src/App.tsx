import React, { useCallback, useEffect, useState } from "react";
import getAuthorsRequest from "./api/authors/getAuthorsRequest";
import getCommentsRequest from "./api/comments/getCommentsRequest";
import { MainComponent } from "./components";
import { Author, IPagination } from "./types";
import "./App.css";

const first = 1;

export interface Data {
    authors: Author[],
    iPagination: IPagination;
}

function App() {
    const [data, setData] = useState<Data>();

    const [requestError, setRequestError] = useState<boolean>(false);
    const [page, setPage] = useState<number>(first);
    const [loading, setLoading] = useState<boolean>(false);

    const [authors, setAuthors] = useState<Author[]>();
    const [pagination, setPagination] = useState<IPagination>();

    const makeRequest = async (page: number) => {
        toggleLoading();

        try {
            const reqAuthors: Author[] = await getAuthorsRequest();
            const reqPagination: IPagination = await getCommentsRequest(page);

            setAuthors(reqAuthors);
            setPagination(reqPagination);

            setData(() => {
                if(!data) return {authors: reqAuthors, iPagination: reqPagination};

                return {
                    authors: reqAuthors,
                    iPagination: {
                        pagination: {
                            page: page,
                            size: data.iPagination.pagination.page + reqPagination.pagination.size,
                            total_pages: data.iPagination.pagination.total_pages,
                        },
                        data: reqPagination.data,
                    },
                }
            })
        } catch (error) {
            console.log(error);
            const reqAuthors = await getAuthorsRequest();
            const reqPagination = await getCommentsRequest(page);

            setAuthors(reqAuthors);
            setPagination(reqPagination);
        }
        
        toggleLoading();
    };

    useEffect(() => {
        makeRequest(page);
    }, [page]);

    console.log(authors);
    console.log(pagination);

    const toggleLoading = useCallback(() => setLoading(state => !state), []);

    if (loading || !data) return <div className="App"><h3>Loading</h3></div>

    return (
        <div className="App">
            <MainComponent page={page} setPage={setPage} data={data} />

            {requestError && <div>Error</div>}
        </div>
    );
}

export default App;
