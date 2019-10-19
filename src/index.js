import React from "react";
import ReactDOM from "react-dom";
import { createStore, applyMiddleware, compose } from "redux";
import { Provider } from "react-redux";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import rootReducer from "./reducers";
import backend from "middlewares/backend";
import triggers from "middlewares/triggers";
import history from "./history";
import router from "./routes";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(backend, triggers))
);

const render = location =>
  router.resolve(location).then(component =>
    ReactDOM.render(
      <Provider store={store}>
        <App>{component}</App>
      </Provider>,
      document.getElementById("root")
    )
  );

render(history.location);
history.listen(location => render(location));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
