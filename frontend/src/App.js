import { Provider } from "react-redux";
import Router from "./router";
import { store } from "./store/store";

const AppRoot = () => {
  return <Router />;
};

function App() {
  return (
    <Provider store={store}>
      <AppRoot />
    </Provider>
  );
}

export default App;
