import "./App.css";
import { HashRouter } from "react-router-dom";
import RouterView from "@/router/index.jsx";

function App() {
  return (
    <HashRouter>
      <RouterView />
    </HashRouter>
  );
}

export default App;
