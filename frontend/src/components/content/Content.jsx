import { CircularProgress, styled } from "@mui/material";
import { lazy, Suspense } from "react";
import { useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";

const Grammer = lazy(() => import("./Grammar"));
const Dictionary = lazy(() => import("./Dictionary"));
const NewEntry = lazy(() => import("./NewEntry"));

const Content = () => {
  const drawerOpen = useSelector((state) => state.interface.drawerOpen);
  const drawerWidth = useSelector((state) => state.interface.drawerWidth);

  return (
    <Main drawerOpen={drawerOpen} drawerWidth={drawerWidth}>
      <HeaderSpacer />
      <Routes>
        <Route
          element={
            <Suspense fallback={<CircularProgress sx={{ m: 20 }} />}>
              <Grammer />
            </Suspense>
          }
          path="/grammar"
        />
        <Route
          element={
            <Routes>
              <Route
                element={
                  <Suspense fallback={<CircularProgress sx={{ m: 20 }} />}>
                    <Dictionary />
                  </Suspense>
                }
                path="/*"
              />
              <Route
                element={
                  <Suspense fallback={<CircularProgress sx={{ m: 20 }} />}>
                    <NewEntry />
                  </Suspense>
                }
                path="/new"
              />
            </Routes>
          }
          path="/dictionary/*"
        />
      </Routes>
    </Main>
  );
};

const Main = styled("main", {
  shouldForwardProp: (prop) => prop !== "drawerOpen" && prop !== "drawerWidth"
})(({ theme, drawerOpen, drawerWidth }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  transition: theme.transitions.create("margin", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen
  }),
  marginLeft: `-${drawerWidth}px`,
  ...(drawerOpen && {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    }),
    marginLeft: 0
  })
}));

const HeaderSpacer = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: "flex-end"
}));

export default Content;
