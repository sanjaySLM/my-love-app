import React, { useState, useEffect } from "react";

function App() {
  const [step, setStep] = useState(1);
  const [noStyle, setNoStyle] = useState({});
  const [hearts, setHearts] = useState([]);

  const moveNoButton = () => {
    const x = Math.random() * 600 - 300;
    const y = Math.random() * 360 - 180;

    setNoStyle({
      transform: `translate(${x}px, ${y}px)`,
      transition: "transform 0.1s ease-out",
    });
  };

  /* 💕 Floating hearts */
  useEffect(() => {
    const interval = setInterval(() => {
      const id = Date.now();
      setHearts((h) => [
        ...h,
        {
          id,
          left: Math.random() * 100,
          size: 12 + Math.random() * 16,
          duration: 6 + Math.random() * 4,
        },
      ]);

      setTimeout(() => {
        setHearts((h) => h.filter((heart) => heart.id !== id));
      }, 10000);
    }, 500);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <style>{`
        /* 🌸 POPPINS FONT */
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');

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
        }

        /* 💕 HEARTS */
        .heart {
          position: absolute;
          bottom: -40px;
          color: rgba(255, 60, 120, 0.6);
          animation: floatUp linear forwards;
          pointer-events: none;
        }

        @keyframes floatUp {
          from {
            transform: translateY(0) scale(1);
            opacity: 1;
          }
          to {
            transform: translateY(-115vh) scale(1.7);
            opacity: 0;
          }
        }

        .overlay {
          position: fixed;
          inset: 0;
          background: rgba(255, 0, 100, 0.18);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 2;
        }

        /* 🔥 BIGGEST POPUP */
        .popup.big {
          background: white;
          width: 820px;
          min-height: 480px;
          padding: 70px;
          border-radius: 30px;
          text-align: center;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          box-shadow: 0 25px 60px rgba(0,0,0,0.25);
        }

        .popup {
          background: white;
          width: 640px;
          min-height: 440px;
          padding: 60px;
          border-radius: 30px;
          text-align: center;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          box-shadow: 0 25px 60px rgba(0,0,0,0.25);
        }

        .popup h2 {
          font-size: 44px;
          font-weight: 600;
          color: #e91e63;
        }

        .gif {
          width: 100%;
          max-height: 280px;
          object-fit: contain;
          margin: 20px 0;
        }

        .buttons {
          display: flex;
          justify-content: space-between;
          margin-top: 40px;
          position: relative;
        }

        .buttons.single {
          justify-content: center;
        }

        button {
          width: 45%;
          padding: 22px;
          font-size: 26px;
          font-weight: 600;
          border: none;
          border-radius: 20px;
          cursor: pointer;
        }

        /* ✅ YES */
        .yes {
          background: linear-gradient(135deg, #ff4b7d, #ff6a88);
          color: white;
          transition: all 0.25s ease;
        }

        .yes:hover {
          transform: scale(1.12);
          box-shadow: 0 0 35px rgba(255, 70, 120, 0.95);
          animation: pulse 1.1s infinite;
        }

        @keyframes pulse {
          0% { transform: scale(1.06); }
          50% { transform: scale(1.14); }
          100% { transform: scale(1.06); }
        }

        /* ❌ NO */
        .no {
          background: #9e9e9e;
          color: white;
          position: relative;
          user-select: none;
        }
      `}</style>

      <div className="app">
        {/* 💕 Floating hearts */}
        {hearts.map((h) => (
          <span
            key={h.id}
            className="heart"
            style={{
              left: `${h.left}%`,
              fontSize: `${h.size}px`,
              animationDuration: `${h.duration}s`,
            }}
          >
            ❤️
          </span>
        ))}

        {/* FIRST POPUP */}
        {step === 1 && (
          <div className="overlay">
            <div className="popup big">
              <h2>You’ve been my Valentine all these years—can we make it forever? 💖</h2>

              <div className="buttons">
                <button className="yes" onClick={() => setStep(2)}>
                  Yes 💕
                </button>

                <button
                  className="no"
                  style={noStyle}
                  onMouseEnter={moveNoButton}
                  onMouseMove={moveNoButton}
                  onMouseDown={moveNoButton}
                >
                  No 💔
                </button>
              </div>
            </div>
          </div>
        )}

        {/* SECOND POPUP */}
        {step === 2 && (
          <div className="overlay">
            <div className="popup">
              <h2>That’s a smart choice 😘</h2>

              <img
                className="gif"
                src="/gifs/urs.gif"
                alt="Smart choice"
              />

              <div className="buttons single">
                <button className="yes" onClick={() => setStep(0)}>
                  OK 💘
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default App;
