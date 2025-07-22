import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const ADMIN_ID = "dhfbsrl";
const ADMIN_PW = "dhfbsrl";

const AdminLogin: React.FC = () => {
  const [id, setId] = useState("");
  const [pw, setPw] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (id === ADMIN_ID && pw === ADMIN_PW) {
      localStorage.setItem("isAdmin", "true");
      navigate("/admin");
    } else {
      setError("아이디 또는 비밀번호가 올바르지 않습니다.");
    }
  };

  return (
    <div style={{ maxWidth: 320, margin: "80px auto", padding: 24, border: "1px solid #ddd", borderRadius: 8 }}>
      <h2>관리자 로그인</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: 12 }}>
          <input
            type="text"
            placeholder="아이디"
            value={id}
            onChange={e => setId(e.target.value)}
            style={{ width: "100%", padding: 8 }}
            autoFocus
          />
        </div>
        <div style={{ marginBottom: 12 }}>
          <input
            type="password"
            placeholder="비밀번호"
            value={pw}
            onChange={e => setPw(e.target.value)}
            style={{ width: "100%", padding: 8 }}
          />
        </div>
        {error && <div style={{ color: "red", marginBottom: 12 }}>{error}</div>}
        <button type="submit" style={{ width: "100%", padding: 10, background: "#222", color: "#fff", border: 0, borderRadius: 4 }}>로그인</button>
      </form>
    </div>
  );
};

export default AdminLogin; 