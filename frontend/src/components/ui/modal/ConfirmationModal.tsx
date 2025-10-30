import { motion, AnimatePresence } from 'framer-motion';

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

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({ 
    opened, 
    onConfirm, 
    onCancel, 
    icon, 
    title, 
    content, 
    confirmText, 
    cancelText 
}) => {
    return (
        <AnimatePresence>
            {opened && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl"
                    >
                        <div className="flex flex-col items-center text-center">
                            <div className="mb-6 w-16 h-16 rounded-full bg-[#FF6B35]/10 flex items-center justify-center">
                                {icon}
                            </div>
                            <h3 className="text-[#1F2937] text-2xl font-bold mb-3">{title}</h3>
                            <p className="text-[#5A6C7D] mb-8">{content}</p>
                            <div className="flex gap-3 w-full">
                                <button
                                    type="button"
                                    onClick={onCancel}
                                    className="flex-1 py-3 px-4 rounded-xl border border-[#E5E7EB] text-[#5A6C7D] hover:bg-[#F9FAFB] transition-all duration-200 font-semibold"
                                >
                                    {cancelText}
                                </button>
                                <button
                                    type="button"
                                    onClick={onConfirm}
                                    className="flex-1 py-3 px-4 rounded-xl bg-linear-to-r from-[#FF6B35] to-[#E65A2D] text-white hover:shadow-lg hover:shadow-[#FF6B35]/30 transition-all duration-200 font-semibold"
                                >
                                    {confirmText}
                                </button>
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default ConfirmationModal;
