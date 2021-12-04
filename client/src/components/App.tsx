import React from "react";
import { BrowserRouter } from "react-router-dom";
import "aos/dist/aos.css";

import Page from "./common/Page";
import Routes from "./Routes/Routes";

const App: React.FC = () => {
  return (
    <Page>
      <BrowserRouter>
        <Routes />
      </BrowserRouter>
    </Page>
  );
};

export default App;

// const mapStateToProps = ({
//   cryptoInfo,
// }: StoreState): { cryptoInfo: CryptoInfo[] } => {
//   return { cryptoInfo };
// };

// export const App = connect(mapStateToProps, { fetchCryptoInfo })(_App);
