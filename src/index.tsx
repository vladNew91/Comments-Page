import React from "react";
import ReactDOM from "react-dom/client";
import useMockAdapter from "./api/useMockAdapter";
import "./index.css";
import Counter from "./App";

const root = ReactDOM.createRoot(
    document.getElementById("root") as HTMLElement,
);

const RootApp = () => {
    useMockAdapter();

    return <Counter />;
};

root.render(
    <React.StrictMode>
        <RootApp />
    </React.StrictMode>,
);
