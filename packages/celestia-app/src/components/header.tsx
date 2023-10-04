import Link from 'next/link';

const Header = () => {
  return (
    <>
      <div className="bg-violet-4 h-16 mx-12 rounded-b-lg flex-col flex justify-center">
        <ul className="flex justify-between mx-4">
          <li className="text-mauve-12 px-2">
            <Link href="/">Home</Link>
          </li>
          <li className="text-mauve-12 px-2">
            <Link href="/blog">Dev Blog</Link>
          </li>
        </ul>
      </div>
      <h1 className="text-mauve-12 px-2 mx-12 flex justify-center">Celestia</h1>
    </>
  );
};

export default Header;
