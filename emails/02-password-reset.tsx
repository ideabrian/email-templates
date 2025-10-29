import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Section,
  Text,
} from '@react-email/components';
import * as React from 'react';

interface PasswordResetEmailProps {
  userName?: string;
  resetUrl?: string;
  expiryTime?: string;
}

export const PasswordResetEmail = ({
  userName = 'there',
  resetUrl = 'https://example.com/reset-password?token=abc123',
  expiryTime = '1 hour',
}: PasswordResetEmailProps) => (
  <Html>
    <Head />
    <Preview>Reset your password</Preview>
    <Body style={main}>
      <Container style={container}>
        <Heading style={h1}>Reset Your Password</Heading>
        <Text style={text}>Hi {userName},</Text>
        <Text style={text}>
          We received a request to reset your password. Click the button below to create a new password:
        </Text>
        <Section style={buttonContainer}>
          <Button style={button} href={resetUrl}>
            Reset Password
          </Button>
        </Section>
        <Text style={warning}>
          ⚠️ This link will expire in {expiryTime}.
        </Text>
        <Text style={text}>
          If you didn't request this password reset, you can safely ignore this email. Your password won't change unless you click the button above and create a new one.
        </Text>
        <Text style={footer}>
          Best,
          <br />
          Security Team
        </Text>
      </Container>
    </Body>
  </Html>
);

export default PasswordResetEmail;

// Styles
const main = {
  backgroundColor: '#f6f9fc',
  fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
};

const container = {
  backgroundColor: '#ffffff',
  margin: '0 auto',
  padding: '20px 0 48px',
  marginBottom: '64px',
  maxWidth: '600px',
};

const h1 = {
  color: '#333',
  fontSize: '24px',
  fontWeight: 'bold',
  margin: '40px 0',
  padding: '0 40px',
};

const text = {
  color: '#333',
  fontSize: '16px',
  lineHeight: '26px',
  padding: '0 40px',
};

const warning = {
  color: '#d93025',
  fontSize: '14px',
  lineHeight: '24px',
  padding: '0 40px',
  fontWeight: 'bold',
};

const buttonContainer = {
  padding: '27px 40px',
};

const button = {
  backgroundColor: '#d93025',
  borderRadius: '5px',
  color: '#fff',
  fontSize: '16px',
  fontWeight: 'bold',
  textDecoration: 'none',
  textAlign: 'center' as const,
  display: 'block',
  padding: '12px 20px',
};

const footer = {
  color: '#8898aa',
  fontSize: '14px',
  lineHeight: '24px',
  padding: '0 40px',
  marginTop: '32px',
};
