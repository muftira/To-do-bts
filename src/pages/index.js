import Login from "./login";

export default function Home() {
  return (
    <div
      className={`flex min-h-screen flex-col items-center justify-between p-24 `}
    >
      <Login/>
    </div>
  );
}
