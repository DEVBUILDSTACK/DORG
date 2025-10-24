type ConfirmationModalProps = {
    opened: boolean;
    onConfirm: () => void;
    onCancel: () => void;
    icon: React.ReactNode;
    title: string;
    content: string;
    confirmText: string;
    cancelText: string;
};

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({ opened, onConfirm, onCancel, icon, title, content, confirmText, cancelText }) => {
    if (!opened)
        return null;

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-fundio-sidebar rounded-xl p-6 max-w-sm w-full">
                <div className="flex flex-col items-center text-center">
                    <div className="mb-4">{icon}</div>
                    <h3 className="text-white text-2xl font-semibold mb-2">{title}</h3>
                    <p className="text-gray-400 mb-6 text-sm">{content}</p>
                    <div className="flex gap-3 w-full">
                        <button
                            type="button"
                            onClick={onCancel}
                            className="flex-1 py-3 px-4 rounded-lg border border-gray-600 text-gray-300 hover:bg-gray-800 cursor-pointer text-xs"
                        >
                            {cancelText}
                        </button>
                        <button
                            type="button"
                            onClick={onConfirm}
                            className="flex-1 py-3 px-4 rounded-lg bg-[#e74d4d] text-white hover:bg-[#e43030]/80 cursor-pointer text-xs"
                        >
                            {confirmText}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ConfirmationModal;
