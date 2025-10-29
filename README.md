# 📧 Email Template Library

**6 production-ready email templates built with react-email**

Preview all templates at: http://localhost:3000 (run `npm run dev`)

---

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start preview server
npm run dev  # Opens http://localhost:3000

# Export as HTML
npm run export
```

---

## 📬 Templates

### 1. Welcome Email (`01-welcome.tsx`)

**Use case:** New user onboarding
**Props:**
- `userName` - User's name
- `productName` - Your product name
- `loginUrl` - Link to login page

**Example:**
```tsx
import { WelcomeEmail } from './emails/01-welcome';

const html = await render(
  <WelcomeEmail
    userName="John"
    productName="My App"
    loginUrl="https://myapp.com/login"
  />
);
```

**Copy-paste with Resend:**
```typescript
import { Resend } from 'resend';
import { WelcomeEmail } from './emails/01-welcome';

const resend = new Resend(process.env.RESEND_API_KEY);

await resend.emails.send({
  from: 'hello@yourdomain.com',
  to: 'user@example.com',
  subject: 'Welcome to My App!',
  react: <WelcomeEmail userName="John" productName="My App" />
});
```

---

### 2. Password Reset (`02-password-reset.tsx`)

**Use case:** Password recovery flow
**Props:**
- `userName` - User's name
- `resetUrl` - Password reset link with token
- `expiryTime` - How long link is valid (default: "1 hour")

**Example:**
```tsx
import { PasswordResetEmail } from './emails/02-password-reset';

await resend.emails.send({
  from: 'security@yourdomain.com',
  to: 'user@example.com',
  subject: 'Reset your password',
  react: <PasswordResetEmail
    userName="John"
    resetUrl="https://myapp.com/reset?token=abc123"
    expiryTime="1 hour"
  />
});
```

---

### 3. Receipt/Invoice (`03-receipt.tsx`)

**Use case:** Payment confirmations, order receipts
**Props:**
- `userName` - Customer name
- `orderNumber` - Order ID
- `orderDate` - Purchase date
- `items` - Array of items: `{ name, price, quantity }`
- `subtotal`, `tax`, `total` - Price breakdown

**Example:**
```tsx
import { ReceiptEmail } from './emails/03-receipt';

await resend.emails.send({
  from: 'orders@yourdomain.com',
  to: 'customer@example.com',
  subject: 'Receipt for order #12345',
  react: <ReceiptEmail
    userName="John"
    orderNumber="#12345"
    orderDate="Oct 29, 2025"
    items={[
      { name: 'Product 1', price: '$29.99', quantity: 1 },
      { name: 'Product 2', price: '$49.99', quantity: 2 }
    ]}
    subtotal="$129.97"
    tax="$10.40"
    total="$140.37"
  />
});
```

---

### 4. Notification (`04-notification.tsx`)

**Use case:** Status updates, alerts, system notifications
**Props:**
- `userName` - User's name
- `notificationType` - 'info' | 'success' | 'warning' | 'error'
- `title` - Notification headline
- `message` - Main message
- `actionUrl` - Optional link
- `actionText` - Button text (default: "View Details")

**Example:**
```tsx
import { NotificationEmail } from './emails/04-notification';

await resend.emails.send({
  from: 'notifications@yourdomain.com',
  to: 'user@example.com',
  subject: 'Your build succeeded!',
  react: <NotificationEmail
    userName="John"
    notificationType="success"
    title="Build Succeeded"
    message="Your deployment to production completed successfully."
    actionUrl="https://myapp.com/builds/123"
    actionText="View Build"
  />
});
```

---

### 5. Weekly Digest (`05-weekly-digest.tsx`)

**Use case:** Newsletters, content roundups, weekly summaries
**Props:**
- `userName` - User's name
- `weekNumber` - Week identifier
- `items` - Array of digest items: `{ title, description, url }`
- `unsubscribeUrl` - Unsubscribe link

**Example:**
```tsx
import { WeeklyDigestEmail } from './emails/05-weekly-digest';

await resend.emails.send({
  from: 'newsletter@yourdomain.com',
  to: 'user@example.com',
  subject: 'Your weekly digest - Week 42',
  react: <WeeklyDigestEmail
    userName="John"
    weekNumber="42"
    items={[
      {
        title: 'Top Story #1',
        description: 'This is an interesting story...',
        url: 'https://example.com/story-1'
      },
      {
        title: 'Top Story #2',
        description: 'Another notable event...',
        url: 'https://example.com/story-2'
      }
    ]}
    unsubscribeUrl="https://myapp.com/unsubscribe?token=xyz"
  />
});
```

---

### 6. Verification Code (`06-verification.tsx`)

**Use case:** Email verification, 2FA codes, OTP
**Props:**
- `userName` - User's name
- `verificationCode` - 6-digit code
- `expiryTime` - How long code is valid (default: "15 minutes")

**Example:**
```tsx
import { VerificationEmail } from './emails/06-verification';

await resend.emails.send({
  from: 'security@yourdomain.com',
  to: 'user@example.com',
  subject: 'Your verification code',
  react: <VerificationEmail
    userName="John"
    verificationCode="123456"
    expiryTime="15 minutes"
  />
});
```

---

## 🎨 Customization

All templates use inline styles and can be customized by:

1. **Edit the template file directly**
2. **Override props** (change colors, text, etc.)
3. **Add new props** for your use case

**Example - Custom button color:**
```tsx
// In the template file, add a prop:
interface WelcomeEmailProps {
  // ... existing props
  buttonColor?: string;
}

// Use it in the button style:
const button = {
  backgroundColor: buttonColor || '#0066cc',  // Default blue
  // ... rest of styles
};
```

---

## 📦 Integration Patterns

### With Resend (Recommended)

```typescript
import { Resend } from 'resend';
import { WelcomeEmail } from './emails/01-welcome';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendWelcomeEmail(to: string, userName: string) {
  const { data, error } = await resend.emails.send({
    from: 'hello@yourdomain.com',
    to,
    subject: 'Welcome!',
    react: <WelcomeEmail userName={userName} />
  });

  if (error) {
    throw new Error(`Failed to send email: ${error.message}`);
  }

  return data;
}
```

### With Nodemailer

```typescript
import nodemailer from 'nodemailer';
import { render } from '@react-email/render';
import { WelcomeEmail } from './emails/01-welcome';

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: 587,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  }
});

const html = await render(<WelcomeEmail userName="John" />);

await transporter.sendMail({
  from: 'hello@yourdomain.com',
  to: 'user@example.com',
  subject: 'Welcome!',
  html
});
```

---

## 🔥 Quick Copy-Paste Wrapper

```typescript
// emails/send.ts
import { Resend } from 'resend';
import { ReactElement } from 'react';

const resend = new Resend(process.env.RESEND_API_KEY);

interface SendEmailParams {
  to: string | string[];
  subject: string;
  react: ReactElement;
  from?: string;
}

export async function sendEmail({
  to,
  subject,
  react,
  from = 'hello@yourdomain.com'
}: SendEmailParams) {
  const { data, error } = await resend.emails.send({
    from,
    to,
    subject,
    react
  });

  if (error) {
    console.error('Email sending failed:', error);
    throw new Error(`Failed to send email: ${error.message}`);
  }

  return data;
}

// Usage:
import { sendEmail } from './emails/send';
import { WelcomeEmail } from './emails/01-welcome';

await sendEmail({
  to: 'user@example.com',
  subject: 'Welcome!',
  react: <WelcomeEmail userName="John" />
});
```

---

## 📊 Testing

**Preview in browser:**
```bash
npm run dev
# Visit http://localhost:3000
```

**Export as HTML:**
```bash
npm run export
# HTML files saved to `out/` directory
```

**Test sending (with Resend):**
```typescript
// test-email.ts
import { sendEmail } from './emails/send';
import { WelcomeEmail } from './emails/01-welcome';

await sendEmail({
  to: 'your-email@example.com',
  subject: 'Test Email',
  react: <WelcomeEmail userName="Test User" />
});
```

---

## 🎯 Next Steps

1. **Copy templates to your project**
2. **Install dependencies**: `npm install resend react-email @react-email/components react`
3. **Add environment variable**: `RESEND_API_KEY=re_xxx`
4. **Import and use** in your code
5. **Customize** colors, text, props as needed

---

## 📚 Resources

- [React Email Docs](https://react.email)
- [Resend Docs](https://resend.com/docs)
- [Email Design Best Practices](https://www.goodemailcode.com)

---

**Built with:** react-email + Resend
**Time to integrate:** 15 minutes per template
**Compatibility:** All major email clients (Gmail, Outlook, Apple Mail, etc.)
