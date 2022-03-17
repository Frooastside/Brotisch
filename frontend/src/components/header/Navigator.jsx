import {
  Abc as AlphabetIcon,
  Assignment as ActionsIcon,
  Book as DictionaryIcon,
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
  LibraryBooks as GrammarIcon,
  Timeline as ContributionsIcon,
  Translate as TranslatorIcon
} from "@mui/icons-material";
import {
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  styled,
  Typography,
  useTheme
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { toggleDrawer } from "../../redux/interfaceSlice";
import LinkBehavior from "../LinkBehavior";

const Navigator = () => {
  const drawerOpen = useSelector((state) => state.interface.drawerOpen);
  const drawerWidth = useSelector((state) => state.interface.drawerWidth);
  const dispatch = useDispatch();
  const theme = useTheme();

  return (
    <Drawer
      anchor="left"
      open={drawerOpen}
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box"
        }
      }}
      variant="persistent"
    >
      <DrawerHeader>
        <IconButton onClick={() => dispatch(toggleDrawer())}>
          {theme.direction === "ltr" ? (
            <ChevronLeftIcon />
          ) : (
            <ChevronRightIcon />
          )}
        </IconButton>
      </DrawerHeader>
      <Divider />
      <List>
        <ListItem button component={LinkBehavior} href="/alphabet">
          <ListItemIcon>
            <AlphabetIcon />
          </ListItemIcon>
          <ListItemText primary="Alphabet" />
        </ListItem>
        <ListItem button component={LinkBehavior} href="/grammar">
          <ListItemIcon>
            <GrammarIcon />
          </ListItemIcon>
          <ListItemText primary="Grammar" />
        </ListItem>
        <ListItem button component={LinkBehavior} href="/dictionary">
          <ListItemIcon>
            <DictionaryIcon />
          </ListItemIcon>
          <ListItemText primary="Dictionary" />
        </ListItem>
        <ListItem button component={LinkBehavior} href="/translate">
          <ListItemIcon>
            <TranslatorIcon />
          </ListItemIcon>
          <ListItemText primary="Translator" />
        </ListItem>
        <Divider />
        <ListItem button component={LinkBehavior} href="/actions">
          <ListItemIcon>
            <ActionsIcon />
          </ListItemIcon>
          <ListItemText primary="Your Actions" />
        </ListItem>
        <ListItem button component={LinkBehavior} href="/contributions">
          <ListItemIcon>
            <ContributionsIcon />
          </ListItemIcon>
          <ListItemText primary="Your Contributions" />
        </ListItem>
      </List>
      <Typography
        sx={{
          mb: "1em",
          mt: "auto",
          textAlign: "center"
        }}
        variant="caption"
      >
        Frooastside, Copyright © 2022
        <br />
        Brotisch Version 0.1.0
      </Typography>
    </Drawer>
  );
};

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: "flex-end"
}));

export default Navigator;
