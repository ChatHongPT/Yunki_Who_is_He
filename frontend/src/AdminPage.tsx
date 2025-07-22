import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const NICKNAMES_KEY = "nicknames";

const AdminPage: React.FC = () => {
  const [nick, setNick] = useState("");
  const [list, setList] = useState<string[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    // 로그인 체크
    if (localStorage.getItem("isAdmin") !== "true") {
      navigate("/admin/login");
    }
    // 별명 목록 불러오기
    const saved = localStorage.getItem(NICKNAMES_KEY);
    if (saved) setList(JSON.parse(saved));
  }, [navigate]);

  const addNick = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nick.trim()) return;
    if (list.includes(nick.trim())) return;
    const newList = [...list, nick.trim()];
    setList(newList);
    localStorage.setItem(NICKNAMES_KEY, JSON.stringify(newList));
    setNick("");
  };

  const removeNick = (target: string) => {
    const newList = list.filter(n => n !== target);
    setList(newList);
    localStorage.setItem(NICKNAMES_KEY, JSON.stringify(newList));
  };

  const logout = () => {
    localStorage.removeItem("isAdmin");
    navigate("/");
  };

  return (
    <div style={{ maxWidth: 400, margin: "60px auto", padding: 24, border: "1px solid #ddd", borderRadius: 8 }}>
      <h2>별명 관리</h2>
      <form onSubmit={addNick} style={{ display: "flex", gap: 8, marginBottom: 16 }}>
        <input
          type="text"
          value={nick}
          onChange={e => setNick(e.target.value)}
          placeholder="별명 입력"
          style={{ flex: 1, padding: 8 }}
        />
        <button type="submit" style={{ padding: "8px 16px" }}>추가</button>
      </form>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {list.length === 0 && <li style={{ color: "#888" }}>아직 별명이 없습니다.</li>}
        {list.map(n => (
          <li key={n} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "4px 0" }}>
            <span>{n}</span>
            <button onClick={() => removeNick(n)} style={{ color: "red", border: 0, background: "none", cursor: "pointer" }}>삭제</button>
          </li>
        ))}
      </ul>
      <button onClick={logout} style={{ marginTop: 24, width: "100%", padding: 10, background: "#eee", border: 0, borderRadius: 4 }}>로그아웃</button>
    </div>
  );
};

export default AdminPage; 