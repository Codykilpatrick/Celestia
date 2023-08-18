import { Container, Flex, IconButton, Link } from '@radix-ui/themes';
import { SunIcon, MoonIcon } from '@radix-ui/react-icons';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Container py={'5'} size="2">
        <Flex gap="5" align={'center'} justify={'center'} direction="row">
          {/* Link component come from radix ui */}
          <Link href="/" weight="medium">
            Home
          </Link>
          <Link href="/blogs" weight="medium">
            Blog
          </Link>
          <Link href="/about" weight="medium">
            About us
          </Link>
          <Link href="/contact" weight="medium">
            Contact us
          </Link>
          {/* Use it onClick event and pass the theme name as an argument. */}
          <IconButton variant="outline">
            <SunIcon />
          </IconButton>
          <IconButton variant="outline">
            <MoonIcon />
          </IconButton>
        </Flex>
      </Container>
    </main>
  );
}
