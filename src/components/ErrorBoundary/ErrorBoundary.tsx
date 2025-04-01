import React from "react";
import { FallBackDefault } from "./FallBackDefault/FallBackDefault";

interface ErrorBoundaryProps {
  onError?: (error: Error, info: { componentStack: string }) => void;
  FallbackComponent?: React.ComponentType<{ error: Error }>;
}

export type ErrorBoundaryState = { error: Error | null };
export class ErrorBoundary extends React.Component<
  React.PropsWithRef<React.PropsWithChildren<ErrorBoundaryProps>>,
  ErrorBoundaryState
> {
  constructor(
    props:
      | React.PropsWithChildren<ErrorBoundaryProps>
      | Readonly<React.PropsWithChildren<ErrorBoundaryProps>>
  ) {
    super(props);
    this.state = { error: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    this.props.onError?.(error, errorInfo);
  }

  render() {
    const { error } = this.state;
    const { FallbackComponent } = this.props;
    if (error !== null) {
      if (FallbackComponent) {
        return <FallbackComponent error={error} />;
      }

      return <FallBackDefault error={error} />;
    }
    return this.props.children;
  }
}
