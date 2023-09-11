import GetUserInfo from "@/components/pages/GetUserInfo";
import Content from "@/components/Content";

export default function MenuLayout({ children }) {
  return (
    <>
      <GetUserInfo />
      <Content>{children}</Content>
    </>
  );
}
