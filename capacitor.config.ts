import { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "com.lacourse",
  appName: "lacourse",
  webDir: "dist",
  server: {
    androidScheme: "https",
  },
};

export default config;
