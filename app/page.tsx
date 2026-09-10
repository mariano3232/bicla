import Image from "next/image";

export default function Home() {
  return (
    <div className="flex bg-yellow-900">
      <h1 className="text-9xl wrap-break-word w-[50%] text-red-500">
        LLEVA LLEVAME EN TU BICICLETA
      </h1>
      <img src="/bici.webp" alt="" className="w-[50%] h-[100vh]" />
    </div>
  );
}
