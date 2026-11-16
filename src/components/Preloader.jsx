
import { useEffect, useRef, useState } from "react";
import "./Preloader.css";

export default function Preloader() {
  const videoRef = useRef(null);
  const finishTimer = useRef(null);

  const [progress, setProgress] = useState(0);
  const [exiting, setExiting] = useState(false);

  // Clean up timer when component unmounts
  useEffect(() => {
    return () => {
      clearTimeout(finishTimer.current);
    };
  }, []);

  // Update progress according to actual video playback
  const handleProgress = () => {
    const video = videoRef.current;

    if (!video || !Number.isFinite(video.duration) || video.duration <= 0) {
      return;
    }

    const percentage =
      (video.currentTime / video.duration) * 100;

    setProgress(Math.min(percentage, 100));
  };

  // When video finishes, complete progress and reveal website
  const handleVideoEnd = () => {
    setProgress(100);
    setExiting(true);

    finishTimer.current = setTimeout(() => {
      window.dispatchEvent(
        new Event("nila-intro-finished")
      );
    }, 800);
  };

  return (
    <div
      className={`video-preloader ${
        exiting ? "intro-exiting" : ""
      }`}
    >

      {/* =================================
          ANIMATED BACKGROUND DECORATIONS
      ================================= */}

      <div className="paint-decoration paint-decoration-one">
        ✿
      </div>

      <div className="paint-decoration paint-decoration-two">
        ✦
      </div>

      <div className="paint-decoration paint-decoration-three">
        ✽
      </div>

      <div className="paint-decoration paint-decoration-four">
        ✿
      </div>

      {/* Moving paint strokes */}

      <div className="paint-stroke paint-stroke-one" />
      <div className="paint-stroke paint-stroke-two" />
      <div className="paint-stroke paint-stroke-three" />

      {/* =================================
          MAIN INTRO CONTENT
      ================================= */}

      <div className="intro-content">

        {/* BRAND LOGO AND WELCOME TEXT */}

        <div className="intro-brand">
          <img
            src="/nila-arts-logo.png"
            alt="Nila Arts"
          />

          <div>
            <h2>Welcome to Nila Arts</h2>

            <p>WHERE CREATIVITY BLOOMS</p>
          </div>
        </div>

        {/* =================================
            WELCOME VIDEO
        ================================= */}

        <div className="intro-video-frame">

          <video
            ref={videoRef}
            className="welcome-video"
            src="/nila-welcome.mp4"
            autoPlay
            muted
            playsInline
            preload="auto"
            onTimeUpdate={handleProgress}
            onEnded={handleVideoEnd}
          />

        </div>

        {/* =================================
            VIDEO PROGRESS BAR
        ================================= */}

        <div className="intro-progress-section">

          <div className="intro-progress-info">

            <span>
              {progress >= 100
                ? "Welcome to our creative world!"
                : "Preparing something beautiful..."}
            </span>

            <span>
              {Math.round(progress)}%
            </span>

          </div>

          {/* Progress track */}

          <div className="intro-progress-track">

            <div
              className="intro-progress-fill"
              style={{
                width: `${progress}%`,
              }}
            />

          </div>

          <p className="intro-footer-text">
            Every masterpiece begins with imagination
          </p>

        </div>

      </div>

    </div>
  );
}
