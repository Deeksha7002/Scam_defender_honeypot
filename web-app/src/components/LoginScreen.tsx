import React, { useState } from 'react';
import { ShieldCheck, Fingerprint, Lock, ChevronRight, Eye, EyeOff } from 'lucide-react';
import '../index.css';

interface LoginScreenProps {
    onLogin: (username: string) => void;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({ onLogin }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        // Basic validation
        if (!username.trim() || !password.trim()) {
            setError('CREDENTIALS REQUIRED');
            return;
        }

        setIsLoading(true);

        // Simulate network delay for effect
        setTimeout(() => {
            // Mock auth logic
            if (password.length > 0) {
                setIsLoading(false);
                onLogin(username);
            } else {
                setIsLoading(false);
                setError('ACCESS DENIED');
            }
        }, 1200);
    };

    return (
        <div className="login-container" style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100vh',
            background: '#0a0a0a',
            color: '#e0e0e0',
            fontFamily: 'monospace',
            position: 'relative',
            overflow: 'hidden'
        }}>
            {/* Background Grid */}
            <div style={{
                position: 'absolute',
                inset: 0,
                backgroundImage: 'linear-gradient(rgba(0, 255, 65, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 255, 65, 0.03) 1px, transparent 1px)',
                backgroundSize: '20px 20px',
                pointerEvents: 'none'
            }}></div>

            <div className="login-card" style={{
                width: '400px',
                padding: '2rem',
                background: 'rgba(20, 20, 25, 0.9)',
                border: '1px solid #333',
                borderRadius: '8px',
                boxShadow: '0 0 20px rgba(0, 0, 0, 0.5)',
                position: 'relative',
                zIndex: 10
            }}>
                <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                    <div style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: '64px',
                        height: '64px',
                        borderRadius: '50%',
                        background: 'rgba(0, 255, 65, 0.1)',
                        marginBottom: '1rem',
                        border: '1px solid rgba(0, 255, 65, 0.3)'
                    }}>
                        <ShieldCheck size={32} color="#00ff41" />
                    </div>
                    <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold', margin: '0', letterSpacing: '2px', color: '#fff' }}>
                        SCAM<span style={{ color: '#00ff41' }}>DEFENDER</span>
                    </h1>
                    <p style={{ fontSize: '0.8rem', color: '#888', marginTop: '0.5rem' }}>AUTHORIZED PERSONNEL ONLY</p>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="form-group" style={{ marginBottom: '1.5rem' }}>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.8rem', color: '#888' }}>OPERATOR ID</label>
                        <div style={{ position: 'relative' }}>
                            <input
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                autoFocus
                                style={{
                                    width: '100%',
                                    padding: '10px 10px 10px 40px',
                                    background: 'rgba(0, 0, 0, 0.5)',
                                    border: '1px solid #333',
                                    borderRadius: '4px',
                                    color: '#fff',
                                    fontFamily: 'monospace',
                                    outline: 'none'
                                }}
                                placeholder="Enter ID..."
                            />
                            <Fingerprint size={18} color="#555" style={{ position: 'absolute', left: '12px', top: '12px' }} />
                        </div>
                    </div>

                    <div className="form-group" style={{ marginBottom: '2rem' }}>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.8rem', color: '#888' }}>ACCESS CODE</label>
                        <div style={{ position: 'relative' }}>
                            <input
                                type={showPassword ? 'text' : 'password'}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                style={{
                                    width: '100%',
                                    padding: '10px 40px 10px 40px',
                                    background: 'rgba(0, 0, 0, 0.5)',
                                    border: '1px solid #333',
                                    borderRadius: '4px',
                                    color: '#fff',
                                    fontFamily: 'monospace',
                                    outline: 'none'
                                }}
                                placeholder="••••••••"
                            />
                            <Lock size={18} color="#555" style={{ position: 'absolute', left: '12px', top: '12px' }} />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                style={{
                                    position: 'absolute',
                                    right: '10px',
                                    top: '10px',
                                    background: 'none',
                                    border: 'none',
                                    cursor: 'pointer',
                                    color: '#555',
                                    padding: 0
                                }}
                            >
                                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                            </button>
                        </div>
                    </div>

                    {error && (
                        <div style={{
                            background: 'rgba(239, 68, 68, 0.1)',
                            border: '1px solid #ef4444',
                            color: '#ef4444',
                            padding: '0.5rem',
                            borderRadius: '4px',
                            fontSize: '0.8rem',
                            textAlign: 'center',
                            marginBottom: '1.5rem'
                        }}>
                            ⚠ {error}
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={isLoading}
                        style={{
                            width: '100%',
                            padding: '12px',
                            background: isLoading ? '#333' : '#00ff41',
                            color: isLoading ? '#888' : '#000',
                            border: 'none',
                            borderRadius: '4px',
                            fontWeight: 'bold',
                            cursor: isLoading ? 'not-allowed' : 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '0.5rem',
                            transition: 'all 0.2s'
                        }}
                    >
                        {isLoading ? (
                            <span>VERIFYING...</span>
                        ) : (
                            <>
                                <Lock size={18} />
                                <span>AUTHENTICATE</span>
                                <ChevronRight size={18} />
                            </>
                        )}
                    </button>
                </form>

                <div style={{
                    marginTop: '2rem',
                    textAlign: 'center',
                    fontSize: '0.7rem',
                    color: '#555',
                    borderTop: '1px solid #222',
                    paddingTop: '1rem'
                }}>
                    SECURE CONNECTION ESTABLISHED • AES-256 ENCRYPTED
                </div>
            </div>
        </div>
    );
};
