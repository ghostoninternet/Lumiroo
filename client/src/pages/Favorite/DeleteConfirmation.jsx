// src/pages/Favorite/DeleteConfirmation.jsx
import { FaHeart, FaExclamationTriangle } from 'react-icons/fa';
import { MdClose, MdCheck } from 'react-icons/md';
import { 
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter 
} from '../../components/ui/alert-dialog';

const DeleteConfirmation = ({ isOpen, onClose, onConfirm, playgroundName }) => {
  return (
    <AlertDialog open={isOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <div className="flex flex-col items-center gap-4">
            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
              <FaHeart className="w-6 h-6 text-red-500" />
            </div>
            <h2 className="text-xl font-semibold text-center">
              お気に入りから削除
            </h2>
            <div className="text-center text-gray-600">
              <p className="mb-2">
                <span className="font-medium text-gray-900">{playgroundName}</span>
                をお気に入りから削除してもよろしいですか？
              </p>
              <div className="flex items-center justify-center text-sm text-amber-600 bg-amber-50 p-2 rounded-lg">
                <FaExclamationTriangle className="w-4 h-4 mr-2" />
                この操作は取り消すことができません
              </div>
            </div>
          </div>
        </AlertDialogHeader>
        
        <AlertDialogFooter>
          <button
            onClick={onClose}
            className="flex-1 py-2 px-4 bg-gray-100 text-gray-700 hover:bg-gray-200 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
          >
            <MdClose className="w-5 h-5" />
            キャンセル
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 py-2 px-4 bg-green-600 text-white hover:bg-green-700 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
          >
            <MdCheck className="w-5 h-5" />
            確認する
          </button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteConfirmation;