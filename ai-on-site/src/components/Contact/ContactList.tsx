import React, { useState, useEffect } from "react";
import { db, auth } from "../../firebase";
import { 
  collection, 
  query, 
  orderBy, 
  onSnapshot, 
  doc, 
  updateDoc // ✅ 업데이트를 위해 추가
} from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

const ContactList = () => {
  const [contacts, setContacts] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);

  // 1. 관리자 체크
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      // 본인의 관리자 이메일 주소와 일치하는지 확인
      if (user && user.email === "admin@jejuion.co.kr") {
        setIsAdmin(true);
      }
    });
    return () => unsubscribe();
  }, []);

  // 2. 문의 목록 실시간 가져오기
  useEffect(() => {
    if (!isAdmin) return;

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

  if (!isAdmin) return <p style={{ padding: '20px' }}>관리자만 접근 가능합니다.</p>;

  return (
    <div className="admin-contact-list" style={{ padding: '20px' }}>
      <h3>📩 도착한 문의 목록</h3>
      {contacts.length > 0 ? (
        contacts.map((c: any) => (
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
                  onClick={() => markAsDone(c.id)}
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