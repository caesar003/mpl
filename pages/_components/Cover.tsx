import { Typography, Card } from "@mui/material";
import { Album } from "@mui/icons-material";
import { Song } from "@/utils/types";

export default function Cover({ currentSong }: { currentSong: Song | null }) {
  return (
    <>
      <Card
        sx={{ width: "320px", p: 2 }}
        elevation={5}
        className="rounded-lg flex flex-col items-center justify-center gap-4"
      >
        <Album className="text-[240px] text-gray-300" />
      </Card>

      <div className="flex flex-col text-center w-full">
        <Typography className="text-lg font-bold">
          {currentSong?.singer}
        </Typography>
        <Typography className="text-md text-gray-600">
          {currentSong?.title}
        </Typography>
      </div>
    </>
  );
}
