export default function LoginPage() {
  return (
    <div>
      <form className="p-6 space-y-3">
        <input type="email" placeholder="enter email" name="email" />
        <input type="password" placeholder="enter password" name="password" />

        <button className="bg-blue-300 not-[]:p-2">submit</button>
      </form>
    </div>
  );
}
