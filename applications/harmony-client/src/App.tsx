import { Router, Route, Navigate } from "@solidjs/router";
import Main from "./Main";
import ChatContent from "./components/ChatContent";
import VoiceContent from "./components/VoiceContent";
import Dialog from "@corvu/dialog";
import { ThemeProvider } from "solid-styled-components";
import { useTheme } from "./state";
import SpaceRenderer from "./components/SpaceRenderer";
import GenericChannel from "./components/GenericChannel";
import SpaceHome from "./components/SpaceHome";
import Relationships from "./components/Relationships";

const themes = {
  light: {
    
  }
}

function App() {
  const theme = useTheme();
  return (
    <>
      <ThemeProvider theme={theme}>
        <Dialog>
          <Router>
            <Route path="/" component={() => <Navigate href="/app" />} />
            <Route path="/app" component={Main}>
              <Route path="/me" component={SpaceRenderer}>
                <Route path="/" component={() => <Navigate href="./relationships" />} />
                <Route path="/relationships" component={Relationships} />
                <Route path="/channels/:channelId" component={GenericChannel}>
                  <Route path="/" component={() => <Navigate href="./text" />} />
                  <Route path="/text" component={ChatContent} />
                  <Route path="/voice" component={VoiceContent} />
                </Route>
              </Route>
              <Route path="/spaces/:spaceId" component={SpaceRenderer}>
                <Route path="/" component={() => <Navigate href="./home" />} />
                <Route path="/home" component={SpaceHome} />
                <Route path="/channels/:channelId" component={GenericChannel}>
                <Route path="/" component={() => <Navigate href="./text" />} />
                  <Route path="/text" component={ChatContent} />
                  <Route path="/voice" component={VoiceContent} />
                </Route>
              </Route>

              <Route path="/" component={() => <Navigate href="/app/me" />} />
            </Route>
          </Router>
        
        </Dialog>
      </ThemeProvider>
    </>
  )
}

export default App;
