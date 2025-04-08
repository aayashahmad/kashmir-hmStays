import Head from "next/head";

const CustomHead = ({
  pageTitle,
  metaTitle,
  metaDescription,
  ogTitle,
  ogDescription,
  ogImage,
  canonical,
  schemaValue,
}) => {
  return (
    <Head>
      <title>
        {pageTitle ||
          "100% Satisfaction Guaranteed or Your Money Back – Explore Kashmir with Confidence!"}
      </title>

      <meta
        name="description"
        content={
          metaDescription ||
          `Experience the beauty of Kashmir risk-free. If you're not satisfied, we'll refund your money, no questions asked! Book your dream trip now!`
        }
      />
      <meta
        property="title"
        content={
          metaTitle ||
          pageTitle ||
          "100% Satisfaction Guaranteed or Your Money Back – Explore Kashmir with Confidence!"
        }
        key="title"
      />

      {ogTitle && <meta property="og:title" content={ogTitle} />}

      {ogDescription && (
        <meta property="og:description" content={ogDescription} />
      )}

      {ogImage && <meta property="og:image" content={ogImage} />}

      {canonical && <link rel="canonical" href={canonical} />}

      <link rel="icon" href="/favicon.ico" />

      <link
        rel="alternate"
        hreflang="en"
        href="https://kashmirnirvana.com/en/"
      />

      <script
        type="application/ld+json"
        src="https://api.kashmirnirvana.com/schema/schema"
        dangerouslySetInnerHTML={{ __html: schemaValue }}
      />
    </Head>
  );
};

export default CustomHead;
