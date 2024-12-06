import { createPortal } from 'react-dom';

export const AlertDialog = ({ open, children }) => {
  if (!open) return null;

  return createPortal(
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
      {children}
    </div>,
    document.body
  );
};

export const AlertDialogContent = ({ children, className = "" }) => {
  return (
    <div className={`bg-white rounded-lg shadow-xl max-w-md w-full mx-auto ${className}`}>
      {children}
    </div>
  );
};

export const AlertDialogHeader = ({ children }) => {
  return <div className="p-6">{children}</div>;
};

export const AlertDialogFooter = ({ children }) => {
  return <div className="flex gap-3 p-6 pt-0">{children}</div>;
};