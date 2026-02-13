import React, { useState, useEffect } from "react";
import test from "./assets/test.jpeg";

function App() {
  const [step, setStep] = useState(1);
  const [noStyle, setNoStyle] = useState({});
  const [hoverCount, setHoverCount] = useState(0);
  const [toasts, setToasts] = useState([]);
  const [hearts, setHearts] = useState([]);

  const messages = [
    'Wait… are you about to press "No" ?',
    "Are you sure?",
    "Like… double sure?",
    "That’s cute… but incorrect. Try again.",
  ];

  /* 💕 Floating Hearts */
  useEffect(() => {
    const interval = setInterval(() => {
      const id = Date.now();

      setHearts((prev) => [
        ...prev,
        {
          id,
          left: Math.random() * 100,
          size: 30 + Math.random() * 40,
          duration: 6 + Math.random() * 4,
        },
      ]);

      setTimeout(() => {
        setHearts((prev) => prev.filter((h) => h.id !== id));
      }, 10000);
    }, 400);

    return () => clearInterval(interval);
  }, []);

  /* 😈 NO BUTTON ESCAPE */
  const moveNoButton = (e) => {
    const id = Date.now();

    setToasts((prev) => [...prev, { id, message: messages[hoverCount] }]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 5000);

    if (hoverCount === 3) {
      setNoStyle({});
      setHoverCount(0);
      return;
    }

    const rect = e.target.getBoundingClientRect();
    const mouseX = e.clientX;
    const mouseY = e.clientY;

    const btnCenterX = rect.left + rect.width / 2;
    const btnCenterY = rect.top + rect.height / 2;

    const dx = btnCenterX - mouseX;
    const dy = btnCenterY - mouseY;

    const angle = Math.atan2(dy, dx);
    const distance = 420;

    const moveX = Math.cos(angle) * distance;
    const moveY = Math.sin(angle) * distance;

    setNoStyle({
      transform: `translate(${moveX}px, ${moveY}px)`,
      transition: "transform 0.25s ease-out",
    });

    setHoverCount((prev) => prev + 1);
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap');

        * {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
          font-family: 'Poppins', sans-serif;
        }

        body {
          overflow: hidden;
        }

        .app {
          height: 100vh;
          background: linear-gradient(135deg, #ff9a9e, #fad0c4);
          display: flex;
          justify-content: center;
          align-items: center;
          position: relative;
          overflow: hidden;
        }

        /* Floating Hearts */
        .heart {
          position: absolute;
          bottom: -40px;
          animation-name: floatUp;
          animation-timing-function: linear;
          display: flex;
          align-items: center;
          justify-content: center;
        }
          .heart-shape {
      color: rgba(255, 60, 120, 0.6);
        position: absolute;
}

        .heart-text {
          color: white;
          font-weight: 400;
          text-align: center;
          user-select: none;
          text-shadow: 0 2px 6px rgba(0,0,0,0.3);
        }

        @keyframes floatUp {
          0% { transform: translateY(0); opacity: 1; }
          100% { transform: translateY(-110vh); opacity: 0; }
        }

        .overlay {
          position: fixed;
          inset: 0;
          background: rgba(255, 0, 100, 0.15);
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .popup {
          background: white;
          width: 700px;
          padding: 60px;
          border-radius: 30px;
          text-align: center;
          box-shadow: 0 25px 60px rgba(0,0,0,0.25);
          z-index: 2;
        }

        .popup h2 {
          font-size: 30px;
          color: #e91e63;
          margin-bottom: 40px;
        }

        .buttons {
          display: flex;
          justify-content: space-between;
          position: relative;
        }

        button {
          width: 45%;
          padding: 18px;
          font-size: 20px;
          border: none;
          border-radius: 20px;
          cursor: pointer;
          font-weight: 600;
        }

        .yes {
          background: linear-gradient(135deg, #ff4b7d, #ff6a88);
          color: white;
        }

        .no {
          background: #9e9e9e;
          color: white;
        }

        .toast-container {
          position: fixed;
          top: 25px;
          right: 25px;
          display: flex;
          flex-direction: column;
          gap: 14px;
          z-index: 999;
        }

        .toast {
          background: white;
          padding: 18px 26px;
          border-radius: 12px;
          box-shadow: 0 12px 35px rgba(0,0,0,0.25);
          border-left: 6px solid #ff4b7d;
          font-weight: 600;
          color: #e91e63;
          width: 380px;
        }
          .fade-in-img {
  width: 300px;
  margin-top: 10px;
  border-radius: 20px;
  opacity: 0;
  animation: fadeInSmooth 1.4s ease forwards;
}
  @keyframes fadeInSmooth {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
      `}</style>

      <div className="app">
        {/* 💕 Floating Hearts with MS */}
        {hearts.map((heart) => (
          <div
            key={heart.id}
            className="heart"
            style={{
              left: `${heart.left}%`,
              fontSize: `${heart.size}px`,
              animationDuration: `${heart.duration}s`,
            }}
          >
            <span className="heart-shape">♥</span>

            <div
              className="heart-text"
              style={{
                position: "absolute",
                fontSize: `${heart.size * 0.2}px`,
              }}
            >
              MS
            </div>
          </div>
        ))}

        {/* Toasts */}
        <div className="toast-container">
          {toasts.map((toast) => (
            <div key={toast.id} className="toast">
              {toast.message}
            </div>
          ))}
        </div>

        {step === 1 && (
          <div className="overlay">
            <div className="popup">
              <h2>
                You’ve been my Valentine all these years—can we make it forever?
              </h2>

              <div className="buttons">
                <button className="yes" onClick={() => setStep(2)}>
                  Yes 💕
                </button>

                <button
                  className="no"
                  style={noStyle}
                  onMouseEnter={moveNoButton}
                >
                  No 💔
                </button>
              </div>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="overlay">
            <div className="popup">
              <h2>That’s a smart choice 😘</h2>
              <img
                className="gif"
                src="https://media.giphy.com/media/MDJ9IbxxvDUQM/giphy.gif"
                alt="Love"
              />
              <div className="buttons" style={{ justifyContent: "center" }}>
                <button className="yes" onClick={() => setStep(3)}>
                  OK 💘
                </button>
              </div>
            </div>
          </div>
        )}
        {step === 3 && (
          <div className="overlay">
            <div className="popup">
              <h2 className="fade-in">Forever starts now 💍✨</h2>
              <img className="fade-in-img" src={test} alt="Forever Love" />
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default App;
