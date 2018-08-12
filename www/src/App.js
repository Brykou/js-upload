import React from "react";
import FileList from "./containers/FileList";
import Uploader from "./containers/Uploader";
import Error from "./containers/Error";
import "./App.css";

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <h1 className="App-title">Upload files</h1>
        <Uploader />
        <Error />
        <FileList />
      </div>
    );
  }
}

export default App;
