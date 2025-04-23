import Header from './Header';
import Navbar from './Navbar';

function Layout({ children }) {
  return (
    <div className="app">
      <Header />
      <Navbar />
      <main className="container">{children}</main>
    </div>
  );
}

export default Layout;