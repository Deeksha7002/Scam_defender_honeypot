import { Component, type ErrorInfo, type ReactNode } from 'react';
import { AlertTriangle } from 'lucide-react';

interface Props {
    children?: ReactNode;
}

interface State {
    hasError: boolean;
    error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
    public state: State = {
        hasError: false,
        error: null
    };

    public static getDerivedStateFromError(error: Error): State {
        return { hasError: true, error };
    }

    public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error("Uncaught error:", error, errorInfo);
    }

    public render() {
        if (this.state.hasError) {
            return (
                <div style={{
                    height: '100vh',
                    width: '100vw',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: '#0f172a',
                    color: '#e2e8f0',
                    padding: '2rem',
                    textAlign: 'center'
                }}>
                    <AlertTriangle size={64} style={{ color: '#ef4444', marginBottom: '1.5rem' }} />
                    <h1 style={{ fontSize: '2rem', marginBottom: '1rem' }}>System Critical Failure</h1>
                    <p style={{ maxWidth: '600px', marginBottom: '2rem', color: '#94a3b8' }}>
                        The defense system encountered an unexpected error during initialization.
                    </p>
                    <div style={{
                        background: '#1e293b',
                        padding: '1rem',
                        borderRadius: '0.5rem',
                        fontFamily: 'monospace',
                        textAlign: 'left',
                        maxWidth: '800px',
                        overflow: 'auto',
                        marginBottom: '2rem'
                    }}>
                        {this.state.error?.toString()}
                    </div>
                    <button
                        onClick={() => window.location.reload()}
                        style={{
                            background: '#3b82f6',
                            color: 'white',
                            border: 'none',
                            padding: '0.75rem 1.5rem',
                            borderRadius: '0.5rem',
                            fontSize: '1rem',
                            cursor: 'pointer',
                            fontWeight: 'bold'
                        }}
                    >
                        REBOOT SYSTEM
                    </button>
                </div>
            );
        }

        return this.props.children;
    }
}
