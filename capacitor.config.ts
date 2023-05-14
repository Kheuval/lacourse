import { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "com.lacourse",
  appName: "lacourse",
  webDir: "dist",
  server: {
    androidScheme: "https",
  },
  android: {
    buildOptions: {
      keystorePath: "/home/kheuval/projects/lacourse/my-release-key.keystore",
      keystoreAlias: "alias_name",
    },
  },
};

export default config;
