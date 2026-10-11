import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
} from "react";

import "./index.css";

const PERSON = "Nancy";

type Stage = "cake" | "message" | "photos" | "gift" | "wish" | "final";

function App() {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const [started, setStarted] = useState(false);
  const [stage, setStage] = useState<Stage>("cake");
  const [cakeCut, setCakeCut] = useState(false);
  const [giftOpen, setGiftOpen] = useState(false);
  const [wished, setWished] = useState(false);
  const [burst, setBurst] = useState(false);
  const [showIntro, setShowIntro] = useState(true);
  const [candleOut, setCandleOut] = useState(false);

  const particles = useMemo(
    () =>
      Array.from({ length: 45 }, (_, i) => ({
        id: i,
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        delay: `${Math.random() * 5}s`,
        duration: `${4 + Math.random() * 7}s`,
        size: `${1 + Math.random() * 3}px`,
      })),
    []
  );

  useEffect(() => {
    if (!burst) return;
    const timer = setTimeout(() => setBurst(false), 3000);
    return () => clearTimeout(timer);
  }, [burst]);

  const begin = () => {
    setStarted(true);
    setStage("cake");

    if (audioRef.current) {
      audioRef.current.volume = 0.55;
      audioRef.current.currentTime = 0;
      audioRef.current.muted = false;
      audioRef.current.play().catch(() => {});
    }
  };

  const cutCake = () => {
    if (cakeCut) return;

    setCakeCut(true);
    setBurst(true);

    window.setTimeout(() => {
      setCandleOut(true);
    }, 1800);

    window.setTimeout(() => {
      setBurst(false);
    }, 4500);
  };

  const openGift = () => {
    setGiftOpen(true);
    setBurst(true);
  };

  const makeWish = () => {
    setWished(true);
    setBurst(true);
  };

  const replay = () => {
    setStarted(false);
    setStage("cake");
    setCakeCut(false);
    setGiftOpen(false);
    setWished(false);
    setBurst(false);
  };

  const balloons = Array.from({ length: 24 }, (_, i) => ({
    id: i,
    left: `${2 + ((i * 17) % 94)}%`,
    delay: `${(i % 8) * 0.1}s`,
    duration: `${3.4 + (i % 5) * 0.45}s`,
    size: `${34 + (i % 4) * 9}px`,
    rotate: `${-18 + (i % 7) * 6}deg`,
  }));

  return (
    <main className={`app ${started ? "started" : ""}`}>
      {showIntro && (
        <div
          className="birthday-cinematic-intro"
          onClick={() => setShowIntro(false)}
        >
          <div className="intro-stars">
            {Array.from({ length: 28 }, (_, i) => (
              <span
                key={i}
                style={{
                  left: `${(i * 37) % 100}%`,
                  top: `${(i * 61) % 100}%`,
                  animationDelay: `${(i % 8) * 0.35}s`,
                }}
              />
            ))}
          </div>

          <div className="intro-glow" />

          <div className="intro-content">
            <p className="intro-eyebrow">
              A LITTLE SOMETHING FOR
            </p>

            <h1>Nancy</h1>

            <p className="intro-line">
              Today is all about you.
            </p>

            <button
              className="intro-start-button"
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                setShowIntro(false);
              }}
            >
              BEGIN THE CELEBRATION
              <span>→</span>
            </button>

            <p className="intro-hint">
              Click anywhere to begin
            </p>
          </div>
        </div>
      )}


      <audio
        ref={audioRef}
        src="/music/birthday.weba"
        loop
        preload="none"
        autoPlay={false}
      />

      <div className="noise" />

      <div className="ambient ambient-one" />
      <div className="ambient ambient-two" />

        {started &&
          particles.map((p) => (
            <span
              key={p.id}
              className="particle"
              style={{
                left: p.left,
                top: p.top,
                width: p.size,
                height: p.size,
                animationDelay: p.delay,
                animationDuration: p.duration,
              }}
            />
          ))}

      <div className="stage-animation">
        {burst && (
          <div className="confetti-layer">
            {Array.from({ length: 70 }, (_, i) => (
              <span
                key={i}
                className="confetti"
                style={{
                  left: `${(i * 37) % 100}%`,
                  animationDelay: `${(i % 8) * 0.05}s`,
                  transform: `rotate(${i * 27}deg)`,
                }}
              />
            ))}
          </div>
        )}
      </div>



      {!started ? (
        <section className="hero intro">
          <div
            className="intro-content"
          >
            <div className="eyebrow">
              <span className="eyebrow-line" />
              A LITTLE SOMETHING
              <span className="eyebrow-line" />
            </div>

            <div
              className="floating-star star-a"
            >
              <span className="simple-icon">✦</span>
            </div>

            <div
              className="floating-star star-b"
            >
              <span className="simple-icon">✦</span>
            </div>

            <h1>
              Hey...
              <br />
              <em>wait.</em>
            </h1>

            <p className="intro-text">
              I made something for you.
              <br />
              And I really hope you like it.
            </p>

            <button
              className="primary-button"
              onClick={begin}
            >
              OPEN YOUR SURPRISE
              <span className="simple-icon">✦</span>
            </button>

            <p className="tiny-hint">Take a moment. There&apos;s no rush.</p>
          </div>
        </section>
      ) : (
        <div className="stage-animation">
          {stage === "cake" && (
            <section
              key="cake"
              className="cake-cut-screen screen-stage"
            >
              <div className="cake-stars">
                {Array.from({ length: 35 }, (_, i) => (
                  <span
                    key={i}
                    style={{
                      left: `${(i * 37) % 100}%`,
                      top: `${(i * 61) % 100}%`,
                      animationDelay: `${(i % 7) * 0.4}s`,
                    }}
                  />
                ))}
              </div>

              {cakeCut && (
                <div className="balloon-celebration">
                  {balloons.map((balloon) => (
                    <span
                      key={balloon.id}
                      className="flying-balloon"
                      style={
                        {
                          left: balloon.left,
                          animationDelay: balloon.delay,
                          animationDuration: balloon.duration,
                          "--balloon-size": balloon.size,
                          "--balloon-rotate": balloon.rotate,
                        } as CSSProperties
                      }
                    >
                      <i />
                    </span>
                  ))}
                </div>
              )}

              <div
                className="cake-intro"
              >
                <p className="small-caps">THE CELEBRATION BEGINS</p>

                <h2>
                  It&apos;s time to
                  <br />
                  <span>cut the cake.</span>
                </h2>

                <p className="cake-subtitle">
                  Make a wish, celebrate the moment,
                  <br />
                  and let the birthday magic begin.
                </p>

                <div className={`birthday-cake realistic-birthday-cake ${cakeCut ? "cake-is-cut" : ""}`}>

  <div className="real-cake-shadow" />

  <div className="real-cake-body">

    <div className="real-cake-top">
      <div className="real-frosting">
        <span className="frost-drop drop-one" />
        <span className="frost-drop drop-two" />
        <span className="frost-drop drop-three" />
      </div>

      <div className="cake-top-shine" />
    </div>

    <div className="real-cake-layer real-layer-upper">
      <div className="sponge-texture">
        <i />
        <i />
        <i />
        <i />
        <i />
        <i />
      </div>
    </div>

    <div className="real-cream-band cream-band-one" />

    <div className="real-cake-layer real-layer-middle">
      <div className="sponge-texture">
        <i />
        <i />
        <i />
        <i />
      </div>
    </div>

    <div className="real-cream-band cream-band-two" />

    <div className="real-cake-layer real-layer-bottom">
      <div className="bottom-shade" />
    </div>

    <div className="cake-cut-line">
      <span />
    </div>

    <div className="cake-cut-shadow" />

  </div>

  <div className={`real-candle ${candleOut ? "candle-is-out" : ""}`}>
    <div className="real-flame">
      <span />
    </div>
    <div className="real-candle-stick" />
  </div>

  <div className="real-knife">
    <div className="real-knife-blade">
      <span />
    </div>
    <div className="real-knife-handle" />
  </div>

  <div className="real-serving-area">

    <div className="real-serving-plate">
      <span />
    </div>

    <div className="real-cake-slice">

      <div className="slice-top-frosting">
        <span />
      </div>

      <div className="slice-body">
        <div className="slice-cream-line one" />
        <div className="slice-cream-line two" />
      </div>

      <div className="slice-bottom-crust" />

      <div className="slice-gloss" />

    </div>

  </div>

  <div className="real-cake-plate">
    <span />
  </div>

  <div className="real-cake-crumbs">
    <i />
    <i />
    <i />
    <i />
    <i />
    <i />
    <i />
    <i />
    <i />
    <i />
  </div>

</div>

                {!cakeCut ? (
                  <button
                    className="cut-cake-button"
                    onClick={cutCake}
                  >
                    <span>🔪</span>
                    CUT THE CAKE
                  </button>
                ) : (
                  <div
                    className="cake-cut-complete"
                  >
                    <div className="celebration-burst">✨ 🎉 🎈 🎈 🎈 🎉 ✨</div>

                    <h3>CAKE CUT! 🎂</h3>

                    <p>Now let&apos;s make this birthday even more special.</p>

                    <button
                      className="cake-next-button"
                      onClick={() => setStage("message")}
                    >
                      NEXT
                      <span>→</span>
                    </button>
                  </div>
                )}
              </div>
            </section>
          )}

          {stage === "message" && (
            <section
              key="message"
              className="message-section screen-stage"
            >
              <div className="section-label">
                <span className="simple-icon">✦</span>
                A MESSAGE FOR YOU
              </div>

              <div
                className="message-card"
              >
        <div className="message-memory-image">
          <img
            src="/images/birthday-memory.svg"
            alt="Birthday memory"
          />
        </div>

<div className="quote-mark">“</div>
                <p className="message-lead">
                  I don&apos;t know if words can actually describe how special you are,
                  but I&apos;ll still try...
                </p>

                <p className="message-support">
                  Thank you for being such a good and supportive friend,
                  a wonderful sister, and a good classmate.
                </p>

                <p className="message-support">
                  I am genuinely lucky that I have you in my life.
                  Your kindness, support, and the memories we share
                  mean more than you know.
                </p>

                <p className="message-support">
                  Thank you for always being there, for supporting me,
                  and for simply being you.
                </p>

                <p className="final-line">
                  Today is your day.
                  <br />
                  <span>Enjoy every second of it. ❤️</span>
                </p>
              </div>

              <button
                className="stage-next-button"
                onClick={() => setStage("photos")}
              >
                NEXT
                <span>→</span>
              </button>
            </section>
          )}

          
{stage === "photos" && (
  <section
    key="photos"
    className="photos-section screen-stage"
  >
    <div className="photos-background-glow" />

    <div className="photos-heading">
      <div className="section-label">
        <span className="simple-icon">✦</span>
        SPECIAL MEMORIES
      </div>

      <h2>Some moments worth remembering.</h2>

      <p>
        A few beautiful memories, saved here forever.
      </p>
    </div>

    <div className="photo-gallery">
      <div className="gallery-photo gallery-photo-left">
        <img
          src="/images/person/Snapchat-561450031.jpg"
          alt="Birthday memory"
        />
        <span>MEMORY</span>
      </div>

      <div className="gallery-photo gallery-photo-main">
        <img
          src="/images/person/1731482465301.jpg"
          alt="Birthday memory"
        />
        <div className="gallery-main-glow" />
        <span>YOU</span>
      </div>

      <div className="gallery-photo gallery-photo-right">
        <img
          src="/images/person/IMG_20230915_222341_012.webp"
          alt="Birthday memory"
        />
        <span>MEMORY</span>
      </div>
    </div>

    <button
      className="stage-next-button"
      onClick={() => setStage("gift")}
    >
      NEXT
      <span>→</span>
    </button>
  </section>
)}

{stage === "gift" && (
            <section
              key="gift"
              className="gift-section screen-stage"
            >
              <div
                className="section-heading"
              >
                <p className="small-caps">THE NEXT SURPRISE</p>
                <h2>Something is waiting for you.</h2>
                <p>Go on. You know you want to.</p>
              </div>

              <button
                className={`gift-box ${giftOpen ? "opened" : ""}`}
                onClick={openGift}
                aria-label="Open your gift"
              >
                <div className="gift-glow" />
                <div className="gift-lid">
                  <span className="ribbon horizontal" />
                </div>
                <div className="gift-body">
                  <span className="ribbon vertical" />
                  <span className="gift-emoji">🎁</span>
                </div>

                {!giftOpen && (
                  <span className="gift-label">
                    CLICK TO OPEN
                  </span>
                )}

                {giftOpen && (
                  <span className="gift-open-label">
                    SURPRISE ✨
                  </span>
                )}
              </button>

              <div className="stage-animation">
                {giftOpen && (
                  <div
                    className="gift-message"
                  >
                    <span className="simple-icon">✦</span>
                    <h3>One more little reminder...</h3>
                    <p>
                      You deserve every beautiful thing coming your way.
                    </p>
                    <p>
                      Thank you for being such a good friend, a supportive
                      sister, and a wonderful classmate.
                    </p>
                    <p>
                      I&apos;m truly lucky to have you in my life.
                    </p>
                    <strong>Never stop being you.</strong>
                  </div>
                )}
              </div>

              {giftOpen && (
                <button
                  className="stage-next-button gift-next"
                  onClick={() => setStage("wish")}
                >
                  NEXT
                  <span>→</span>
                </button>
              )}
            </section>
          )}

          {stage === "wish" && (
            <section
              key="wish"
              className="wish-section screen-stage"
            >
              <div className="stars-bg">
                {Array.from({ length: 25 }, (_, i) => (
                  <span
                    key={i}
                    style={{
                      left: `${(i * 29) % 100}%`,
                      top: `${(i * 47) % 100}%`,
                      animationDelay: `${(i % 6) * 0.4}s`,
                    }}
                  />
                ))}
              </div>

              <div
                className="wish-content"
              >
                <p className="small-caps">ONE LAST THING</p>

                <h2>Make a wish.</h2>

                <p className="wish-subtitle">
                  Close your eyes.
                  <br />
                  Think of something you truly want.
                </p>

                <div className={`cake ${wished ? "wished" : ""}`}>
                  <div className="flames">
                    {[0, 1, 2].map((i) => (
                      <span key={i} className="flame" />
                    ))}
                  </div>

                  <div className="candles">
                    <i />
                    <i />
                    <i />
                  </div>

                  <div className="cake-top" />
                  <div className="cake-middle" />
                  <div className="cake-bottom" />
                  <div className="plate" />
                </div>

                {!wished ? (
                  <button className="wish-button" onClick={makeWish}>
                    MAKE A WISH
                    <span className="simple-icon">✦</span>
                  </button>
                ) : (
                  <div
                    className="wish-success"
                  >
                    <span className="simple-icon">✦</span>
                    <strong>Wish sent to the universe. ✨</strong>
                    <span>Now go make it happen.</span>
                  </div>
                )}
              </div>

              {wished && (
                <button
                  className="stage-next-button"
                  onClick={() => setStage("final")}
                >
                  CONTINUE
                  <span>→</span>
                </button>
              )}
            </section>
          )}

          {stage === "final" && (
            <section
              key="final"
              className="final-section screen-stage"
            >
              <div
                className="final-card"
              >
                <div className="final-icon">
                  <span className="heart-icon">♥</span>
                </div>

                <p className="small-caps">ONE LAST THING...</p>

                <h2>
                  Wherever life takes you,
                  <br />
                  <span>I hope you always find</span>
                  <br />
                  a reason to smile.
                </h2>

                <div className="final-divider" />

                <p className="keep">
                  Keep shining.
                  <br />
                  Keep being you.
                </p>

                <h3>
                  Happy Birthday,
                  <br />
                  <span>{PERSON}.</span> 
                </h3>

                <p className="signature">
                  — From someone who wanted to make your day
                  <br />
                  a little more special.
                </p>

                <button className="replay-button" onClick={replay}>
                  <span className="replay-icon">↻</span>
                  REPLAY THE MAGIC
                </button>
              </div>
            </section>
          )}
        </div>
      )}
    </main>
  );
}

export default App;
