import React from "react";
import FileList from "./containers/FileList";
import Uploader from "./containers/Uploader";

import "./App.css";

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <h1 className="App-title">Upload files</h1>
        <Uploader />
        <FileList />
      </div>
    );
  }
}

export default App;
