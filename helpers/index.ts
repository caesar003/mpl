import { MetaData } from "@/utils/types";

export const getMetaData = (name: string): MetaData => {
  const fileNameWithoutExtension = name.replace(/\.[^/.]+$/, "");
  const separatorIndex = fileNameWithoutExtension.indexOf(" - ");
  if (separatorIndex !== -1) {
    const singer = fileNameWithoutExtension.substring(0, separatorIndex);
    const title = fileNameWithoutExtension.substring(separatorIndex + 3);

    return { singer, title };
  } else {
    return { singer: name, title: name };
  }
};

export const isEmptyObject = (obj: {}): boolean => {
  return Object.keys(obj).length === 0;
};

export function formatTime(duration: number = 0): string {
  if (!duration) return "00:00";
  duration = Math.ceil(duration);

  const hours = Math.floor(duration / 3600);
  const minutes = Math.floor((duration % 3600) / 60);
  const seconds = duration % 60;

  const formattedHours = hours > 0 ? hours.toString() + ":" : "";
  const formattedMinutes =
    minutes < 10 ? "0" + minutes.toString() : minutes.toString();
  const formattedSeconds =
    seconds < 10 ? "0" + seconds.toString() : seconds.toString();

  const formattedTime =
    formattedHours + formattedMinutes + ":" + formattedSeconds;

  return formattedTime;
}
