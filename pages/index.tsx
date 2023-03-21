import { InputList } from "@/components/FormList";
import Head from "next/head";

export default function Home() {
  return (
    <main>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Form builder" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="grid">
        <div />
        <div>
          <article>
            <InputList />
          </article>
        </div>
        <div />
      </div>
    </main>
  );
}
