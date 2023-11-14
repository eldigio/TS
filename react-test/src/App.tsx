import Footer from "./components/Footer";
import Header from "./components/Header";
import Main from "./components/Main";
import Navbar from "./components/Navbar";

function App() {
  return (
    <main className="h-screen grid grid-rows-4 gap-2 border border-error">
      <Navbar />
      <Header />
      <Main />
      <Footer />
    </main>
  );
}

export default App;
