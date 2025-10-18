import Image from "next/image";

export function Blur() {
  return (
    <div className="absolute top-0 right-0 left-0 mx-auto w-[1200px] h-[500px] z-[-1]">
      <Image
        src="/hero-bg.jpg"
        alt="Hero Background"
        className="w-full h-full object-cover hero-bg"
        width={1200}
        height={500}
      />
    </div>
  );
}
