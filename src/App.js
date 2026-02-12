import React, { useState, useEffect } from "react";

function App() {
  const [step, setStep] = useState(1);
  const [noStyle, setNoStyle] = useState({});
  const [hearts, setHearts] = useState([]);
  const [hoverCount, setHoverCount] = useState(0);
  const [toasts, setToasts] = useState([]);

  const messages = [
    'Wait… are you about to press "No" ?',
    "Are you sure?",
    "Like… double sure?",
    "That’s cute… but incorrect. Try again."
  ];

  const moveNoButton = () => {
    const id = Date.now();

    // Show toast
    setToasts((prev) => [...prev, { id, message: messages[hoverCount] }]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 5000);

    // If it's the 4th message → reset everything
    if (hoverCount === 3) {
      setNoStyle({}); // 🔥 Reset position
      setHoverCount(0); // 🔁 Restart sequence
      return;
    }

    // Otherwise move button
    const x = Math.random() * 600 - 300;
    const y = Math.random() * 360 - 180;

    setNoStyle({
      transform: `translate(${x}px, ${y}px)`,
      transition: "transform 0.2s ease-out",
    });

    setHoverCount((prev) => prev + 1);
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
          size: 20 + Math.random() * 20,
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
        }

        /* Popup */
        .overlay {
          position: fixed;
          inset: 0;
          background: rgba(255, 0, 100, 0.18);
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

        /* 🔔 Toast Stack Top Right */
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
          animation: slideIn 0.35s ease, fadeOut 0.5s ease 4.5s forwards;
        }

        @keyframes slideIn {
          from { transform: translateX(40px); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }

        @keyframes fadeOut {
          to { opacity: 0; transform: translateY(-10px); }
        }
      `}</style>

      <div className="app">

        {/* 🔔 Toasts */}
        <div className="toast-container">
          {toasts.map((toast) => (
            <div key={toast.id} className="toast">
              {toast.message}
            </div>
          ))}
        </div>

        {/* Main Popup */}
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

              <div className="buttons" style={{ justifyContent: "center" }}>
                <button className="yes" onClick={() => setStep(1)}>
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
