import { Outlet } from 'react-router';
import Footer from '../components/Footer';
import Header from '../components/Header';

const Root = () => {
  return (
    <section>
      <div className="">
        <Header></Header>
      </div>
      <div className="max-w-7xl w-11/12 mx-auto my-8 lg:my-16">
        <Outlet></Outlet>
      </div>
      <div className="">
        <Footer></Footer>
      </div>
    </section>
  );
};

export default Root;
