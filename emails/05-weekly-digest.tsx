import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Preview,
  Section,
  Text,
} from '@react-email/components';
import * as React from 'react';

interface DigestItem {
  title: string;
  description: string;
  url: string;
}

interface WeeklyDigestEmailProps {
  userName?: string;
  weekNumber?: string;
  items?: DigestItem[];
  unsubscribeUrl?: string;
}

export const WeeklyDigestEmail = ({
  userName = 'there',
  weekNumber = '42',
  items = [
    {
      title: 'Top Story #1',
      description: 'This is an interesting story that happened this week.',
      url: 'https://example.com/story-1',
    },
    {
      title: 'Top Story #2',
      description: 'Another notable event from the past 7 days.',
      url: 'https://example.com/story-2',
    },
    {
      title: 'Top Story #3',
      description: 'Don't miss this trending topic from the community.',
      url: 'https://example.com/story-3',
    },
  ],
  unsubscribeUrl = 'https://example.com/unsubscribe',
}: WeeklyDigestEmailProps) => (
  <Html>
    <Head />
    <Preview>Your weekly digest - Week {weekNumber}</Preview>
    <Body style={main}>
      <Container style={container}>
        <Heading style={h1}>📬 Your Weekly Digest</Heading>
        <Text style={subtitle}>Week {weekNumber}</Text>
        <Text style={text}>Hi {userName},</Text>
        <Text style={text}>
          Here are the top highlights from this week:
        </Text>

        <Section style={digestContainer}>
          {items.map((item, index) => (
            <div key={index}>
              <Section style={itemContainer}>
                <Heading style={itemTitle}>{item.title}</Heading>
                <Text style={itemDescription}>{item.description}</Text>
                <Button style={itemButton} href={item.url}>
                  Read More →
                </Button>
              </Section>
              {index < items.length - 1 && <Hr style={hr} />}
            </div>
          ))}
        </Section>

        <Text style={footer}>
          That's all for this week! See you next time.
        </Text>

        <Hr style={hr} />

        <Text style={unsubscribe}>
          <a href={unsubscribeUrl} style={unsubscribeLink}>
            Unsubscribe from these emails
          </a>
        </Text>
      </Container>
    </Body>
  </Html>
);

export default WeeklyDigestEmail;

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
  fontSize: '28px',
  fontWeight: 'bold',
  margin: '40px 0 10px',
  padding: '0 40px',
};

const subtitle = {
  color: '#666',
  fontSize: '14px',
  margin: '0 0 20px',
  padding: '0 40px',
  textTransform: 'uppercase' as const,
  letterSpacing: '1px',
};

const text = {
  color: '#333',
  fontSize: '16px',
  lineHeight: '26px',
  padding: '0 40px',
};

const digestContainer = {
  padding: '20px 40px',
};

const itemContainer = {
  marginBottom: '20px',
};

const itemTitle = {
  color: '#333',
  fontSize: '18px',
  fontWeight: 'bold',
  margin: '0 0 10px',
};

const itemDescription = {
  color: '#666',
  fontSize: '14px',
  lineHeight: '22px',
  margin: '0 0 15px',
};

const itemButton = {
  backgroundColor: '#0066cc',
  borderRadius: '5px',
  color: '#fff',
  fontSize: '14px',
  fontWeight: 'bold',
  textDecoration: 'none',
  textAlign: 'center' as const,
  display: 'inline-block',
  padding: '10px 20px',
};

const hr = {
  borderColor: '#e6ebf1',
  margin: '20px 0',
};

const footer = {
  color: '#8898aa',
  fontSize: '14px',
  lineHeight: '24px',
  padding: '0 40px',
  marginTop: '32px',
};

const unsubscribe = {
  color: '#8898aa',
  fontSize: '12px',
  lineHeight: '20px',
  padding: '0 40px',
  marginTop: '20px',
  textAlign: 'center' as const,
};

const unsubscribeLink = {
  color: '#8898aa',
  textDecoration: 'underline',
};
