export default function AmbientBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none bg-neutral-50/50">
      {/* Dynamic blurred amber-colored blobs */}
      <div className="absolute top-[8%] left-[-10%] w-[450px] sm:w-[600px] h-[450px] sm:h-[600px] rounded-full bg-amber-200/25 blur-[120px] sm:blur-[140px] animate-blob-1 pointer-events-none" />
      <div className="absolute top-[45%] right-[-15%] w-[400px] sm:w-[500px] h-[400px] sm:h-[500px] rounded-full bg-amber-100/30 blur-[110px] sm:blur-[130px] animate-blob-2 pointer-events-none" />
      <div className="absolute bottom-[5%] left-[10%] w-[500px] h-[500px] rounded-full bg-orange-100/20 blur-[130px] animate-blob-3 pointer-events-none" />
      
      {/* Additional subtle highlights to increase dynamic depth */}
      <div className="absolute top-[80%] right-[15%] w-[350px] h-[350px] rounded-full bg-yellow-100/25 blur-[100px] animate-pulse-slow pointer-events-none" />
    </div>
  );
}
