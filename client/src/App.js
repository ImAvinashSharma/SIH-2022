import './App.css';
import Footer from './components/Footer/Footer';
import Nav from './components/Nav/Nav';
import Main from './pages/Main';

function App() {
  return (
    <div className="min-h-screen w-full flex flex-col items-center">
      {/* nav */}
      <Nav />
      {/* main */}
      <Main/>
      {/* footer */}
      <Footer />
    </div>
  );
}

export default App;
