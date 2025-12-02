import Image from "next/image";
import Link from "next/link";
export default function Navbar() {
  return (
    <header>
      <nav>
        <Link href="/" className="logo">
          <Image src="/icons/logo.png" alt="Logo" width={24} height={24} />
          <p>Tech Event</p>
        </Link>{" "}
        <ul>
          <Link href="/">home</Link>
          <Link href="/">Events</Link>
          <Link href="/">create Events</Link>
        </ul>
      </nav>
    </header>
  );
}
