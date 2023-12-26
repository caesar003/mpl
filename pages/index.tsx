import { useEffect, useRef, useState } from "react";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import { Song } from "@/utils/types";
import { songs } from "@/helpers/data";
import LibraryMusic from "@mui/icons-material/LibraryMusic";
import AudioControl from "./_components/AudioControl";
import Cover from "./_components/Cover";
import Timer from "./_components/Timer";
import Library from "./_components/Library";

const drawerWidth = 320;

type Repeat = "on" | "off" | "one";

const shuffleArray = (array: Song[]) => {
  for (let i = 0; i < array.length - 1; i++) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }

  return array;
};

export default function Home() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const [musics, setMusics] = useState<Song[]>(songs);
  const [currentSong, setCurrentSong] = useState<Song>(songs[0]);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentProgress, setCurrentProgress] = useState(0);
  const [shuffleOn, setShuffleOn] = useState<boolean>(false);
  const [repeat, setRepeat] = useState<Repeat>("on");
  const audioEl = useRef<HTMLAudioElement | null>(null);

  const toggleRepeat = () => {
    switch (repeat) {
      case "on":
        setRepeat("one");
        break;
      case "off":
        setRepeat("on");
        break;
      case "one":
        setRepeat("off");
        break;
    }
  };

  const shuffle = () => setShuffleOn((state) => !state);
  const play = () => setIsPlaying((state) => !state);
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const goNext = () => {
    const idx = songs.findIndex((item) => item.name === currentSong.name);
    const prevIndex = (idx - 1 + songs.length) % songs.length;
    navigateSong(prevIndex);
  };

  const navigateSong = (index: number) => {
    if (!audioEl.current || index < 0 || index >= songs.length) return;

    setCurrentSong(songs[index]);
    audioEl.current.currentTime = 0;
  };

  const goPrev = () => {
    const idx = songs.findIndex((item) => item.name === currentSong.name);
    const nextIndex = (idx + 1) % songs.length;
    navigateSong(nextIndex);
  };

  const stop = () => {
    if (!audioEl.current) return;
    setIsPlaying(false);
    audioEl.current.pause();
    audioEl.current.currentTime = 0;
  };

  const onSeek = (e: Event, v: number | number[]) => {
    if (typeof v !== "number") return;
    if (!audioEl.current) return;
    const _currentTime = (currentSong.duration * v) / 100;
    audioEl.current.currentTime = _currentTime;
  };

  const onPlaying = () => {
    if (!audioEl.current) return;
    const _duration = audioEl.current.duration;
    const _currentTime = audioEl.current.currentTime;
    const _progress = (_currentTime / _duration) * 100;
    setCurrentProgress(_progress);
    setCurrentSong({
      ...currentSong,
      duration: _duration,
      progress: _progress,
    });
  };

  const onFinishPlaying = () => {
    if (!audioEl.current) return;
    switch (repeat) {
      case "one":
        break;
      case "on":
        goNext();
        break;
      case "off":
        setIsPlaying(false);
        break;
    }
  };

  useEffect(() => {
    setMusics(songs.slice(0, 50));
  }, []);

  useEffect(() => {
    if (!audioEl.current) return;
    if (isPlaying) {
      audioEl.current.play();
      console.log(audioEl);
    } else {
      audioEl.current.pause();
    }
  }, [isPlaying, currentSong]);

  return (
    <Box sx={{ display: "flex", overflow: "hidden", height: "100vh" }}>
      <CssBaseline />
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          <Library
            musics={musics}
            currentSong={currentSong}
            navigateSong={navigateSong}
          />
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          open
        >
          <Library
            musics={musics}
            currentSong={currentSong}
            navigateSong={navigateSong}
          />
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <main className="h-screen w-full flex flex-col items-center">
          <div className="flex-1 gap-4 flex  flex-col items-center justify-center w-[320px]">
            <div className="flex justify-end items-center w-full">
              <Button
                color="warning"
                onClick={handleDrawerToggle}
                startIcon={<LibraryMusic />}
                variant="outlined"
              >
                Library
              </Button>
            </div>

            <audio
              src={`http://localhost:3004${currentSong.path}`}
              ref={audioEl}
              onTimeUpdate={onPlaying}
              onEnded={onFinishPlaying}
            />
            <Cover currentSong={currentSong} />

            <Timer
              currentProgress={currentProgress}
              onSeek={onSeek}
              audioEl={audioEl}
              currentSong={currentSong}
            />

            <AudioControl
              shuffle={shuffle}
              shuffleOn={shuffleOn}
              isPlaying={isPlaying}
              play={play}
              goPrev={goPrev}
              goNext={goNext}
              toggleRepeat={toggleRepeat}
              stop={stop}
              repeat={repeat}
            />
          </div>
        </main>
      </Box>
    </Box>
  );
}
