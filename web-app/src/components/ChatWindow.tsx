import React, { useRef, useEffect } from 'react';
import type { Message } from '../lib/types';
import { ShieldAlert, Bot, User } from 'lucide-react';

interface ChatWindowProps {
    messages: Message[];
}

export const ChatWindow: React.FC<ChatWindowProps> = ({ messages }) => {
    const bottomRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    return (
        <div className="chat-window">
            {messages.length === 0 && (
                <div className="empty-state">
                    <p>No messages yet.</p>
                    <p style={{ fontSize: '0.8em', opacity: 0.7 }}>Start the simulation to receive scam attempts.</p>
                </div>
            )}

            {messages.map((msg) => {
                const isAgent = msg.sender === 'agent';

                return (
                    <div
                        key={msg.id}
                        className={`message-row ${isAgent ? 'agent' : 'scammer'}`}
                    >
                        <div className="message-bubble">
                            <div className="msg-header">
                                {isAgent ? <Bot size={14} /> : <User size={14} />}
                                <span>{msg.sender === 'agent' ? 'Honeypot' : 'Remote User'}</span>
                            </div>

                            <div className="msg-content">
                                {msg.content}
                            </div>

                            {msg.isRedacted && (
                                <div className="redacted-badge">
                                    <ShieldAlert size={10} />
                                    <span>Sensitive Data Redacted</span>
                                </div>
                            )}
                        </div>
                    </div>
                );
            })}
            <div ref={bottomRef} />
        </div>
    );
};
