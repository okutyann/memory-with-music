import React from "react";
import { Loader } from "@mantine/core";
import { Lang } from "@components/layout/language/Lang";
import { ColorTheme } from "@components/layout/theme/ColorTheme";
import { Router } from "@components/layout/router/Router";

type Props = {
  onClick: () => void;
  color: "dark" | "light";
};

export const Header: React.FC<Props> = ({ onClick, color }) => {
  return (
    <div>
      <div className="mt-2 flex justify-center xs:justify-end">
        <Router />
      </div>
      <div className="pt-15 md:pt-18 flex justify-center">
        <h1 className="pr-2 pb-2 text-center italic hover:not-italic">
          memory with music
        </h1>
        <Loader color="cyan" size="sm" variant="bars" />
      </div>
      <div className="flex justify-center">
        <ColorTheme onClick={() => onClick()} color={color} />
      </div>
      <div className="m-2 flex justify-end">
        <Lang />
      </div>
    </div>
  );
};
