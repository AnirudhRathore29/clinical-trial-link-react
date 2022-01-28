import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import './Assets/css/responsive.css';
import Header from './Components/Header/Header';
import Footer from './Components/Footer/Footer';
import RoutesJS from './Config/RoutesJS';
import { BrowserRouter } from 'react-router-dom';
import ScrollToTop from './Components/ScrollToTop/ScrollToTop';


function App() {
  return (
    <>
      <BrowserRouter>
          <ScrollToTop />
          <Header />
          <RoutesJS />
          <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;