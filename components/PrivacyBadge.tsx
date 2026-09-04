export default function PrivacyBadge({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-2 text-xs text-muted ${className}`}>
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="shrink-0 text-phosphor">
        <path d="M12 2l8 3v6c0 5-3.4 9-8 11-4.6-2-8-6-8-11V5l8-3z" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <span>Your images are processed locally on your device and are not uploaded to our servers.</span>
    </div>
  );
}
