import { submitContact } from "./action";

export default function ContactPage() {
  return (
    <form action={submitContact} className="p-6 space-y-4">
      <input
        type="text"
        name="name"
        placeholder="enter name"
        required
        className="border p-2"
      />
      <input
        type="email"
        name="email"
        placeholder="Your Email"
        required
        className="border p-2"
      />
      <button className="bg-blue-600 text-white p-2">Submit</button>
    </form>
  );
}
