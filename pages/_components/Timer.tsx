import React, { MutableRefObject } from "react";
import { Typography, Slider } from "@mui/material";
import { formatTime } from "@/helpers";
import { Song } from "@/utils/types";

interface PropInterface {
  onSeek: (e: Event, v: number | number[]) => void;
  currentProgress: number;
  audioEl: MutableRefObject<HTMLAudioElement | null>;
  currentSong: Song;
}

export default function Timer(props: PropInterface) {
  const { onSeek, currentProgress, audioEl, currentSong } = props;
  return (
    <>
      <div className="w-full flex flex-col gap-1">
        <Slider
          onChange={onSeek}
          value={currentProgress || 0}
          color="warning"
          size="small"
        />
        <div className="flex w-full justify-between text-xs text-gray-500">
          <Typography>{formatTime(audioEl?.current?.currentTime)}</Typography>
          <Typography>{formatTime(currentSong?.duration)}</Typography>
        </div>
      </div>
    </>
  );
}
