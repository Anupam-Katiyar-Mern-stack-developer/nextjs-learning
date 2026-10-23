"use client";

export default function Error({ error, reset }) {
  return (
    <div className="p-6">
      <h2>Something went wrong!</h2>

      <p>{error.message}</p>

      <button
        onClick={() => reset()}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Try Again
      </button>
    </div>
  );
}