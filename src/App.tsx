import { MotionConfig } from "motion/react";
import React from "react";
import { EnvironmentProvider } from "./context/EnvironmentContext";
import "./lib/fontawesome";
import Routes from "./Routes";

const App: React.FC = () => {
  return (
    <MotionConfig reducedMotion="user">
      <EnvironmentProvider>
        <Routes />
      </EnvironmentProvider>
    </MotionConfig>
  );
};

export default App;
