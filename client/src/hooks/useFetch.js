import React, { useState, useEffect } from "react";
import axios from "axios";

export const useFetch = url => {
  const [response, setResponse] = React.useState();
  const [error, setError] = React.useState();
  const [loading, setLoading] = React.useState();

  React.useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await axios.get(url);
        setResponse(res);
        setLoading(false);
      } catch (error) {
        setError(error);
      }
    };
    fetchData();
  }, []);
  return { response, error, loading };
};
