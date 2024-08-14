import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import { store } from "./store";
import * as Sentry from "@sentry/react";

Sentry.init({
  dsn: "https://2b40a7e129417643627963bd11e55402@o4507158840999936.ingest.us.sentry.io/4507158845325312",
  integrations: [
    Sentry.browserTracingIntegration(),
    Sentry.replayIntegration(),
  ],
  // Performance Monitoring
  tracesSampleRate: 1.0, //  Capture 100% of the transactions
  // Set 'tracePropagationTargets' to control for which URLs distributed tracing should be enabled
  tracePropagationTargets: ["localhost", /^https:\/\/yourserver\.io\/api/],
  // Session Replay
  replaysSessionSampleRate: 0.1, // This sets the sample rate at 10%. You may want to change it to 100% while in development and then sample at a lower rate in production.
  replaysOnErrorSampleRate: 1.0,
});

const rootEl = document.getElementById("root");
const root = createRoot(rootEl);

const render = () => {
  // 동적으로 App component 가져오기
  // react component tree에서 변경사항이 있을 때 이를 반영하기 위함
  // eslint-disable-next-line global-require
  const App = require("./App").default;
  root.render(
    <Provider store={store}>
      <App />
    </Provider>
  );
};
render();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
