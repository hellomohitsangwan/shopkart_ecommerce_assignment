import Register from "./screens/RegisterScreen";
import Login from "./screens/LoginScreen";
import Header from "./components/Header";
import { BrowserRouter as Router, Route } from "react-router-dom";
import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/ProductScreen";
import CartScreen from "./screens/CartScreen";
import FavouriteScreen from "./screens/FavouriteScreen";
import CompareScreen from "./screens/CompareScreen";


function App() {
  return (
    <Router>
      <main>
        <Header />
        <Route exact path="/" component={HomeScreen} />
        <Route path="/register" component={Register} />
        <Route path="/login" component={Login} />
        <Route path="/product/:id" component={ProductScreen} />
        <Route path="/cart/:id?" component={CartScreen} />
        <Route path="/favourites/:id?" component={FavouriteScreen} />
        <Route path="/compare" component={CompareScreen} />
      </main>
    </Router>
  );
}

export default App;
