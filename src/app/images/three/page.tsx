import Image from "next/image";
import { images } from "@/const/image";
// 使用fill时，父元素必须提供宽高样式和修改position为relative
export default function Page() {
  return (
    <div style={{ width: "300px", height: "400px", position: "relative" }}>
      <Image
        alt="test"
        src={images["9-16"][0]}
        sizes="100vw"
        fill
        priority
        style={{
          objectFit: "contain",
        }}
      />
    </div>
  );
}
