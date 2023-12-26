import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Toolbar from "@mui/material/Toolbar";
import MusicNoteOutlinedIcon from "@mui/icons-material/MusicNoteOutlined";
import Avatar from "@mui/material/Avatar";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import { Song } from "@/utils/types";

interface PropInterface {
  musics: Song[];
  currentSong: Song;
  navigateSong: (index: number) => void;
}

export default function Library(props: PropInterface) {
  const { musics, currentSong, navigateSong } = props;

  return (
    <div>
      <Toolbar />
      <Divider />
      <List>
        {musics.map((song, index) => {
          return (
            <ListItem key={index}>
              <ListItemButton
                selected={song.name === currentSong.name}
                onClick={() => navigateSong(index)}
              >
                <ListItemAvatar>
                  <Avatar>
                    <MusicNoteOutlinedIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary={song.singer} secondary={song.title} />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
    </div>
  );
}
