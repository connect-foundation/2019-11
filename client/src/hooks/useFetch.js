import React, { useState, useEffect } from "react";
import axios from "axios";

const BASE_URL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3000"
    : "http://honeybee.palda.shop";

const initialFetchState = {
  response: null,
  error: null,
  loading: true
};

export const useFetch = path => {
  const [fetchState, setFetchState] = React.useState(initialFetchState);

  React.useEffect(() => {
    let isUnmounted = false;

    const fetchData = async () => {
      try {
        const response = await axios.get(`${BASE_URL}${path}`);
        if (!isUnmounted) {
          setFetchState(state => ({ ...state, response, loading: false }));
        }
      } catch (error) {
        if (!isUnmounted) {
          setFetchState(state => ({ ...state, error }));
        }
      }
    };
    fetchData();

    return () => (isUnmounted = true);
  }, []);

  return fetchState;
};
