import { useEffect } from 'react';

export default function Modal({ title, onClose, children }) {
  useEffect(() => {
    function handleKey(event) { if (event.key === 'Escape') onClose(); }
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 p-4" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}>
      <section role="dialog" aria-modal="true" aria-label={title} className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl bg-white p-6 shadow-2xl sm:p-8">
        <div className="mb-5 flex items-center justify-between gap-4">
          <h2 className="text-xl font-bold text-slate-900">{title}</h2>
          <button type="button" onClick={onClose} aria-label="Fechar" className="rounded-lg px-3 py-2 text-slate-500 hover:bg-slate-100">✕</button>
        </div>
        {children}
      </section>
    </div>
  );
}
