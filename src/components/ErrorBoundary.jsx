import { Component } from "react";

export class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({ errorInfo });
    console.error("ErrorBoundary caught an error:", error, errorInfo);
  }

  handleReload = () => {
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      const isDev = Boolean(import.meta.env?.DEV);
      const errorMessage =
        this.state.error?.message || String(this.state.error || "Unknown error");

      return (
        <div
          style={{
            minHeight: "100vh",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "24px",
            boxSizing: "border-box",
            backgroundColor: "#0a0a0a",
            backgroundImage:
              "radial-gradient(circle at center, #1a1a1a 0%, #0a0a0a 100%)",
            color: "#f8fafc",
            textAlign: "center",
            fontFamily:
              "'Outfit', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
          }}
        >
          <div
            style={{
              maxWidth: "540px",
              width: "100%",
              padding: "36px 28px",
              background: "rgba(20, 20, 20, 0.65)",
              border: "1px solid rgba(255, 255, 255, 0.14)",
              borderRadius: "16px",
              backdropFilter: "blur(12px)",
              WebkitBackdropFilter: "blur(12px)",
              boxShadow: "0 10px 30px rgba(0, 0, 0, 0.5)",
              boxSizing: "border-box"
            }}
          >
            <h1
              style={{
                fontSize: "1.85rem",
                fontWeight: 700,
                color: "#f8fafc",
                margin: "0 0 12px",
                lineHeight: 1.3
              }}
            >
              Something went wrong
            </h1>
            <p
              style={{
                fontSize: "1rem",
                lineHeight: 1.6,
                color: "#cbd5e1",
                margin: "0 0 24px"
              }}
            >
              Please reload the page, or contact me at{" "}
              <a
                href="mailto:sarveshdivgi@gmail.com"
                style={{
                  color: "#60a5fa",
                  textDecoration: "underline",
                  wordBreak: "break-all"
                }}
              >
                sarveshdivgi@gmail.com
              </a>{" "}
              if the problem persists.
            </p>
            <div
              style={{
                display: "flex",
                gap: "12px",
                justifyContent: "center",
                flexWrap: "wrap",
                marginBottom: "16px"
              }}
            >
              <button
                type="button"
                onClick={this.handleReload}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: "11px 24px",
                  borderRadius: "8px",
                  fontSize: "14px",
                  fontWeight: 600,
                  cursor: "pointer",
                  border: "1px solid rgba(255, 255, 255, 0.2)",
                  background: "rgba(96, 165, 250, 0.15)",
                  color: "#ffffff",
                  transition: "all 0.2s ease"
                }}
              >
                Reload page
              </button>
            </div>
            {errorMessage && (
              <div
                style={{
                  fontSize: "0.82rem",
                  color: "#94a3b8",
                  marginTop: "16px",
                  wordBreak: "break-word",
                  fontFamily: "monospace",
                  background: "rgba(0, 0, 0, 0.3)",
                  padding: "8px 12px",
                  borderRadius: "6px",
                  border: "1px solid rgba(255, 255, 255, 0.05)"
                }}
              >
                {errorMessage}
              </div>
            )}
            {isDev && this.state.errorInfo?.componentStack && (
              <pre
                style={{
                  fontSize: "0.75rem",
                  color: "#ef4444",
                  textAlign: "left",
                  maxHeight: "150px",
                  overflowY: "auto",
                  marginTop: "12px",
                  padding: "8px",
                  background: "rgba(0, 0, 0, 0.5)",
                  borderRadius: "6px"
                }}
              >
                {this.state.errorInfo.componentStack}
              </pre>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export class SectionErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error(
      `SectionErrorBoundary [${this.props.sectionName || "Section"}] caught error:`,
      error,
      errorInfo
    );
  }

  handleReload = () => {
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div
          style={{
            maxWidth: "600px",
            margin: "40px auto",
            padding: "24px 20px",
            background: "rgba(20, 20, 20, 0.5)",
            border: "1px solid rgba(255, 255, 255, 0.12)",
            borderRadius: "14px",
            backdropFilter: "blur(12px)",
            WebkitBackdropFilter: "blur(12px)",
            textAlign: "center",
            color: "#cbd5e1",
            boxSizing: "border-box"
          }}
        >
          <p style={{ margin: "0 0 14px", fontSize: "15px", color: "#f8fafc" }}>
            This section failed to load.
          </p>
          <button
            type="button"
            onClick={this.handleReload}
            style={{
              padding: "8px 18px",
              borderRadius: "8px",
              fontSize: "13px",
              fontWeight: 600,
              cursor: "pointer",
              border: "1px solid rgba(255, 255, 255, 0.2)",
              background: "rgba(96, 165, 250, 0.15)",
              color: "#ffffff"
            }}
          >
            Reload
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
