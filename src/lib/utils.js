import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { isEmpty, isNil } from "lodash-es";

// 合并className
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function isEmptyData(data) {
  if (typeof data === "undefined") {
    return true;
  }
  if (isNil(data) || data === "") {
    return true;
  } else if (typeof data === "number" && isNaN(data)) {
    return true;
  } else if (typeof data === "object") {
    return isEmpty(data);
  } else {
    return false;
  }
}

export function arrayToObject(arr, key) {
  return arr.reduce((acc, cur) => {
    if (cur.hasOwnProperty(key)) {
      acc[cur[key]] = cur;
    }
    return acc;
  }, {});
}

export function copyToClipboard(text) {
  let textArea = document.createElement("textarea");

  // 设置要复制的文本
  textArea.value = text;

  // 将textarea元素放到文档中
  document.body.appendChild(textArea);

  // 选择文本域中的文本
  textArea.select();

  try {
    // 尝试执行复制命令
    document.execCommand("copy");
  } catch (err) {
    console.error("复制失败:", err);
  }

  // 从文档中移除textarea元素
  document.body.removeChild(textArea);
}
