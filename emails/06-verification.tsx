import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Section,
  Text,
} from '@react-email/components';
import * as React from 'react';

interface VerificationEmailProps {
  userName?: string;
  verificationCode?: string;
  expiryTime?: string;
}

export const VerificationEmail = ({
  userName = 'there',
  verificationCode = '123456',
  expiryTime = '15 minutes',
}: VerificationEmailProps) => (
  <Html>
    <Head />
    <Preview>Your verification code: {verificationCode}</Preview>
    <Body style={main}>
      <Container style={container}>
        <Heading style={h1}>Verify Your Email</Heading>
        <Text style={text}>Hi {userName},</Text>
        <Text style={text}>
          Thanks for signing up! Please use the code below to verify your email address:
        </Text>
        <Section style={codeContainer}>
          <Text style={code}>{verificationCode}</Text>
        </Section>
        <Text style={warning}>
          ⏱️ This code will expire in {expiryTime}.
        </Text>
        <Text style={text}>
          If you didn't request this code, you can safely ignore this email.
        </Text>
        <Text style={footer}>
          Security tip: Never share this code with anyone. We'll never ask for it via phone or email.
        </Text>
      </Container>
    </Body>
  </Html>
);

export default VerificationEmail;

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

const codeContainer = {
  backgroundColor: '#f6f9fc',
  borderRadius: '8px',
  margin: '30px 40px',
  padding: '40px 20px',
  textAlign: 'center' as const,
  border: '2px dashed #0066cc',
};

const code = {
  color: '#0066cc',
  fontSize: '40px',
  fontWeight: 'bold',
  letterSpacing: '8px',
  margin: '0',
  fontFamily: 'Monaco, "Courier New", monospace',
};

const warning = {
  color: '#f4b400',
  fontSize: '14px',
  lineHeight: '24px',
  padding: '0 40px',
  fontWeight: 'bold',
  marginTop: '20px',
};

const footer = {
  color: '#8898aa',
  fontSize: '12px',
  lineHeight: '20px',
  padding: '0 40px',
  marginTop: '32px',
  backgroundColor: '#f6f9fc',
  padding: '20px 40px',
  borderRadius: '5px',
  margin: '32px 40px 0',
};
