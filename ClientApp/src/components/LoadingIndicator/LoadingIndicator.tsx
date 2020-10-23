import React from "react";

export interface LoadingIndicatorProps {
  loading: boolean;
}

export const LoadingIndicator = ({ loading }: LoadingIndicatorProps) => {
  return (
    <div className="loading-indicator">
      {loading && <i className="fa fa-spinner fa-spin"></i>}
    </div>
  );
};
