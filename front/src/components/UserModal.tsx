import { FormEvent, useState } from 'react';
import Modal from 'react-modal';
import './UserModal.css';

export default function UserModal({
  handleModalClose,
  handleChangeInput,
}: {
  handleModalClose: VoidFunction;
  handleChangeInput: React.ChangeEventHandler<HTMLInputElement>;
}) {
  const [isOpen, setIsOpen] = useState(true);

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();
    handleModalClose();
  };

  const contentModalStyle: React.CSSProperties = {
    width: '32%',
    height: '32%',

    zIndex: '1',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',

    border: 'none',
    borderRadius: '16px',

    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    gap: '20%',
  };

  const overlayModalStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: ' rgba(0, 0, 0, 0.4)',
    inset: '0px',
  };
  return (
    <Modal
      isOpen={isOpen}
      shouldCloseOnOverlayClick={false}
      ariaHideApp={false}
      style={{
        content: contentModalStyle,
        overlay: overlayModalStyle,
      }}
    >
      <div className="user_id_input_text">아이디 입력</div>
      <form
        onSubmit={onSubmit}
        style={{
          display: 'flex',
          height: '20%',
          maxWidth: '80%',
          minWidth: '40%',
          gap: '8px',
        }}
      >
        <input onChange={handleChangeInput} className="user_id_input" />
        <button
          onClick={() => {
            setIsOpen(false);
            handleModalClose();
          }}
          className="user_id_button"
        >
          완료
        </button>
      </form>
    </Modal>
  );
}
