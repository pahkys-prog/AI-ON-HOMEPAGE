/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useState, useContext, type ReactNode } from "react";

// 1. 내부용 모달 뼈대
const CommonModal = ({ 
  isOpen, 
  onClose, 
  title, 
  children 
}: { 
  isOpen: boolean; 
  onClose: () => void; 
  title?: string; 
  children: ReactNode 
}) => {
  if (!isOpen) return null;
  return (
    <div className="modal-overlay" onClick={onClose} style={{
      position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh',
      backgroundColor: 'rgba(0,0,0,0.7)', display: 'flex', justifyContent: 'center',
      alignItems: 'center', zIndex: 9999, backdropFilter: 'blur(8px)'
    }}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()} style={{
        backgroundColor: '#fff', padding: '40px', borderRadius: '24px',
        position: 'relative', width: '90%', maxWidth: '400px', textAlign: 'center',
        boxShadow: '0 20px 40px rgba(0,0,0,0.2)'
      }}>
        <button onClick={onClose} style={{
          position: 'absolute', top: '20px', right: '20px', border: 'none',
          background: 'none', fontSize: '24px', cursor: 'pointer', color: '#999'
        }}>&times;</button>
        
        <div style={{fontSize: '40px', marginBottom: '15px'}}>🔐</div>
        {title && <h3 style={{fontSize: '1.5rem', marginBottom: '20px', color: '#333', fontWeight: '700'}}>{title}</h3>}
        
        <div style={{width: '100%'}}>
          {children}
        </div>
      </div>
    </div>
  );
};

// 2. 타입 정의
interface ModalOptions {
  title?: string;
  content: ReactNode;
}

interface ModalContextType {
  openModal: (options: ModalOptions) => void;
  closeModal: () => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

// 3. Provider (컴포넌트)
export const ModalProvider = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [modalConfig, setModalConfig] = useState<ModalOptions | null>(null);

  const openModal = (options: ModalOptions) => {
    setModalConfig(options);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setModalConfig(null);
  };

  return (
    <ModalContext.Provider value={{ openModal, closeModal }}>
      {children}
      {isOpen && modalConfig && (
        <CommonModal 
          isOpen={isOpen} 
          onClose={closeModal} 
          title={modalConfig.title}
        >
          {modalConfig.content}
        </CommonModal>
      )}
    </ModalContext.Provider>
  );
};

// 4. Hook (일반 함수)
export function useModal() {
  const context = useContext(ModalContext);
  if (!context) throw new Error("useModal must be used within a ModalProvider");
  return context;
}