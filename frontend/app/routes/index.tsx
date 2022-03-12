export default function Index() {
  return (
    <div className="container">
      <h1 className="text-xl font-bold mb-5">Welcome to Remix</h1>
      <ul className="divide-y">
        <li className="font-semibold mb-2">
          <a
            target="_blank"
            href="https://remix.run/tutorials/blog"
            rel="noreferrer"
          >
            15m Quickstart Blog Tutorial
          </a>
        </li>
        <li className="font-semibold mb-2">
          <a
            target="_blank"
            href="https://remix.run/tutorials/jokes"
            rel="noreferrer"
          >
            Deep Dive Jokes App Tutorial
          </a>
        </li>
        <li className="font-semibold mb-2">
          <a target="_blank" href="https://remix.run/docs" rel="noreferrer">
            Remix Docs
          </a>
        </li>
      </ul>
    </div>
  );
}
