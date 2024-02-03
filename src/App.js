import Register from "./screens/RegisterScreen";
import Login from "./screens/LoginScreen";
import Header from "./components/Header";
import { BrowserRouter as Router, Route } from "react-router-dom";
import HomeScreen from "./screens/HomeScreen";


function App() {
  return (
    <Router>
      <main>
        <Header />
        <Route exact path="/" component={HomeScreen} />
        <Route path="/register" component={Register} />
        <Route path="/login" component={Login} />
      </main>
    </Router>
  );
}

export default App;
