import './App.css';
import Header from './MyComponents/Header';
import Footer from './MyComponents/Footer';
import Contacts from './MyComponents/Contacts';

function App() {
  return (
    <>
      <Header title="Contact Directory" darkmode={true} link1="Home" link2="About Us"/>
      <Contacts/>
      <Footer/>
    </>
  );
}

export default App;
