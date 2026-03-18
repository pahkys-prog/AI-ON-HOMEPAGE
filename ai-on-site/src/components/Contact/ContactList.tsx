import React, { useState, useEffect } from "react";
import { db, auth, googleProvider } from "../../firebase";
import {
  collection,
  query,
  orderBy,
  onSnapshot,
  doc,
  updateDoc,
} from "firebase/firestore";
import { signInWithPopup, onAuthStateChanged } from "firebase/auth";

const ContactList = () => {
  const [contacts, setContacts] = useState<any[]>([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [currentUserEmail, setCurrentUserEmail] = useState<string | null>(
    "확인 중...",
  );

  // 1. 구글 로그인 함수
  const handleGoogleLogin = async () => {
    try {
      console.log("로그인 시도...");
      await signInWithPopup(auth, googleProvider);
      alert("로그인 성공!");
    } catch (error: any) {
      console.error("로그인 에러:", error);
      alert("로그인에 실패했습니다. 팝업 차단 여부를 확인해주세요.");
    }
  };

  // 2. 로그인 상태 감시 및 관리자 체크
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUserEmail(user.email);
        // 🔴 아래 "본인이 로그인할 이메일"로 반드시 수정하세요!
        if (user.email === "운영자님의@이메일.com") {
          setIsAdmin(true);
        } else {
          setIsAdmin(false);
        }
      } else {
        setCurrentUserEmail("로그아웃 상태");
        setIsAdmin(false);
      }
    });
    return () => unsubscribe();
  }, []);

  // 3. 문의 데이터 실시간 수신
  useEffect(() => {
    if (!isAdmin) return;
    const q = query(collection(db, "contacts"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setContacts(data);
    });
    return () => unsubscribe();
  }, [isAdmin]);

  // 4. 확인 완료 처리
  const markAsDone = async (id: string) => {
    try {
      await updateDoc(doc(db, "contacts", id), { status: "done" });
      alert("완료 처리되었습니다.");
    } catch (error) {
      alert("변경 실패");
    }
  };

  // --- 화면 렌더링 ---
  if (!isAdmin) {
    return (
      <div style={{ padding: "50px", textAlign: "center" }}>
        <h2>관리자 로그인 🔒</h2>
        <p>현재 계정: {currentUserEmail}</p>
        <button
          onClick={handleGoogleLogin}
          style={{ padding: "10px 20px", cursor: "pointer" }}
        >
          구글 로그인
        </button>
      </div>
    );
  }

  return (
    <div style={{ padding: "20px" }}>
      <h3>📩 문의 목록</h3>
      {contacts.map((c) => (
        <div
          key={c.id}
          style={{
            border: "1px solid #ddd",
            padding: "15px",
            marginBottom: "10px",
          }}
        >
          <p>
            <strong>{c.name}</strong> ({c.phone})
          </p>
          <p>{c.message}</p>
          {c.status !== "done" ? (
            <button onClick={() => markAsDone(c.id)}>확인 완료</button>
          ) : (
            <span style={{ color: "green" }}>✓ 확인됨</span>
          )}
        </div>
      ))}
    </div>
  );
};

export default ContactList;
