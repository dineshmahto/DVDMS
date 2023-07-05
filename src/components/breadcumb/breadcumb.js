import Breadcrumbs from "@mui/material/Breadcrumbs";
import { emphasize, styled } from "@mui/material/styles";
import Chip from "@mui/material/Chip";

import React from "react";

const StyledBreadcrumb = styled(Chip)(({ theme }) => {
  const backgroundColor =
    theme.palette.mode === "light"
      ? theme.palette.grey[100]
      : theme.palette.grey[800];
  return {
    backgroundColor,
    height: theme.spacing(4),
    color: "#000000",
    fontWeight: theme.typography.fontWeightRegular,
    "&:hover, &:focus": {
      backgroundColor: "#FFA500",
      color: "#FFFFFF",
    },
    "&:active": {
      boxShadow: theme.shadows[1],
      backgroundColor: emphasize(backgroundColor, 0.12),
    },
  };
});
export default function NextBreadcrumbs() {
  function Crumb({ text, href, last = false }) {
    if (last) {
      return <StyledBreadcrumb component="a" label={text} />;
    }
    return <StyledBreadcrumb component="a" href={href} label={text} />;
  }
  function generateBreadcrumbs() {
    const asPathWithoutQuery = window?.location.pathname.split("?")[0];
    const asPathNestedRoutes = asPathWithoutQuery
      .split("/")
      .filter((v) => v.length > 0);
    const crumblist = asPathNestedRoutes.map((subpath, idx) => {
      const href = "/" + asPathNestedRoutes.slice(0, idx + 1).join("/");
      const text = subpath;
      return { href, text };
    });
    return [{ href: "/", text: "Dashboard" }, ...crumblist];
  }
  const breadcrumbs = generateBreadcrumbs();

  return (
    <Breadcrumbs aria-label="breadcrumb" className="mb-2">
      {breadcrumbs.map((crumb, idx) => (
        <Crumb {...crumb} key={idx} last={idx === breadcrumbs.length - 1} />
      ))}
    </Breadcrumbs>
  );
}
