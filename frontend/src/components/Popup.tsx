import React, { useEffect, useState } from 'react';
import 'components/Popup.css';

interface PopupProps {
  message: string;
  isVisible: boolean;
  onClose: () => void;
}

const Popup: React.FC<PopupProps> = ({ message, isVisible, onClose }) => {
  const [show, setShow] = useState(false);
  const [animationClass, setAnimationClass] = useState('');

  useEffect(() => {
    if (isVisible) {
      setShow(true);
      setAnimationClass('popup-enter');

      const timer = setTimeout(() => {
        setAnimationClass('popup-exit');
        setTimeout(() => {
          setShow(false);
          onClose();
        }, 700);
      }, 10000);

      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);

  if (!show) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 pb-5 flex justify-center">
        <div
        className={`fixed bottom-5 transform -translate-x-1/2 max-w-sm bg-blue-500 text-white py-3 px-6 rounded-lg shadow-lg text-center ${animationClass}`}
        style={{ zIndex: 1000 }}
        >
        {message}
        </div>
    </div>
  );
};

export default Popup;
