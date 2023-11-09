import Link from 'next/link';

const Header = () => {
  return (
    <div className="bg-black h-16  flex-col flex justify-center">
      <ul className="flex justify-between mx-4">
        <li className="text-mauve-12 px-2 hover:text-blue-500">
          <Link href="/">Home</Link>
        </li>
        <li className="text-mauve-12 px-2 hover:text-blue-500">
          <Link href="/blog">Dev Blog</Link>
        </li>
        <li className="text-mauve-12 px-2 hover:text-blue-500">
          <Link href="/feedback">Feedback</Link>
        </li>
      </ul>
      </div>
  );
};

export default Header;
