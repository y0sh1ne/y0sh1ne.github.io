import React, { useEffect } from "react";
import clsx from "clsx";
import Layout from "@theme/Layout";
import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import styles from "./index.module.css";
import avatarPath from "@site/static/img/asuka.jpg";

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();

  return (
    <header className={clsx(styles.heroBanner)}>
      <div className="container">
        <img src={avatarPath} style={{width: 300, height:'auto', borderRadius: '50%'}} />
        <h1 className="hero__title">{siteConfig.title}</h1>
        <p className="hero__subtitle">{siteConfig.tagline}</p>
        <div className={styles.buttons}>
          <Link className="button button--secondary button--lg" to="/docs/intro">
            前端博客 →
          </Link>
        </div>
      </div>
    </header>
  );
}

export default function Home() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout title={`Hello from ${siteConfig.title}`} description="Description will go into a meta tag in <head />">
      <HomepageHeader />
      <main>
        <Features />
      </main>
    </Layout>
  );
}

//#region FeaturesField
type FeatureItem = {
  title: string;
  description: JSX.Element;
};

const FeatureList: FeatureItem[] = [
{
  title: 'Support Me',
  description: (
    <>
      Give me a star at here <a target="_blank" rel="noopener noreferrer" href="https://github.com/y0sh1ne/y0sh1ne.github.io">GitHub</a>
    </>
  ), 
},
{
  title: 'About Me',
  description: (
    <>
      Master Student now
    </>
  ),
},
{
  title: 'Contact Me',
  description: (
    <>
      <a href="mailto:axin.she@foxmail.com" target="_blank"><></></a>
    </>
  ),
},
];

function Feature({title, description}: FeatureItem) {
return (
  <div className={clsx('col col--4')}>
    <div className="text--center">

    </div>
    <div className="text--center padding-horiz--md">
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  </div>
);
}

function Features(): JSX.Element {
return (
  <section className={styles.features}>
    <div className="container">
      <div className="row">
        {FeatureList.map((item, i) => (
          <Feature key={i} {...item} />
        ))}
      </div>
    </div>
  </section>
);
}
//#endregion
