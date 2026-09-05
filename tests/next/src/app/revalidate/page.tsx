import { Example } from "../example";
export const revalidate = 1;
export default function Page() {
  // oxlint-disable-next-line react/purity -- This server-only timestamp proves that ISR regenerated the page.
  const generatedAt = Date.now();
  return (
    <>
      <p data-testid="generated-at">{generatedAt}</p>
      <Example />
    </>
  );
}
