import React, { useState } from "react";
import clsx from "clsx";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import {
  CssBaseline,
  AppBar,
  Toolbar,
  Drawer,
  List,
  Typography,
  Divider,
  IconButton,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import SubjectIcon from "@material-ui/icons/Subject";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import Weather from "simple-react-weather";

import MenuDialog from "./MenuDialog";
import Map from "../components/Map";

import "../App.css";

const drawerWidth = 240;

// Latitude and longitude coordinates are: 52.668018, -8.630498.
const irelandCenter = require("../data/IrelandCenter.json");
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    display: "flex",
  },
  appBar: {
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: "none",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: "flex-end",
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
  title: {
    flexGrow: 1,
  },
}));

export default function Layout() {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [menuDialogOpen, setMenuDialogOpen] = useState(false);
  const [menuDialogFlag, setMenuDialogFlag] = useState();
  // latitude and longitude variable saved in state.
  const [lat, setLat] = useState(irelandCenter.lat);
  const [lng, setLng] = useState(irelandCenter.lng);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleMenuDialogOpen = () => {
    console.log();
    setMenuDialogOpen(true);
  };

  const handleMenuDialogFlag = (bool) => {
    setMenuDialogFlag(bool);
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, open && classes.hide)}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            className={classes.title}
            onClick={() => window.location.reload(false)}
            style={{ cursor: "pointer" }}
          >
            Covid-19 Information - Ireland
          </Typography>
          <Weather
            // Inbuilt props: https://github.com/lopogo59/simple-react-weather#readme.
            unit="C"
            lat={lat}
            lon={lng}
            appid={process.env.REACT_APP_WEATHER_API}
            style={{
              paddingTop: "1vh",
            }}
          />
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </div>
        <Divider />
        <List>
          <ListItem
            button
            key={"About"}
            onClick={() => {
              handleMenuDialogOpen();
              handleMenuDialogFlag(true);
            }}
          >
            <ListItemIcon>
              <SubjectIcon />
            </ListItemIcon>
            <ListItemText primary={"About"} />
          </ListItem>
          <ListItem
            button
            key={"Key"}
            onClick={() => {
              handleMenuDialogOpen();
              handleMenuDialogFlag(false);
            }}
          >
            <ListItemIcon>
              <LocationOnIcon />
            </ListItemIcon>
            <ListItemText primary={"Key"} />
          </ListItem>
        </List>
        <MenuDialog
          menuDialogOpen={menuDialogOpen}
          setMenuDialogOpen={setMenuDialogOpen}
          menuDialogFlag={menuDialogFlag}
          setMenuDialogFlag={setMenuDialogFlag}
        ></MenuDialog>

        <Divider />
      </Drawer>
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open,
        })}
      >
        <div className={classes.drawerHeader} />
        {/* Render the Google Map */}
        <Map setLat={setLat} setLng={setLng}></Map>
      </main>
    </div>
  );
}
