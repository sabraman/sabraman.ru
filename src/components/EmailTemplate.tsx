import * as React from 'react';

interface EmailTemplateProps {
    name: string;
    email: string;
    message: string;
}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
    name,
    email,
    message,
}) => (
    <div>
        <h1>New Contact Form Message</h1>
        <div>
            <p><strong>From:</strong> {name} ({email})</p>
            <div style={{ marginTop: '20px' }}>
                <strong>Message:</strong>
                <p style={{ whiteSpace: 'pre-wrap' }}>{message}</p>
            </div>
        </div>
    </div>
); 