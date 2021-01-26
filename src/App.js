import "./App.sass";
import Header from "./Header";
import Main from "./components/Main";
import Footer from "./Footer";
import { StoreProvider } from "./store";

function App() {
  return (
    <StoreProvider>
      <div className="app">
        <Header />
        <Main />
        <Footer />
      </div>
    </StoreProvider>
  );
}

export default App;
