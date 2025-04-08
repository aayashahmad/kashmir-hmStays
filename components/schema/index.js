import Head from "next/head";

const CustomHead = ({ title, data }) => {
  return (
    <Head>
      <title>{title}</title>
      <meta name="data" content={data}  />
      <link rel="icon" href="/favicon.png" />
      <script type="application/ld+json" src="https://api.kashmirnirvana.com/schema/schema"></script>
    </Head>
  );
};

export default CustomHead;