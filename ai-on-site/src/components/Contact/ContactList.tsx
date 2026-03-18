import React, { useState, useEffect } from "react";
import { db, auth, googleProvider } from "../../firebase";
import { 
  collection, 
  query, 
  orderBy, 
  onSnapshot, 
  doc, 
  updateDoc // ✅ 업데이트를 위해 추가
} from "firebase/firestore";
import { signInWithPopup } from "firebase/auth";


const ContactList = () => {
  interface Contact {
  id: string;
  email?: string;
  message?: string;
  name: string;    
  phone: string;   
  status: string;
  createdAt?: any;  
}
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [isAdmin, setIsAdmin] = useState(false);

const handleGoogleLogin = async () => {
  try {
    // 팝업창 띄우기 (이게 실행되면 구글 창이 떠야 합니다)
    const result = await signInWithPopup(auth, googleProvider);
    console.log("로그인 성공:", result.user.email);
    alert("로그인에 성공했습니다!");
    window.location.reload(); 
  } catch (error: any) {
    console.error("에러 상세:", error);
    // 에러 코드가 'auth/operation-not-allowed'라면 콘솔 설정 문제
    // 'auth/popup-blocked'라면 브라우저 팝업 차단 문제
    alert(`로그인 실패: ${error.code}`); 
  }
};

  // 1. 관리자 체크
  const [currentUserEmail, setCurrentUserEmail] = useState<string | null>("로그인 안됨");

useEffect(() => {
  const unsubscribe = onAuthStateChanged(auth, (user) => {
    if (user) {
      console.log("로그인 탐지됨:", user.email);
      setCurrentUserEmail(user.email); // 현재 로그인된 이메일을 상태에 저장

      //  아래 "본인이 등록한 메일"을 정확하게 입력하세요!
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

  // 2. 문의 목록 실시간 가져오기
  useEffect(() => {
    if (!isAdmin) return ;

    const q = query(collection(db, "contacts"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setContacts(data);
    });
    return () => unsubscribe();
  }, [isAdmin]);

  // ✅ 3. 문의 확인 완료 처리 함수 (꿀팁 로직)
  const markAsDone = async (id: string) => {
    try {
      const docRef = doc(db, "contacts", id);
      await updateDoc(docRef, {
        status: "done" // 상태를 완료로 변경
      });
      alert("문의 확인 처리가 완료되었습니다.");
    } catch (error) {
      console.error("업데이트 에러:", error);
      alert("상태 변경에 실패했습니다.");
    }
  };

  if (!isAdmin) {
  return (
    <div style={{ padding: '50px', textAlign: 'center' }}>
      <h2>출입 제한 구역 🔒</h2>
      <p>현재 접속 계정: <strong style={{ color: 'blue' }}>{currentUserEmail}</strong></p>
      <p>이 계정은 관리자 목록에 없습니다.</p>
      <button onClick={() => window.location.href='/login'}>다른 계정으로 로그인</button>
    </div>
  );
}

  return (
    <div className="admin-contact-list" style={{ padding: '20px' }}>
      <h3> 도착한 문의 목록</h3>
      {contacts.length > 0 ? (
        contacts.map((c: ContactItem) => (
          <div 
            key={c.id} 
            style={{ 
              border: '1px solid #ddd', 
              margin: '10px 0', 
              padding: '15px',
              borderRadius: '8px',
              backgroundColor: c.status === "done" ? "#f9f9f9" : "#fff", // 완료된 건 연하게 표시
              opacity: c.status === "done" ? 0.7 : 1
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <p><strong>보낸이:</strong> {c.name} ({c.phone})</p>
                <p><strong>내용:</strong> {c.message}</p>
                <p style={{ fontSize: '12px', color: '#888' }}>
                  접수일: {c.createdAt?.toDate().toLocaleString()}
                </p>
              </div>

              {/* ✅ 확인 버튼: 아직 완료되지 않은 경우에만 표시 */}
              {c.status !== "done" ? (
                <button 
                  onClick={handleGoogleLogin}
                  style={{
                    backgroundColor: '#5bb68c',
                    color: 'white',
                    border: 'none',
                    padding: '8px 12px',
                    borderRadius: '4px',
                    cursor: 'pointer'
                  }}
                >
                  확인 완료하기
                </button>
              ) : (
                <span style={{ color: '#5bb68c', fontWeight: 'bold' }}>✓ 확인됨</span>
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