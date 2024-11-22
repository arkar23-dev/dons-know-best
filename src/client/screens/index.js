import React from "react";
import { Button } from "@ombiel/aek-lib";
import { router } from "../route";

function index() {
  return (
    <div>
      <Button onClick={() => router.goto("/results")}>GO to Results</Button>
    </div>
  );
}

export default index;
