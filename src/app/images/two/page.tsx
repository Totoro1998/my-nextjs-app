import Image from "next/image";
import { images } from "@/const/image";
// 基本使用
export default function Page() {
  return (
    <div style={{ width: "300px" }}>
      <Image
        alt="test"
        src={images["9-16"][0]}
        width={9}
        height={16}
        sizes="100vw"
        priority
        style={{
          width: "100%",
          height: "auto",
        }}
      />
    </div>
  );
}
