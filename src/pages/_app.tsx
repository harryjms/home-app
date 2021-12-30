import React from "react";
import "../styles/global.css";

const App = ({ Component, pageProps }) => {
  return (
    <>
      <header className="bg-blue-500 p-2 text-white">
        <div className="container">
          <h1>Home</h1>
        </div>
      </header>
      <Component {...pageProps} />
    </>
  );
};

export default App;
