import { Router, Route, Navigate } from "@solidjs/router";
import Main from "./Main";
import ChatContent from "./components/ChatContent";
import VoiceContent from "./components/VoiceContent";

function App() {

  return (
    <>
      <Router>
        <Route path="/" component={() => <Navigate href="/app" />} />
        <Route path="/app" component={Main}>
          <Route path="/" component={() => <Navigate href="/app/text" />} />
          <Route path="/text" component={ChatContent} />
          <Route path="/voice" component={VoiceContent} />
        </Route>
      </Router>
    </>
  )
}

export default App;
