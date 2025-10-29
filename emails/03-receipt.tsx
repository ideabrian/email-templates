import {
  Body,
  Column,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Preview,
  Row,
  Section,
  Text,
} from '@react-email/components';
import * as React from 'react';

interface ReceiptEmailProps {
  userName?: string;
  orderNumber?: string;
  orderDate?: string;
  items?: Array<{ name: string; price: string; quantity: number }>;
  subtotal?: string;
  tax?: string;
  total?: string;
}

export const ReceiptEmail = ({
  userName = 'Customer',
  orderNumber = '#12345',
  orderDate = 'October 29, 2025',
  items = [
    { name: 'Product 1', price: '$29.99', quantity: 1 },
    { name: 'Product 2', price: '$49.99', quantity: 2 },
  ],
  subtotal = '$129.97',
  tax = '$10.40',
  total = '$140.37',
}: ReceiptEmailProps) => (
  <Html>
    <Head />
    <Preview>Receipt for order {orderNumber}</Preview>
    <Body style={main}>
      <Container style={container}>
        <Heading style={h1}>Thank you for your order!</Heading>
        <Text style={text}>Hi {userName},</Text>
        <Text style={text}>
          Your payment has been received. Here's your receipt for order {orderNumber}:
        </Text>

        <Section style={orderInfo}>
          <Row>
            <Column><Text style={label}>Order Number:</Text></Column>
            <Column><Text style={value}>{orderNumber}</Text></Column>
          </Row>
          <Row>
            <Column><Text style={label}>Order Date:</Text></Column>
            <Column><Text style={value}>{orderDate}</Text></Column>
          </Row>
        </Section>

        <Section style={itemsContainer}>
          <Heading style={h2}>Order Items</Heading>
          {items.map((item, index) => (
            <Row key={index} style={itemRow}>
              <Column style={itemNameCol}>
                <Text style={itemName}>{item.name} × {item.quantity}</Text>
              </Column>
              <Column style={itemPriceCol}>
                <Text style={itemPrice}>{item.price}</Text>
              </Column>
            </Row>
          ))}
          <Hr style={hr} />
          <Row style={totalRow}>
            <Column><Text style={totalLabel}>Subtotal:</Text></Column>
            <Column><Text style={totalValue}>{subtotal}</Text></Column>
          </Row>
          <Row style={totalRow}>
            <Column><Text style={totalLabel}>Tax:</Text></Column>
            <Column><Text style={totalValue}>{tax}</Text></Column>
          </Row>
          <Row style={totalRow}>
            <Column><Text style={totalLabelBold}>Total:</Text></Column>
            <Column><Text style={totalValueBold}>{total}</Text></Column>
          </Row>
        </Section>

        <Text style={footer}>
          Questions? Reply to this email and we'll help you out.
        </Text>
      </Container>
    </Body>
  </Html>
);

export default ReceiptEmail;

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
  margin: '40px 0 20px',
  padding: '0 40px',
};

const h2 = {
  color: '#333',
  fontSize: '18px',
  fontWeight: 'bold',
  margin: '0 0 10px',
};

const text = {
  color: '#333',
  fontSize: '16px',
  lineHeight: '26px',
  padding: '0 40px',
};

const orderInfo = {
  padding: '20px 40px',
  backgroundColor: '#f6f9fc',
  borderRadius: '5px',
  margin: '20px 40px',
};

const label = {
  color: '#666',
  fontSize: '14px',
  margin: '5px 0',
};

const value = {
  color: '#333',
  fontSize: '14px',
  fontWeight: 'bold',
  margin: '5px 0',
  textAlign: 'right' as const,
};

const itemsContainer = {
  padding: '20px 40px',
};

const itemRow = {
  marginBottom: '10px',
};

const itemNameCol = {
  width: '70%',
};

const itemPriceCol = {
  width: '30%',
  textAlign: 'right' as const,
};

const itemName = {
  color: '#333',
  fontSize: '14px',
  margin: '0',
};

const itemPrice = {
  color: '#333',
  fontSize: '14px',
  fontWeight: 'bold',
  margin: '0',
};

const hr = {
  borderColor: '#e6ebf1',
  margin: '20px 0',
};

const totalRow = {
  marginBottom: '5px',
};

const totalLabel = {
  color: '#666',
  fontSize: '14px',
  margin: '0',
};

const totalValue = {
  color: '#333',
  fontSize: '14px',
  margin: '0',
  textAlign: 'right' as const,
};

const totalLabelBold = {
  color: '#333',
  fontSize: '16px',
  fontWeight: 'bold',
  margin: '0',
};

const totalValueBold = {
  color: '#333',
  fontSize: '16px',
  fontWeight: 'bold',
  margin: '0',
  textAlign: 'right' as const,
};

const footer = {
  color: '#8898aa',
  fontSize: '14px',
  lineHeight: '24px',
  padding: '0 40px',
  marginTop: '32px',
};
