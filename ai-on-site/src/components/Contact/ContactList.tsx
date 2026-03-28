import { useState, useEffect } from "react";
import { db, auth, googleProvider } from "../../firebase";
import {
  collection,
  query,
  orderBy,
  onSnapshot,
  doc,
  updateDoc,
} from "firebase/firestore";
import { signInWithPopup, onAuthStateChanged } from "firebase/auth"; // ✅ import 정리
import type { DocumentData, Timestamp } from "firebase/firestore";
import { useAuthStore } from "../../store/useAuthStore";

interface Contact {
  id: string;
  email?: string;
  message?: string;
  name: string;
  phone: string;
  status: string;
  createdAt?: Timestamp;
}

const ContactList = () => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const { role } = useAuthStore(); // ✅ Zustand에서 권한 가져오기

  // 1. 현재 사용자 상태 관리
  const [currentUserEmail, setCurrentUserEmail] = useState<string | null>("로그인 안됨");
  
  // ✅ 로직 유지: 관리자 또는 매니저인지 확인하는 변수
  const isStaff = role === "admin" || role === "manager";

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      console.log("로그인 성공:", result.user.email);
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error("에러:", error.message);
        alert(`로그인 실패: ${error.message}`);
      }
    }
  };

  // 1. 로그인 상태 감시 (이메일 표시용 로직 유지)
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUserEmail(user.email);
      } else {
        setCurrentUserEmail("로그아웃 상태");
      }
    });
    return () => unsubscribe();
  }, []);

  // 2. 문의 목록 실시간 가져오기 (isStaff 기반으로 변경)
  useEffect(() => {
    if (!isStaff) return; // ✅ 권한이 없으면 실행 안 함

    const q = query(collection(db, "contacts"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data: Contact[] = snapshot.docs.map((doc) => {
        const d = doc.data() as DocumentData;
        return {
          id: doc.id,
          name: d.name ?? "",
          phone: d.phone ?? "",
          status: d.status ?? "new",
          message: d.message ?? "",
          email: d.email ?? "",
          createdAt: d.createdAt ?? null,
        };
      });
      setContacts(data);
    });
    return () => unsubscribe();
  }, [isStaff]); // ✅ 권한 상태가 바뀔 때 리렌더링

  // 3. 문의 확인 완료 처리 함수
  const markAsDone = async (id: string) => {
    try {
      const docRef = doc(db, "contacts", id);
      await updateDoc(docRef, {
        status: "done",
      });
      alert("문의 확인 처리가 완료되었습니다.");
    } catch (error) {
      console.error("업데이트 에러:", error);
      alert("상태 변경에 실패했습니다.");
    }
  };

  // ✅ 권한 체크 UI (isStaff 기반으로 변경)
  if (!isStaff) {
    return (
      <div style={{ padding: "100px 20px", textAlign: "center" }}>
        <h2>문의 접수 및 확인 🔒</h2>
        <p>
          현재 접속 계정:{" "}
          <strong style={{ color: "blue" }}>{currentUserEmail}</strong>
        </p>
        <p>이 페이지는 관리자 또는 매니저만 접근할 수 있습니다.</p>
        <div style={{ marginTop: "20px" }}>
           <p style={{ color: "#666" }}>일반 문의 접수는 '문의하기' 페이지를 이용해 주세요.</p>
           <button 
             onClick={handleGoogleLogin}
             style={{ padding: "10px 20px", cursor: "pointer", backgroundColor: "#4285F4", color: "white", border: "none", borderRadius: "4px" }}
           >
             관리자 계정으로 로그인
           </button>
        </div>
      </div>
    );
  }

  return (
    <div
      className="admin-contact-list"
      style={{ padding: "20px", maxWidth: "1200px", margin: "0 auto" }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
        <h2>📬 도착한 문의 목록</h2>
        <span style={{ fontSize: "0.9rem", color: "#666" }}>접속 권한: {role}</span>
      </div>
      
      {contacts.length > 0 ? (
        contacts.map((c: Contact) => (
          <div
            key={c.id}
            style={{
              maxWidth: "1000px",
              border: "1px solid #ddd",
              margin: "10px 0",
              padding: "20px",
              borderRadius: "8px",
              backgroundColor: c.status === "done" ? "#f9f9f9" : "#fff",
              opacity: c.status === "done" ? 0.7 : 1,
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
              }}
            >
              <div>
                <p>
                  <strong>보낸이:</strong> {c.name} ({c.phone})
                </p>
                <p style={{ backgroundColor: "#f8f9fa", padding: "10px", borderRadius: "4px", marginTop: "10px" }}>
                  <strong>내용:</strong> {c.message}
                </p>
                <p style={{ fontSize: "12px", color: "#888", marginTop: "10px" }}>
                  접수일:{" "}
                  {c.createdAt && "toDate" in c.createdAt
                    ? c.createdAt.toDate().toLocaleString()
                    : "시간 정보 없음"}
                </p>
              </div>

              {c.status !== "done" ? (
                <button
                  onClick={() => markAsDone(c.id)}
                  style={{
                    backgroundColor: "#5bb68c",
                    color: "white",
                    border: "none",
                    padding: "8px 12px",
                    borderRadius: "4px",
                    cursor: "pointer",
                  }}
                >
                  확인 완료하기
                </button>
              ) : (
                <span style={{ color: "#5bb68c", fontWeight: "bold" }}>
                  ✓ 확인됨
                </span>
              )}
            </div>
          </div>
        ))
      ) : (
        <p>도착한 문의가 없습니다.</p>
      )}
    </div>
  );
};

export default ContactList;