import React from "react";

import { Helmet } from "react-helmet-async";

export const Seo = ({ title, description, type, name }) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
    </Helmet>
  );
};
