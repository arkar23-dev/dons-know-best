import React from "react";
import {
  AekReactRouter,
  RouterView,
  Page,
} from "@ombiel/aek-lib";
import Result from "./screens/results";
import Index from "./screens/index";

export const router = new AekReactRouter();

export function Root() {
  return (
    <RouterView router={router}>
      <Page path="/">
        <Index />
      </Page>
      <Page path="/results">
        <Result />
      </Page>
    </RouterView>
  );
}
