import "./App.sass";
import Header from "./Header";
import Main from "./components/Main";
import Footer from "./Footer";
import { StoreProvider } from "./store";

function App() {
  return (
    <div className="app">
      <StoreProvider>
        <Header />
        <Main />
        <Footer />
      </StoreProvider>
    </div>
  );
}

export default App;
