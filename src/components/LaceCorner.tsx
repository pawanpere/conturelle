export default function LaceCorner() {
  return (
    <svg
      className="fixed bottom-0 left-0 w-[200px] opacity-[0.07] pointer-events-none z-[1]"
      viewBox="0 0 200 200"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="0" cy="200" r="180" stroke="rgba(201,169,110,1)" strokeWidth="0.5" fill="none" />
      <circle cx="0" cy="200" r="140" stroke="rgba(201,169,110,1)" strokeWidth="0.5" fill="none" />
      <circle cx="0" cy="200" r="100" stroke="rgba(201,169,110,1)" strokeWidth="0.5" fill="none" />
      <circle cx="0" cy="200" r="60" stroke="rgba(201,169,110,1)" strokeWidth="0.5" fill="none" />
      <line x1="0" y1="200" x2="200" y2="0" stroke="rgba(201,169,110,0.4)" strokeWidth="0.3" />
      <line x1="0" y1="200" x2="160" y2="0" stroke="rgba(201,169,110,0.4)" strokeWidth="0.3" />
      <line x1="0" y1="200" x2="200" y2="40" stroke="rgba(201,169,110,0.4)" strokeWidth="0.3" />
    </svg>
  );
}
