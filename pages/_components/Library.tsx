import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Toolbar from "@mui/material/Toolbar";
import MusicNoteOutlinedIcon from "@mui/icons-material/MusicNoteOutlined";
import Avatar from "@mui/material/Avatar";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import { Song } from "@/utils/types";
import { TextField } from "@mui/material";

interface PropInterface {
  songs: Song[];
  currentSong: Song | null;
  navigateSong: Function;
  filterSong: Function;
}

export default function Library(props: PropInterface) {
  const { songs, currentSong, navigateSong, filterSong } = props;

  return (
    <div className="relative">
      <div className="sticky top-0 border border-b w-full bg-white z-20">
        <Toolbar className="w-full p-0">
          <TextField
            onInput={(e: React.ChangeEvent<HTMLInputElement>) => {
              const query: string = e.target.value;
              filterSong(query);
            }}
            className="w-full"
            placeholder="Search..."
            type="search"
            InputProps={{ autoComplete: "new-password" }}
          />
        </Toolbar>
      </div>
      <List>
        {songs?.map((song, index: number) => {
          return (
            <ListItem key={song.id}>
              <ListItemButton
                selected={song?.name === currentSong?.name}
                onClick={() => navigateSong(index)}
              >
                <ListItemAvatar>
                  <Avatar>
                    <MusicNoteOutlinedIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary={song?.singer} secondary={song?.title} />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
    </div>
  );
}
