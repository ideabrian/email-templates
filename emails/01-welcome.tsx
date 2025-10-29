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

interface WelcomeEmailProps {
  userName?: string;
  productName?: string;
  loginUrl?: string;
}

export const WelcomeEmail = ({
  userName = 'there',
  productName = 'Our Platform',
  loginUrl = 'https://example.com/login',
}: WelcomeEmailProps) => (
  <Html>
    <Head />
    <Preview>Welcome to {productName}! Let's get you started.</Preview>
    <Body style={main}>
      <Container style={container}>
        <Heading style={h1}>Welcome to {productName}!</Heading>
        <Text style={text}>Hi {userName},</Text>
        <Text style={text}>
          Thanks for signing up! We're excited to have you on board.
        </Text>
        <Text style={text}>
          Your account is ready to go. Click the button below to log in and get started:
        </Text>
        <Section style={buttonContainer}>
          <Button style={button} href={loginUrl}>
            Get Started
          </Button>
        </Section>
        <Text style={text}>
          If you have any questions, just reply to this email—we're always happy to help!
        </Text>
        <Text style={footer}>
          Best,
          <br />
          The {productName} Team
        </Text>
      </Container>
    </Body>
  </Html>
);

export default WelcomeEmail;

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

const buttonContainer = {
  padding: '27px 40px',
};

const button = {
  backgroundColor: '#0066cc',
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
