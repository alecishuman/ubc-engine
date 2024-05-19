import Image from "next/image";

export default function Home() {
  return (
    <div className="w-full h-[100vh] flex flex-column justify-center items-center text-4xl">
      <div className="name flex items-center">
        <div className="font-semibold">ubc</div>
        <div className="inline-block">engine</div>
      </div>
    </div>
  );
}
