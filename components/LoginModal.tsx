"use client";

import Link from "next/link";

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function LoginModal({ open, onClose }: Props) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/70 z-[9999] flex items-center justify-center">
      <div className="bg-white rounded-2xl w-[400px] max-w-[95%] p-8 relative">

        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-xl"
        >
          ✕
        </button>

        <h2 className="text-2xl font-bold">
          Login Required
        </h2>

        <p className="text-gray-500 mt-2">
          Login to continue shopping.
        </p>

        <Link href="/login">
          <button className="w-full mt-8 bg-black text-white py-3 rounded-xl font-bold">
            Login
          </button>
        </Link>

        <Link href="/register">
          <button className="w-full mt-3 border py-3 rounded-xl font-bold">
            Create Account
          </button>
        </Link>

      </div>
    </div>
  );
}