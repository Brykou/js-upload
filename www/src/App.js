import React from "react";
import FileList from "./containers/FileList";
import Uploader from "./containers/Uploader";
import Error from "./containers/Error";
import Search from "./containers/Search";
import "./App.css";

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <h1 className="App-title">Upload files</h1>
        <Error />
        <Uploader />
        <Search />
        <FileList />
      </div>
    );
  }
}

export default App;
