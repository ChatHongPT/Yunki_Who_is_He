import React, { useEffect, useState } from "react";

const NICKNAMES_KEY = "nicknames";
const ROULETTE_RESULT_KEY = "roulette_result";

function getTodayStr() {
  const now = new Date();
  return `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}`;
}

const UserRoulette = () => {
  const [nicknames, setNicknames] = useState<string[]>([]);
  const [result, setResult] = useState<string | null>(null);
  const [spinning, setSpinning] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    // localStorage에서 별명 목록 불러오기
    const saved = localStorage.getItem(NICKNAMES_KEY);
    if (saved) setNicknames(JSON.parse(saved));
    // 오늘 결과 불러오기
    const savedResult = localStorage.getItem(ROULETTE_RESULT_KEY);
    if (savedResult) {
      const { date, value } = JSON.parse(savedResult);
      if (date === getTodayStr()) {
        setResult(value);
      }
    }
  }, []);

  const spinRoulette = () => {
    if (result) return;
    if (nicknames.length === 0) {
      setError("등록된 별명이 없습니다. 관리자에게 문의하세요.");
      return;
    }
    setSpinning(true);
    setError("");
    setTimeout(() => {
      const idx = Math.floor(Math.random() * nicknames.length);
      const value = nicknames[idx];
      setResult(value);
      // localStorage.setItem(ROULETTE_RESULT_KEY, JSON.stringify({ date: getTodayStr(), value }));
      setSpinning(false);
    }, 2000);
  };

  const reset = () => {
    // localStorage.removeItem(ROULETTE_RESULT_KEY);
    setResult(null);
    setError("");
  };

  const goToAdminLogin = () => {
    window.location.href = "/admin";
  };

  return (
    <div className="roulette-container">
      {/* 떠다니는 장식 요소들 */}
      <div className="floating-decorations">
        <div className="decoration decoration-1">🎪</div>
        <div className="decoration decoration-2">🎭</div>
        <div className="decoration decoration-3">🎨</div>
        <div className="decoration decoration-4">🎪</div>
        <div className="decoration decoration-5">✨</div>
        <div className="decoration decoration-6">🌟</div>
      </div>

      {/* 오륜기 이미지 */}
      <div className={`olympic-image-container ${spinning ? 'spinning-mode' : ''}`}>
        <div className="sparkle-overlay">
          <div className="sparkle sparkle-1">✨</div>
          <div className="sparkle sparkle-2">⭐</div>
          <div className="sparkle sparkle-3">💫</div>
          <div className="sparkle sparkle-4">🌟</div>
        </div>
        
        <img
          src="/오륜기.png"
          alt="오륜기"
          className={`olympic-image ${spinning ? 'spinning' : ''}`}
          onClick={goToAdminLogin}
          title="관리자 로그인으로 이동"
        />
        
        {/* 무지개 효과 */}
        <div className="rainbow-overlay"></div>
      </div>
      
      <h1 className="main-title">
        <span className="title-char">윤</span>
        <span className="title-char">기</span>
        <span className="title-char">의</span>
        <span className="title-space"> </span>
        <span className="title-char">오</span>
        <span className="title-char">늘</span>
        <span className="title-char">의</span>
        <span className="title-space"> </span>
        <span className="title-char">별</span>
        <span className="title-char">명</span>
        <span className="title-char">은</span>
        <span className="title-char">?</span>
        <span className="title-char">!</span>
      </h1>
      
      <div className="subtitle">
        <span role="img" aria-label="clown" className="bouncing-emoji">🤡</span> 
        <span className="highlight-text">
          룰렛을 돌리고<br/>
          오늘 하루<br/>
          윤기의 이름을 지어주세요!
        </span> 
        <span role="img" aria-label="clown" className="bouncing-emoji">🤡</span>
      </div>
      
      {result ? (
        <div className="result-section">
          <div className="confetti">
            <div className="confetti-piece">🎉</div>
            <div className="confetti-piece">🎊</div>
            <div className="confetti-piece">✨</div>
            <div className="confetti-piece">🌟</div>
            <div className="confetti-piece">💫</div>
          </div>
          
          <div className="result-text">
            🎉 <strong>{result}</strong> 🎉
          </div>
          <div className="result-message">
            오늘은 이미 룰렛을 돌렸어요!<br/>내일 또 도전~
          </div>
          <button onClick={reset} className="reset-btn">
            초기화(테스트용)
          </button>
        </div>
      ) : (
        <div className="spin-section">
          <button
            onClick={spinRoulette}
            disabled={spinning}
            className={`spin-btn ${spinning ? 'spinning' : ''}`}
          >
            <span className="btn-text">
              {spinning ? "돌리는 중... 🤪" : "룰렛 돌리기!"}
            </span>
            <div className="btn-sparkles">
              <div className="btn-sparkle">✨</div>
              <div className="btn-sparkle">⭐</div>
              <div className="btn-sparkle">💫</div>
            </div>
          </button>
          {error && <div className="error-text">{error}</div>}
        </div>
      )}
      
      <div className="footer-info">
        ※ 하루에 한 번만 돌릴 수 있습니다.<br />
        ※ 별명은 관리자만 추가/삭제할 수 있습니다.<br />
        <div className="emoji-line">
          <span className="dancing-emoji">😂</span>
          <span className="dancing-emoji">🤣</span>
          <span className="dancing-emoji">😆</span>
          <span className="dancing-emoji">😜</span>
          <span className="dancing-emoji">😝</span>
        </div>
      </div>
      
      {/* 관리자 로그인 버튼 제거 */}
      <style>{`
        .roulette-container {
          max-width: 480px;
          margin: 60px auto;
          padding: 24px;
          border: 4px dashed #1e90ff;
          border-radius: 24px;
          text-align: center;
          background: linear-gradient(135deg, #f0f8ff 0%, #e6f3ff 50%, #f0f8ff 100%);
          position: relative;
          overflow: hidden;
          box-shadow: 0 10px 30px rgba(30, 144, 255, 0.2);
        }
        
        .roulette-container::before {
          content: '';
          position: absolute;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          background: conic-gradient(from 0deg, transparent, rgba(30,144,255,0.1), transparent);
          animation: backgroundSpin 20s linear infinite;
          pointer-events: none;
        }
        
        .floating-decorations {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
        }
        
        .decoration {
          position: absolute;
          font-size: 20px;
          opacity: 0.3;
          animation: float 6s ease-in-out infinite;
        }
        
        .decoration-1 { top: 10%; left: 10%; animation-delay: 0s; }
        .decoration-2 { top: 20%; right: 10%; animation-delay: 1s; }
        .decoration-3 { bottom: 30%; left: 5%; animation-delay: 2s; }
        .decoration-4 { bottom: 20%; right: 15%; animation-delay: 3s; }
        .decoration-5 { top: 50%; left: 2%; animation-delay: 4s; }
        .decoration-6 { top: 40%; right: 5%; animation-delay: 5s; }
        
        .olympic-image-container {
          position: relative;
          display: inline-block;
          margin-bottom: 16px;
        }
        
        .olympic-image {
          width: 220px;
          margin-bottom: 16px;
          cursor: pointer;
          transition: all 0.3s ease;
          filter: hue-rotate(60deg) contrast(1.2) drop-shadow(0 0 20px #1e90ff) brightness(1.1);
          position: relative;
          z-index: 2;
        }
        
        .olympic-image:hover {
          transform: scale(1.1) rotate(5deg);
          filter: hue-rotate(120deg) contrast(1.4) drop-shadow(0 0 30px #ff1493) brightness(1.3);
        }
        
        .olympic-image.spinning {
          animation: olympicSpin 2s linear infinite, rainbow 2s ease-in-out infinite;
          transform: scale(1.2);
        }
        
        .sparkle-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          z-index: 3;
        }
        
        .sparkle {
          position: absolute;
          font-size: 16px;
          animation: sparkleFloat 2s ease-in-out infinite;
        }
        
        .sparkle-1 { top: 10%; left: 20%; animation-delay: 0s; }
        .sparkle-2 { top: 20%; right: 15%; animation-delay: 0.5s; }
        .sparkle-3 { bottom: 25%; left: 10%; animation-delay: 1s; }
        .sparkle-4 { bottom: 15%; right: 20%; animation-delay: 1.5s; }
        
        .rainbow-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: conic-gradient(from 0deg, 
            rgba(255,0,0,0.1), 
            rgba(255,165,0,0.1), 
            rgba(255,255,0,0.1), 
            rgba(0,128,0,0.1), 
            rgba(0,0,255,0.1), 
            rgba(75,0,130,0.1), 
            rgba(238,130,238,0.1)
          );
          opacity: 0;
          border-radius: 50%;
          animation: rainbowPulse 3s ease-in-out infinite;
        }
        
        .spinning-mode .rainbow-overlay {
          opacity: 0.6;
        }
        
        .main-title {
          font-size: 32px;
          margin: 16px 0 8px 0;
          color: #1e90ff;
          font-weight: 900;
          letter-spacing: 2px;
          text-shadow: 2px 2px 0 #fff, 4px 4px 0 rgba(30, 144, 255, 0.3);
          display: flex;
          justify-content: center;
          align-items: center;
          flex-wrap: wrap;
        }
        
        .title-char {
          display: inline-block;
          animation: titleWave 2s ease-in-out infinite;
        }
        
        .title-char:nth-child(1) { animation-delay: 0.1s; }
        .title-char:nth-child(2) { animation-delay: 0.2s; }
        .title-char:nth-child(3) { animation-delay: 0.3s; }
        .title-char:nth-child(5) { animation-delay: 0.4s; }
        .title-char:nth-child(6) { animation-delay: 0.5s; }
        .title-char:nth-child(7) { animation-delay: 0.6s; }
        .title-char:nth-child(8) { animation-delay: 0.7s; }
        .title-char:nth-child(9) { animation-delay: 0.8s; }
        
        .subtitle {
          font-size: 18px;
          color: #555;
          margin-bottom: 24px;
          font-weight: 700;
        }
        
        .bouncing-emoji {
          display: inline-block;
          font-size: 24px;
          animation: bounce 1.5s ease-in-out infinite;
        }
        
        .highlight-text {
          color: #ff1493;
          animation: colorShift 3s ease-in-out infinite;
          display: inline-block;
          margin: 0 10px;
        }
        
        .result-section {
          animation: slideInUp 0.8s ease-out;
          position: relative;
        }
        
        .confetti {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
        }
        
        .confetti-piece {
          position: absolute;
          font-size: 20px;
          animation: confettiFall 3s ease-out infinite;
        }
        
        .confetti-piece:nth-child(1) { left: 10%; animation-delay: 0s; }
        .confetti-piece:nth-child(2) { left: 30%; animation-delay: 0.5s; }
        .confetti-piece:nth-child(3) { left: 50%; animation-delay: 1s; }
        .confetti-piece:nth-child(4) { left: 70%; animation-delay: 1.5s; }
        .confetti-piece:nth-child(5) { left: 90%; animation-delay: 2s; }
        
        .result-text {
          font-size: 32px;
          margin: 32px 0;
          color: #ff8c00;
          font-weight: 900;
          text-shadow: 2px 2px 0 #fff, 4px 4px 0 rgba(255, 140, 0, 0.3);
          animation: resultPulse 1s ease-in-out infinite alternate;
        }
        
        .result-message {
          color: #888;
          margin-bottom: 16px;
        }
        
        .reset-btn {
          padding: 8px 16px;
          background: linear-gradient(45deg, #eee, #f9f9f9);
          border: 2px solid #ddd;
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.3s ease;
          font-weight: bold;
        }
        
        .reset-btn:hover {
          background: linear-gradient(45deg, #ddd, #eee);
          transform: translateY(-3px) scale(1.05);
          box-shadow: 0 5px 15px rgba(0,0,0,0.2);
        }
        
        .spin-section {
          margin: 32px 0;
          position: relative;
        }
        
        .spin-btn {
          padding: 16px 32px;
          font-size: 24px;
          background: linear-gradient(45deg, #ff1493, #ff69b4, #ff1493);
          background-size: 200% 200%;
          color: #fff;
          border: 0;
          border-radius: 20px;
          font-weight: 900;
          box-shadow: 0 8px 25px rgba(30, 144, 255, 0.3);
          cursor: pointer;
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
          animation: buttonGlow 2s ease-in-out infinite alternate;
        }
        
        .spin-btn:hover {
          transform: translateY(-5px) scale(1.05);
          box-shadow: 0 15px 35px rgba(255, 20, 147, 0.4);
        }
        
        .spin-btn.spinning {
          animation: buttonSpin 0.5s linear infinite, rainbowButton 2s ease-in-out infinite;
          transform: scale(1.1);
        }
        
        .btn-text {
          position: relative;
          z-index: 2;
        }
        
        .btn-sparkles {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
        }
        
        .btn-sparkle {
          position: absolute;
          font-size: 12px;
          animation: btnSparkleFloat 1.5s ease-in-out infinite;
        }
        
        .btn-sparkle:nth-child(1) { top: 20%; left: 20%; animation-delay: 0s; }
        .btn-sparkle:nth-child(2) { top: 30%; right: 15%; animation-delay: 0.5s; }
        .btn-sparkle:nth-child(3) { bottom: 25%; left: 15%; animation-delay: 1s; }
        
        .error-text {
          color: #ff4444;
          margin-top: 16px;
          animation: shake 0.5s ease-in-out, errorGlow 1s ease-in-out infinite alternate;
          font-weight: bold;
        }
        
        .footer-info {
          margin-top: 32px;
          color: #aaa;
          font-size: 13px;
          line-height: 1.6;
        }
        
        .emoji-line {
          font-size: 18px;
          margin-top: 8px;
          display: flex;
          justify-content: center;
          gap: 5px;
        }
        
        .dancing-emoji {
          display: inline-block;
          animation: emojiDance 2s ease-in-out infinite;
        }
        
        .dancing-emoji:nth-child(1) { animation-delay: 0s; }
        .dancing-emoji:nth-child(2) { animation-delay: 0.2s; }
        .dancing-emoji:nth-child(3) { animation-delay: 0.4s; }
        .dancing-emoji:nth-child(4) { animation-delay: 0.6s; }
        .dancing-emoji:nth-child(5) { animation-delay: 0.8s; }
        
        .admin-btn {
          margin-top: 24px;
          padding: 12px 28px;
          background: linear-gradient(45deg, #2c2c2c, #444, #2c2c2c);
          background-size: 200% 200%;
          color: #fff;
          border: 2px solid #555;
          border-radius: 12px;
          font-weight: 700;
          font-size: 16px;
          cursor: pointer;
          box-shadow: 0 4px 15px rgba(0,0,0,0.3);
          transition: all 0.3s ease;
          animation: adminGlow 3s ease-in-out infinite alternate;
        }
        
        .admin-btn:hover {
          transform: translateY(-3px) scale(1.05);
          box-shadow: 0 8px 25px rgba(30, 144, 255, 0.4);
          background-position: 100% 0%;
        }
        
        /* 애니메이션 정의 */
        @keyframes backgroundSpin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(10deg); }
        }
        
        @keyframes olympicSpin {
          0% { transform: rotate(0deg) scale(1.2); }
          100% { transform: rotate(360deg) scale(1.2); }
        }
        
        @keyframes rainbow {
          0% { filter: hue-rotate(0deg) contrast(1.4) drop-shadow(0 0 30px #ff1493); }
          25% { filter: hue-rotate(90deg) contrast(1.4) drop-shadow(0 0 30px #00ff00); }
          50% { filter: hue-rotate(180deg) contrast(1.4) drop-shadow(0 0 30px #00ffff); }
          75% { filter: hue-rotate(270deg) contrast(1.4) drop-shadow(0 0 30px #ffff00); }
          100% { filter: hue-rotate(360deg) contrast(1.4) drop-shadow(0 0 30px #ff1493); }
        }
        
        @keyframes sparkleFloat {
          0%, 100% { transform: translateY(0px) scale(1); opacity: 0.6; }
          50% { transform: translateY(-15px) scale(1.3); opacity: 1; }
        }
        
        @keyframes rainbowPulse {
          0%, 100% { transform: scale(0.8); opacity: 0; }
          50% { transform: scale(1.2); opacity: 0.6; }
        }
        
        @keyframes titleWave {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-10px) rotate(5deg); }
        }
        
        @keyframes bounce {
          0%, 100% { transform: translateY(0px) scale(1); }
          50% { transform: translateY(-10px) scale(1.2); }
        }
        
        @keyframes colorShift {
          0% { color: #ff1493; transform: scale(1); }
          33% { color: #ff6347; transform: scale(1.05); }
          66% { color: #ffd700; transform: scale(1.02); }
          100% { color: #ff1493; transform: scale(1); }
        }
        
        @keyframes slideInUp {
          0% { transform: translateY(50px); opacity: 0; }
          100% { transform: translateY(0); opacity: 1; }
        }
        
        @keyframes confettiFall {
          0% { transform: translateY(-100px) rotate(0deg); opacity: 1; }
          100% { transform: translateY(200px) rotate(360deg); opacity: 0; }
        }
        
        @keyframes resultPulse {
          0% { transform: scale(1) rotate(-2deg); }
          100% { transform: scale(1.1) rotate(2deg); }
        }
        
        @keyframes buttonGlow {
          0% { box-shadow: 0 8px 25px rgba(30, 144, 255, 0.3); }
          100% { box-shadow: 0 8px 25px rgba(255, 20, 147, 0.5); }
        }
        
        @keyframes buttonSpin {
          0% { transform: rotate(-5deg) scale(1.1); }
          50% { transform: rotate(5deg) scale(1.1); }
          100% { transform: rotate(-5deg) scale(1.1); }
        }
        
        @keyframes rainbowButton {
          0% { background-position: 0% 50%; }
          100% { background-position: 200% 50%; }
        }
        
        @keyframes btnSparkleFloat {
          0%, 100% { transform: translateY(0px) scale(0.8); opacity: 0.5; }
          50% { transform: translateY(-8px) scale(1.2); opacity: 1; }
        }
        
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-5px); }
          75% { transform: translateX(5px); }
        }
        
        @keyframes errorGlow {
          0% { text-shadow: 0 0 5px #ff4444; }
          100% { text-shadow: 0 0 20px #ff4444, 0 0 30px #ff4444; }
        }
        
        @keyframes emojiDance {
          0%, 100% { transform: translateY(0) rotate(0deg) scale(1); }
          25% { transform: translateY(-5px) rotate(10deg) scale(1.1); }
          50% { transform: translateY(0) rotate(0deg) scale(1.2); }
          75% { transform: translateY(-3px) rotate(-10deg) scale(1.1); }
        }
        
        @keyframes adminGlow {
          0% { box-shadow: 0 4px 15px rgba(0,0,0,0.3); }
          100% { box-shadow: 0 4px 15px rgba(30, 144, 255, 0.4); }
        }
      `}</style>
    </div>
  );
};

export default UserRoulette;