import './Message.css';

export default function Message({ color }: { color: 'yellow' | 'white' }) {
  return (
    <div className="message_box" style={{ alignSelf: color === 'white' ? 'flex-start' : 'flex-end' }}>
      <div style={{ alignSelf: color === 'white' ? 'flex-start' : 'flex-end' }}>userid</div>
      <div
        className="message"
        style={{
          backgroundColor: color === 'white' ? '#ffff' : '#fef01b',
        }}
      >
        message
      </div>
    </div>
  );
}
