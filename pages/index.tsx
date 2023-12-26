import { getMetaData } from "@/helpers";
import { useEffect, useRef, useState } from "react";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import LibraryMusic from "@mui/icons-material/LibraryMusic";
import AudioControl from "./_components/AudioControl";
import Cover from "./_components/Cover";
import Timer from "./_components/Timer";
import Library from "./_components/Library";
import { Song, Repeat } from "@/utils/types";
import { songs as orgSongs } from "@/helpers/songs";
const apiUrl = "http://localhost:3004";
const drawerWidth = 320;

export default function Home() {
  const [mobileOpen, setMobileOpen] = useState<boolean>(false);
  const [songs, setSongs] = useState<Song[]>([]);
  const [library, setLibrary] = useState<Song[]>([]);
  const [shuffledIndices, setShuffledIndices] = useState<number[]>([]);
  const [currentSong, setCurrentSong] = useState<Song | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentProgress, setCurrentProgress] = useState<number>(0);
  const [shuffleOn, setShuffleOn] = useState<boolean>(false);
  const [repeat, setRepeat] = useState<Repeat>("on");
  const audioEl = useRef<HTMLAudioElement | null>(null);

  const filterSong = (query: string) => {
    if (!query) {
      setLibrary([...songs]);
    } else {
      const filteredSongs = [...songs].filter((items) =>
        items.name.toLowerCase().includes(query.toLowerCase()),
      );
      setLibrary(filteredSongs);
    }
  };

  const generateShuffledIndices = () => {
    const idc = Array.from({ length: songs.length }, (_, index) => index);
    for (let i = idc.length - 1; i > 0; i--) {
      const j: number = Math.floor(Math.random() * (i + 1));
      [idc[i], idc[j]] = [idc[j], idc[i]];
    }
    return idc;
  };

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

  const shuffle = () => {
    setShuffleOn((state) => !state);

    if (!shuffleOn) {
      const newShuffledIndices = generateShuffledIndices();
      setShuffledIndices(newShuffledIndices);
    } else {
      setShuffledIndices([]);
    }
  };

  const play = () => setIsPlaying((state) => !state);
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const goNext = () => {
    const idx: number = songs.findIndex(
      (item) => item.name === currentSong?.name,
    );
    if (shuffleOn) {
      const ni: number = (idx + 1) % shuffledIndices.length;
      navigateSong(shuffledIndices[ni]);
    } else {
      const ni: number = (idx + 1) % songs.length;
      navigateSong(ni);
    }
  };

  const navigateSong = (index: number) => {
    if (!audioEl.current || index < 0 || index >= songs.length) return;

    setCurrentSong(songs[index]);
    audioEl.current.currentTime = 0;
  };

  const goPrev = () => {
    const idx: number = songs.findIndex(
      (item) => item.name === currentSong?.name,
    );
    if (shuffleOn) {
      const pi = (idx - 1 + shuffledIndices.length) % shuffledIndices.length;
      navigateSong(shuffledIndices[pi]);
    } else {
      const pi = (idx - 1 + songs.length) % songs.length;
      navigateSong(pi);
    }
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
    const _currentTime = (currentSong?.duration! * v) / 100;
    audioEl.current.currentTime = _currentTime;
  };

  const onPlaying = () => {
    if (!audioEl.current) return;
    const _duration: number = audioEl.current.duration;
    const _currentTime: number = audioEl.current.currentTime;
    const _progress: number = (_currentTime / _duration) * 100;
    setCurrentProgress(_progress);
    setCurrentSong({
      ...currentSong!,
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
    const _songs: Song[] = orgSongs.map((song) => {
      return {
        id: btoa(encodeURIComponent(song)),
        name: song,
        path: `${apiUrl}/audio/${encodeURIComponent(song)}`,
        ...getMetaData(song),
        duration: 0,
        progress: 0,
      };
    });

    setSongs(_songs);
    setLibrary(_songs);
  }, []);

  useEffect(() => {
    if (!audioEl.current) return;
    if (isPlaying) {
      audioEl.current.play();
    } else {
      audioEl.current.pause();
    }
  }, [isPlaying, currentSong]);

  useEffect(() => {
    if (songs.length) {
      setCurrentSong(songs[0]);
    }
  }, [songs]);

  useEffect(() => { }, [currentSong]);

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
            filterSong={filterSong}
            songs={library}
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
            filterSong={filterSong}
            songs={library}
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
              src={currentSong?.path}
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
