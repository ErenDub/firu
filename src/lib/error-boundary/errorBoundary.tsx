import React, { Component, ErrorInfo, ReactNode } from "react";

import ErrorPage from "./errorPage";
interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
  information: string | null;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    information: null,
  };

  public static getDerivedStateFromError(_: Error): State {
    // Update state so the next render will show the fallback UI.
    // console.log(_);
    return { hasError: true, information: String(_) };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // console.error("Uncaught error:", error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div>
          <ErrorPage information={this.state.information} />
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
