import React, { useEffect } from "react";
import clsx from "clsx";
import Layout from "@theme/Layout";
import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import styles from "./index.module.css";
import avatarPath from "@site/static/img/asuka.jpg";
import noisePath from "@site/static/img/noise.png";

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();

  useEffect(() => {
    (async function () {
      const vsSource = `
      precision mediump float;

      attribute vec2 aPosition;
      attribute vec2 aUV;
      
      varying vec2 vUV;
      varying vec2 vPos;
      
      void main() {
          gl_Position = vec4(aPosition, 0.0, 1.0);
          vUV = aUV;
          vPos = aPosition;
      }
      `;
      const fsSource = `
      precision mediump float;
      
      uniform sampler2D uTexture1;
      uniform sampler2D uTexture2;
      
      uniform float uVar;
      
      varying vec2 vUV;
      varying vec2 vPos;
      
      
      float random (vec2 st) {
          return fract(sin(dot(st.xy,vec2(12.9898,78.233)))* 43758.5453123);
      }
      
      void main() {
          vec4 color1 = texture2D(uTexture1, vUV);
          vec4 color2 = texture2D(uTexture2, vUV);
          vec4 color3 = vec4(vec3(random(vUV)), 1.);
      
          if (color2.r - uVar < 0.0) {
              discard;
          }
      
          gl_FragColor = color1;
      }
     `;

      const [avatarElement, noiseElement] = await Promise.all([
        createImageElement(avatarPath),
        createImageElement(noisePath),
      ]);
      const webGLManager = new WebGLManager(document.querySelector("canvas"));
      const { gl } = webGLManager;

      webGLManager
        .init(vsSource, fsSource)
        .loadBuffer(
          new Float32Array([
            1.0, 1.0, 1, 1, -1.0, 1.0, 0, 1, -1.0, -1.0, 0, 0, -1.0, -1.0, 0, 0,
            1.0, -1.0, 1, 0, 1.0, 1.0, 1, 1,
          ])
        )
        .setAttrib("aPosition", 2, gl.FLOAT, false, 16, 0)
        .setAttrib("aUV", 2, gl.FLOAT, false, 16, 8)
        .loadTexture(avatarElement)
        .setUniform("uTexture1", "uniform1i", 0)
        .loadTexture(noiseElement)
        .setUniform("uTexture2", "uniform1i", 1);

      let value = 0.0;
      let reverse = false;
      draw();

      function draw() {
        const uniform2 = gl.getUniformLocation(webGLManager.program, "uVar");
        gl.uniform1f(uniform2, reverse ? (value -= 0.01) : (value += 0.01));

        if (value >= 1) {
          reverse = true;
        }

        if (value <= 0) {
          reverse = false;
        }

        webGLManager.draw(webGLManager.gl.TRIANGLES, 6);

        requestAnimationFrame(draw);
      }
    })();
  }, []);

  return (
    <header className={clsx(styles.heroBanner)}>
      <div className="container">
        {/* <img src={avatarPath} style={{width: 280, borderRadius: '50%'}} />  */}
        <canvas width="300" height="300" style={{ borderRadius: '50%' }} />
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

class WebGLManager {
  gl: WebGLRenderingContext;
  program: WebGLProgram;
  vShader: WebGLShader;         //v==vertex
  fShader: WebGLShader;  //f==fragment
  buffer: WebGLBuffer;
  textures = [];

  constructor(canvasElement: HTMLCanvasElement) {
    this.gl = canvasElement.getContext("webgl");
    this.gl.pixelStorei(this.gl.UNPACK_FLIP_Y_WEBGL, true);
  }
  /**
   * @param vShaderSource vertexShaderSource
   * @param fShaderSource fragmentShaderSource
   */
  init(vShaderSource: string, fShaderSource: string) {

    const vShader = (this.vShader = this.gl.createShader(this.gl.VERTEX_SHADER));
    this.gl.shaderSource(vShader, vShaderSource);
    this.gl.compileShader(vShader);

    const fShader = (this.fShader = this.gl.createShader(this.gl.FRAGMENT_SHADER));
    this.gl.shaderSource(fShader, fShaderSource);
    this.gl.compileShader(fShader);

    const program = (this.program = this.gl.createProgram());
    this.gl.attachShader(program, vShader);
    this.gl.attachShader(program, fShader);
    this.gl.linkProgram(program);
    this.gl.useProgram(program);

    return this;
  }

  loadBuffer(typedArray) {
    const buffer = (this.buffer = this.gl.createBuffer());
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, buffer);
    this.gl.bufferData(this.gl.ARRAY_BUFFER, typedArray, this.gl.STATIC_DRAW);

    return this;
  }

  loadTexture(image) {
    const texture = this.gl.createTexture();

    this.gl.activeTexture(this.gl["TEXTURE" + this.textures.length]);
    this.gl.bindTexture(this.gl.TEXTURE_2D, texture);
    this.gl.texImage2D(
      this.gl.TEXTURE_2D,
      0,
      this.gl.RGBA,
      this.gl.RGBA,
      this.gl.UNSIGNED_BYTE,
      image
    );

    this.gl.texParameteri(
      this.gl.TEXTURE_2D,
      this.gl.TEXTURE_MIN_FILTER,
      this.gl.LINEAR
    );
    this.gl.texParameteri(
      this.gl.TEXTURE_2D,
      this.gl.TEXTURE_WRAP_S,
      this.gl.CLAMP_TO_EDGE
    );
    this.gl.texParameteri(
      this.gl.TEXTURE_2D,
      this.gl.TEXTURE_WRAP_T,
      this.gl.CLAMP_TO_EDGE
    );

    this.textures.push(texture);
    return this;
  }

  setAttrib(name, size, type, normalized, stride, offset) {
    const location1 = this.gl.getAttribLocation(this.program, name);
    this.gl.vertexAttribPointer(
      location1,
      size,
      type,
      normalized,
      stride,
      offset
    );
    this.gl.enableVertexAttribArray(location1);

    return this;
  }

  setUniform(name, type, value) {
    const location = this.gl.getUniformLocation(this.program, name);
    this.gl[type](location, value);

    return this;
  }

  draw(type: GLenum, count: GLsizei) {
    this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
    this.gl.clearColor(0, 0, 0, 0);
    this.gl.clear(this.gl.COLOR_BUFFER_BIT);
    this.gl.drawArrays(type, 0, count);
  }

  then(callback: Function) {
    callback.call(this);

    return this;
  }
}

function createImageElement(path: string): Promise<HTMLImageElement> {
  return new Promise((resolve) => {
    const image = new Image();
    image.src = path;
    image.onload = function () {
      resolve(image);
    };
  });
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
