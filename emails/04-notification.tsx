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

interface NotificationEmailProps {
  userName?: string;
  notificationType?: 'info' | 'success' | 'warning' | 'error';
  title?: string;
  message?: string;
  actionUrl?: string;
  actionText?: string;
}

export const NotificationEmail = ({
  userName = 'there',
  notificationType = 'info',
  title = 'Something happened',
  message = 'We wanted to let you know about this update.',
  actionUrl = 'https://example.com/dashboard',
  actionText = 'View Details',
}: NotificationEmailProps) => {
  const colors = {
    info: '#0066cc',
    success: '#0f9d58',
    warning: '#f4b400',
    error: '#d93025',
  };

  const icons = {
    info: 'ℹ️',
    success: '✅',
    warning: '⚠️',
    error: '❌',
  };

  return (
    <Html>
      <Head />
      <Preview>{title}</Preview>
      <Body style={main}>
        <Container style={container}>
          <Section style={{ ...notificationBanner, backgroundColor: colors[notificationType] }}>
            <Text style={icon}>{icons[notificationType]}</Text>
          </Section>
          <Heading style={h1}>{title}</Heading>
          <Text style={text}>Hi {userName},</Text>
          <Text style={text}>{message}</Text>
          {actionUrl && actionText && (
            <Section style={buttonContainer}>
              <Button style={{ ...button, backgroundColor: colors[notificationType] }} href={actionUrl}>
                {actionText}
              </Button>
            </Section>
          )}
          <Text style={footer}>
            This is an automated notification. You can manage your notification preferences in your account settings.
          </Text>
        </Container>
      </Body>
    </Html>
  );
};

export default NotificationEmail;

// Styles
const main = {
  backgroundColor: '#f6f9fc',
  fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
};

const container = {
  backgroundColor: '#ffffff',
  margin: '0 auto',
  padding: '0',
  marginBottom: '64px',
  maxWidth: '600px',
};

const notificationBanner = {
  padding: '30px',
  textAlign: 'center' as const,
};

const icon = {
  fontSize: '40px',
  margin: '0',
};

const h1 = {
  color: '#333',
  fontSize: '24px',
  fontWeight: 'bold',
  margin: '40px 0 20px',
  padding: '0 40px',
};

const text = {
  color: '#333',
  fontSize: '16px',
  lineHeight: '26px',
  padding: '0 40px',
  marginBottom: '16px',
};

const buttonContainer = {
  padding: '27px 40px',
};

const button = {
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
  fontSize: '12px',
  lineHeight: '20px',
  padding: '0 40px',
  marginTop: '32px',
  marginBottom: '40px',
};
