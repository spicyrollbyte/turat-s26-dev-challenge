import { useState } from "react";

type LoginModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onLogin: (name: string, email: string) => void;
};

export const LoginModal = ({ isOpen, onClose, onLogin }: LoginModalProps): JSX.Element | null => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim() && email.trim()) {
      onLogin(name, email);
      setName("");
      setEmail("");
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4">
        <h2 className="text-2xl font-bold mb-4">Log In</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-bold mb-2">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 border rounded"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-sm font-bold mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border rounded"
              required
            />
          </div>
          <div className="flex gap-3">
            <button
              type="submit"
              className="flex-1 bg-[#4a4c6c] text-white py-2 rounded-lg font-bold hover:opacity-90"
            >
              Log In
            </button>
            <button
              type="button"
              onClick={onClose}
              className="flex-1 border-2 border-[#4a4c6c] text-[#4a4c6c] py-2 rounded-lg font-bold hover:bg-gray-100"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
