import './Message.css';

export default function Message({
  color,
  userId,
  content,
}: {
  color: 'yellow' | 'white';
  userId: string;
  content: string;
}) {
  return (
    <div className="message_box" style={{ alignSelf: color === 'white' ? 'flex-start' : 'flex-end' }}>
      <div style={{ alignSelf: color === 'white' ? 'flex-start' : 'flex-end' }}>{userId}</div>
      <div
        className="message"
        style={{
          backgroundColor: color === 'white' ? '#ffff' : '#fef01b',
        }}
      >
        {content}
      </div>
    </div>
  );
}
