import IconButton from "@mui/material/IconButton";
import PlayCircleFilledWhiteOutlinedIcon from "@mui/icons-material/PlayCircleFilledWhiteOutlined";
import PauseCircleOutlinedIcon from "@mui/icons-material/PauseCircleOutlined";
import ShuffleOutlinedIcon from "@mui/icons-material/ShuffleOutlined";
import ShuffleOnOutlinedIcon from "@mui/icons-material/ShuffleOnOutlined";
import ArrowForwardIosOutlinedIcon from "@mui/icons-material/ArrowForwardIosOutlined";
import ArrowBackIosOutlinedIcon from "@mui/icons-material/ArrowBackIosOutlined";
import RepeatIcon from "@mui/icons-material/Repeat";
import RepeatOnIcon from "@mui/icons-material/RepeatOn";
import RepeatOneOnIcon from "@mui/icons-material/RepeatOneOn";
import StopCircleOutlinedIcon from "@mui/icons-material/StopCircleOutlined";
import { Repeat } from "@/utils/types";

interface PropInterface {
  shuffle: () => void;
  shuffleOn: boolean;
  isPlaying: boolean;
  play: () => void;
  goNext: () => void;
  goPrev: () => void;
  toggleRepeat: () => void;
  repeat: Repeat;
  stop: () => void;
}

export default function AudioControl(props: PropInterface) {
  const {
    shuffle,
    shuffleOn,
    isPlaying,
    play,
    goPrev,
    goNext,
    toggleRepeat,
    repeat,
    stop,
  } = props;

  const ActiveRepeatIcon =
    repeat === "off"
      ? RepeatIcon
      : repeat === "one"
        ? RepeatOneOnIcon
        : RepeatOnIcon;

  return (
    <div className="py-2 flex items-center justify-center">
      <IconButton onClick={shuffle} color="warning" aria-label="Toggle shuffle">
        {shuffleOn ? <ShuffleOnOutlinedIcon /> : <ShuffleOutlinedIcon />}
      </IconButton>
      <IconButton color="warning" onClick={goPrev}>
        <ArrowBackIosOutlinedIcon />
      </IconButton>
      <IconButton color="warning" onClick={play}>
        {isPlaying ? (
          <PauseCircleOutlinedIcon sx={{ fontSize: "3rem" }} />
        ) : (
          <PlayCircleFilledWhiteOutlinedIcon sx={{ fontSize: "3rem" }} />
        )}
      </IconButton>

      <IconButton color="warning" onClick={stop}>
        <StopCircleOutlinedIcon />
      </IconButton>

      <IconButton color="warning" onClick={goNext}>
        <ArrowForwardIosOutlinedIcon />
      </IconButton>

      <IconButton color="warning" onClick={toggleRepeat}>
        <ActiveRepeatIcon />
      </IconButton>
    </div>
  );
}
