"use client";

import * as React from "react";
import { ErrorState } from "@/components/shared/error-state";
import { Container } from "@/components/shared/container";

export default function ErrorBoundaryPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  React.useEffect(() => {
    // Log error to analytics or telemetry
    console.error("Route Render Error:", error);
  }, [error]);

  return (
    <Container className="py-24">
      <ErrorState
        title="Engineering Systems Malfunction"
        error={error}
        reset={reset}
      />
    </Container>
  );
}
