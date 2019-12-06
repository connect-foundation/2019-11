import React, { useState, useEffect } from "react";
import apiConfig from "../config/api";
import axios from "axios";

const { apiUrl } = apiConfig;
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
        const response = await axios.get(`${apiUrl}${path}`);
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
