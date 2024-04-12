const { test, expect } = require('@jest/globals');
const { crawlPage, normalizeURL, getURLsFromHTML } = require('./crawl.js');

test('normalizeURL strip protocol', () => {
  const input = 'https://dominicgerman.com/about';
  const acutal = normalizeURL(input);
  const expected = 'dominicgerman.com/about';
  expect(acutal).toEqual(expected);
});

test('normalizeURL strip trailing slash', () => {
  const input = 'https://dominicgerman.com/about/';
  const acutal = normalizeURL(input);
  const expected = 'dominicgerman.com/about';
  expect(acutal).toEqual(expected);
});

test('normalizeURL capitals', () => {
  const input = 'https://DOMINICGERMAN.COM/about/';
  const acutal = normalizeURL(input);
  const expected = 'dominicgerman.com/about';
  expect(acutal).toEqual(expected);
});

test('getURLsFromHTML absolute', () => {
  const inputHTML = `
  <html>
    <body>
        <a href="https://dominicgerman.com/about"><span>Go to my website</span></a>
    </body>
  </html>
  `;
  const inputURL = 'https://dominicgerman.com/about';
  const acutal = getURLsFromHTML(inputHTML, inputURL);
  const expected = ['https://dominicgerman.com/about'];
  expect(acutal).toEqual(expected);
});

test('getURLsFromHTML relative', () => {
  const inputHTML = `
  <html>
    <body>
        <a href="/about"><span>Go to my website</span></a>
    </body>
  </html>
  `;
  const inputURL = 'https://dominicgerman.com';
  const acutal = getURLsFromHTML(inputHTML, inputURL);
  const expected = ['https://dominicgerman.com/about'];
  expect(acutal).toEqual(expected);
});

test('getURLsFromHTML both relative and absolute', () => {
  const inputHTML = `
  <html>
    <body>
        <a href="/resume"><span>Go to my resume</span></a>
        <a href="https://dominicgerman.com/about"><span>Go to my website</span></a>
    </body>
  </html>
  `;
  const inputURL = 'https://dominicgerman.com';
  const acutal = getURLsFromHTML(inputHTML, inputURL);
  const expected = [
    'https://dominicgerman.com/resume',
    'https://dominicgerman.com/about',
  ];
  expect(acutal).toEqual(expected);
});

test('getURLsFromHTML invalid', () => {
  const inputHTML = `
  <html>
    <body>
        <a href="invalid"><span>An invalid URL</span></a>
    </body>
  </html>
  `;
  const inputURL = 'https://dominicgerman.com';
  const acutal = getURLsFromHTML(inputHTML, inputURL);
  const expected = [];
  expect(acutal).toEqual(expected);
});

test('crawl pages function', async () => {
  const url = 'https://dominicgerman.com';
  const actual = await crawlPage(url);
  const expected = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="description" content="A portfolio site for Dominic German" />
    <link
      href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500&display=swap"
      rel="stylesheet"
    />
    <link rel="stylesheet" href="styles.css" />
    <link rel="icon" href="https://dominicgerman.com/favicon.png" />
    <title>Dominic German</title>
  </head>
  <body class="layout">
    <nav class="nav">
      <a class="homeBtn" href="/"> DG </a>
      <a href="./about">About</a>
      <a href="#projects">Projects</a>
      <a href="/resume.pdf" target="_blank"> Resume </a>
      <a class="contactLink" href="#contact"> Contact </a>
    </nav>
    <main>
      <section class="welcome">
        <div class="flex">
          <h1 class="welcomeMsg">My name is Dominic. This is my portfolio.</h1>
          <p class="welcomeMsg">
            I made this portfolio site with plain old HTML and CSS. The visual
            design is inspired by
            <a href="https://fullstackopen.com/en" target="_blank"
              >Full Stack Open</a
            >. The site is being served by a containerized Node app running on a
            Digital Ocean droplet running Ubuntu.
          </p>
          <div class="projectLinks">
            <a
              href="https://github.com/dominicgerman/bobloblawsblog"
              target="_blank"
            >
              <button class="buttonLarge">View source</button>
            </a>
            <a href="/resume.pdf" target="_blank">
              <button class="buttonLarge">View Resume</button>
            </a>
          </div>
        </div>
      </section>

      <!-- --------------- ABOUT ---------------- -->

      <section class="about">
        <h2>About me</h2>
        <p>
          I am a web developer, digital content manager, and professional
          singer. I'm one half of
          <a
            href="https://mountprospectwebdesign.com"
            class="link"
            target="_blank"
            >Mount Prospect Web Design</a
          >, a small business that designs and builds web solutions for other
          small businesses.
          <a href="./about" class="link"> Learn more about me</a>.
        </p>
      </section>

      <!-- --------------- PROJECTS ---------------- -->

      <section class="projects" id="projects">
        <h2 class="heading">Projects</h2>
        <ul class="projectsList">
          <li class="projectItem">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/8/84/Spotify_icon.svg"
              width="212"
              height="211"
              class=""
            />
            <div class="projectInfo contentContainer">
              <h3>spotify-shuffle</h3>
              <p>
                A command line tool that allows me to start playback of my
                Spotify playlists at the location of a specific song without any
                queuing, filtering, or skipping and without taking my hands off
                the keyboard. I built it with Node.js, SQLite, and the Spotify
                Web API.
              </p>
              <ul class="techItems small">
                <li>Node.js</li>
                <li>SQLite</li>
              </ul>
              <div class="projectLinks">
                <a
                  href="https://github.com/dominicgerman/spotify-shuffle/blob/main/README.md"
                  target="_blank"
                >
                  <button class="buttonLarge btnSmall">More info</button>
                </a>
                <a
                  href="https://github.com/dominicgerman/spotify-shuffle"
                  target="_blank"
                >
                  <button class="buttonLarge btnSmall">View source</button>
                </a>
              </div>
            </div>
          </li>
          <li class="projectItem">
            <img
              src="https://d1firgrab96w2d.cloudfront.net/kd/office.svg"
              width="212"
              height="211"
              class=""
            />
            <div class="projectInfo contentContainer">
              <h3>Mount Prospect Web Design</h3>
              <p>
                I made this marketing site for a small business I run with my
                wife. It's a static site built with Sveltekit, and deployed from
                Cloudflare. The images are hosted on an AWS Cloudfront
                distribution and the blog is a collection of Markdown files.
              </p>
              <ul class="techItems small">
                <li>Sveltkit</li>
                <li>Markdown</li>
                <li>Cloudflare</li>
                <li>AWS</li>
              </ul>
              <div class="projectLinks">
                <a href="https://mountprospectwebdesign.com" target="_blank">
                  <button class="buttonLarge btnSmall">View project</button>
                </a>
                <a
                  href="https://github.com/dominicgerman/koda-designs-v2"
                  target="_blank"
                >
                  <button class="buttonLarge btnSmall">View source</button>
                </a>
              </div>
            </div>
          </li>
          <li class="projectItem">
            <img
              src="https://d1firgrab96w2d.cloudfront.net/imgs/daphnes_thumbnail.jpg"
              width="212"
              height="211"
              class="borderRadius"
            />
            <div class="projectInfo contentContainer">
              <h3>Daphne's Bar</h3>
              <p>
                During the pandemic, I learned the basics of fullstack
                development and got really into home bartending. This app came
                in handy when entertaining. I built it with Node, Express,
                MongoDB and React. All that was left was to do content research
                🥂
              </p>
              <ul class="techItems small">
                <li>React</li>
                <li>Node</li>
                <li>MongoDB</li>
              </ul>
              <div class="projectLinks">
                <a href="https://daphnes.fly.dev/" target="_blank">
                  <button class="buttonLarge btnSmall">View project</button>
                </a>
                <a
                  href="https://github.com/dominicgerman/daphnes_fullstack"
                  target="_blank"
                >
                  <button class="buttonLarge btnSmall">View Source</button>
                </a>
              </div>
            </div>
          </li>
          <li class="projectItem">
            <img
              src="https://npcovenant.cc/npcc-logo.svg?__frsh_c=348abcccdc648522f6a53d05a29cd90034ea6be5"
              width="212"
              height="211"
              class="borderRadius"
              style="background-color: white"
            />
            <div class="projectInfo contentContainer">
              <h3>North Park Covenant Church</h3>
              <p>
                A custom Wordpress theme I developed for a local church. The
                code is mostly PHP and SASS with a little bit of Javascript.
                This project was surprisingly fun and taught me a lot about
                working with clients, bug fixes, and the Wordpress ecosystem.
              </p>
              <ul class="techItems small">
                <li>HTML/CSS</li>
                <li>JS</li>
                <li>PHP</li>
                <li>Wordpress</li>
              </ul>
              <div class="projectLinks">
                <a href="https://npcovenant.org" target="_blank">
                  <button class="buttonLarge btnSmall">View project</button>
                </a>
              </div>
            </div>
          </li>
          <li class="projectItem">
            <img
              src="https://d1firgrab96w2d.cloudfront.net/imgs/tomato-svgrepo-com.svg"
              width="212"
              height="211"
              class="borderRadius"
            />
            <div class="projectInfo contentContainer">
              <h3>Pomodoro Timer</h3>
              <p>
                I built this timer with React to help increase my productivity
                and focus. Writing the code proved to be a welcome distraction
                from all the work I should have been doing at the time. The
                design comes from
                <a href="https://www.frontendmentor.io/" target="_blank"
                  >frontendmentor.io.</a
                >
              </p>
              <ul class="techItems small">
                <li>React</li>
                <li>Vite</li>
                <li>Vercel</li>
              </ul>
              <div class="projectLinks">
                <a
                  href="https://pomodoro-dominicgerman.vercel.app/"
                  target="_blank"
                >
                  <button class="buttonLarge btnSmall">View project</button>
                </a>
                <a
                  href="https://github.com/dominicgerman/pomodoro"
                  target="_blank"
                >
                  <button class="buttonLarge btnSmall">View source</button>
                </a>
              </div>
            </div>
          </li>
          <li class="projectItem">
            <img
              src="https://d1firgrab96w2d.cloudfront.net/kd/snoot.jpg"
              width="212"
              height="211"
              class="borderRadius"
            />
            <div class="projectInfo contentContainer">
              <h3>Designer Portfolio</h3>
              <p>
                This was an existing Squarespace site that I recreated using
                React and Sanity CMS. I wanted the owner to be able to easily
                manage her content without having to pay a monthly fee. I built
                it as a single page React app that fetches data from Sanity's
                content lake via their JS client.
              </p>
              <ul class="techItems small">
                <li>React</li>
                <li>Sanity</li>
              </ul>
              <div class="projectLinks">
                <a href="https://victoriagerman.com/" target="_blank">
                  <button class="buttonLarge btnSmall">View project</button>
                </a>
                <a
                  href="https://github.com/dominicgerman/victoria_portfolio"
                  target="_blank"
                >
                  <button class="buttonLarge btnSmall">View source</button>
                </a>
              </div>
            </div>
          </li>
        </ul>
      </section>

      <!-- --------------- CONTACT ---------------- -->

      <section class="contactMe contentContainer" id="contact">
        <h2>Contact me</h2>
        <p>
          Want to get in touch? Feel free to reach out for project inquiries, or
          just to say hello.
        </p>
        <a href="mailto:dominicgerman@gmail.com?" target="_blank" class="link">
          Email</a
        >
        <a
          href="https://www.linkedin.com/in/dominic-german/"
          target="_blank"
          class="link"
        >
          LinkedIn</a
        >
        <a href="https://github.com/dominicgerman" target="_blank" class="link">
          GitHub</a
        >
      </section>
    </main>
  </body>
</html>
`;
  expect(actual).toEqual(expected);
});
