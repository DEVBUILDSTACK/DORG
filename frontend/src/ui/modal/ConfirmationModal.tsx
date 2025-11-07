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
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white border border-[#E5E7EB] rounded-xl p-6 max-w-sm w-full shadow-xl">
                <div className="flex flex-col items-center text-center">
                    <div className="mb-4">{icon}</div>
                    <h3 className="text-[#1F2937] text-2xl font-semibold mb-2">{title}</h3>
                    <p className="text-[#5A6C7D] mb-6 text-sm">{content}</p>
                    <div className="flex gap-3 w-full">
                        <button
                            type="button"
                            onClick={onCancel}
                            className="flex-1 py-3 px-4 rounded-lg border border-[#E5E7EB] text-[#5A6C7D] hover:bg-[#F9FAFB] transition-colors cursor-pointer text-xs font-medium"
                        >
                            {cancelText}
                        </button>
                        <button
                            type="button"
                            onClick={onConfirm}
                            className="flex-1 py-3 px-4 rounded-lg bg-[#DC2626] text-white hover:bg-[#DC2626]/90 transition-colors cursor-pointer text-xs font-medium"
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
