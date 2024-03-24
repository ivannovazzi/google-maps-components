import { useCallback, useState } from "react";
import DataProvider from "./DataProvider";
import { APIProvider } from "@vis.gl/react-google-maps";

export default function AppWrapper() {
  const params = new URLSearchParams(window.location.search);
  const defaultApiKey =
    params.get("apiKey") || localStorage.getItem("apiKey") || "";
  const [apiKey, setApiKey] = useState(defaultApiKey);
  const onApiKeyChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setApiKey(value);
      localStorage.setItem("apiKey", value);
    },
    []
  );

  return (
    <div className="app-wrapper">
      <div>
        <input
          id="api-key"
          placeholder="YOUR GOOGLE MAP API KEY"
          value={apiKey}
          onChange={onApiKeyChange}
        />
      </div>
      {apiKey && (
        <APIProvider apiKey={apiKey}>
          <DataProvider />
        </APIProvider>
      )}
    </div>
  );
}
