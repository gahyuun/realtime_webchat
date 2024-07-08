import { useState } from 'react';
import Modal from 'react-modal';

export default function UserModal({
  handleModalClose,
  handleChangeInput,
}: {
  handleModalClose: VoidFunction;
  handleChangeInput: React.ChangeEventHandler<HTMLInputElement>;
}) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <Modal
      isOpen={isOpen}
      shouldCloseOnOverlayClick={false}
      ariaHideApp={false}
      style={{
        content: {
          width: '32%',
          height: '32%',
          zIndex: '150',
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
        },
        overlay: {
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        },
      }}
    >
      <div>아이디 입력</div>
      <input onChange={handleChangeInput} />
      <button
        onClick={() => {
          setIsOpen(false);
          handleModalClose();
        }}
      >
        완료
      </button>
    </Modal>
  );
}
