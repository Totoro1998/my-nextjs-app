import useSettingStore, { Theme } from "@/store/setting";
import { Switch } from "@/ui/radix-ui";
export default function ThemeSwitch() {
  const config = useSettingStore((state) => state.config);
  const changeConfig = useSettingStore((state) => state.changeConfig);

  function handleCheckedChange(e) {
    changeConfig("mode", e ? Theme.LIGHT : Theme.DARK);
  }
  const checked = config.mode === Theme.LIGHT;
  return (
    <Switch.Root
      className="
      shadow-inner w-[50px] h-[24px] bg-[length:16px_16px] bg-no-repeat rounded-full relative cursor-pointer outline-none
      bg-black bg-[url('/assets/icon/month.svg')] bg-[30px]
      data-[state=checked:bg-[#A9B7D4] data-[state=checked]:bg-[url('/assets/icon/sun.svg')] data-[state=checked]:bg-white-50 data-[state=checked]:bg-[6px]"
      id="airplane-mode"
      defaultChecked={checked}
      checked={checked}
      onCheckedChange={handleCheckedChange}
    >
      <Switch.Thumb className="block w-[18px] h-[18px] bg-white rounded-full transition-transform duration-100 translate-x-1 will-change-transform data-[state=checked]:translate-x-[28px]" />
    </Switch.Root>
  );
}
