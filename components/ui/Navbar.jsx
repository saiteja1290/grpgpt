const Navbar = () => {
    return (
      <nav className="fixed top-0 left-0 right-0 bg-black p-5 z-10 m-3">
        <ul className="flex space-x-4 text-white justify-end">
          <li><a href="/" className="hover:underline">Home</a></li>
          <li><a href="/signup" className="hover:underline">Signup</a></li>
          <li><a href="/login" className="hover:underline">LogIn</a></li>
        </ul>
      </nav>
    );
  };
  
  export default Navbar;