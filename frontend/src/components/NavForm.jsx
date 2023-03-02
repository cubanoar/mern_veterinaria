import { Link } from 'react-router-dom';

const NavForm = ({ link1, path1, link2, path2 }) => {
  return (
    <nav className='p-4 text-gray-400 text-center flex flex-col gap-2 md:flex-row md:justify-between'>
      <Link to={`${path1}`}>{`${link1}`}</Link>
      {link2 && <Link to={`${path2}`}>{`${link2}`}</Link>}
    </nav>
  );
};

export default NavForm;
