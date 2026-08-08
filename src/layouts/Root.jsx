import { Outlet } from 'react-router';
import Footer from '../components/Footer';
import Header from '../components/Header';

const Root = () => {
  return (
    <section>
      <div className="">
        <Header></Header>
      </div>
      <div className="w-11/12 mx-auto my-8 lg:my-16 2xl:my-24">
        <Outlet></Outlet>
      </div>
      <div className="">
        <Footer></Footer>
      </div>
    </section>
  );
};

export default Root;
