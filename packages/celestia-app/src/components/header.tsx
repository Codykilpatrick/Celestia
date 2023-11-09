import Link from 'next/link';

const Header = () => {
  return (
    <div className="bg-black h-16  flex-col flex justify-center">
      <ul className="flex justify-between mx-4">
        <li className="text-gray-11 px-2 hover:text-gray-12">
          <Link href="/">Home</Link>
        </li>
        <li className="text-gray-11 px-2 hover:text-gray-12">
          <Link href="/blog">Dev Blog</Link>
        </li>
        <li className="text-gray-11 px-2 hover:text-gray-12">
          <Link href="/feedback">Feedback</Link>
        </li>
      </ul>
      </div>
  );
};

export default Header;
