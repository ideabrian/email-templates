# 🚀 Getting Started from Zero

**Complete guide to go from "I have nothing" to "I'm sending beautiful emails"**

Time: 15 minutes

---

## Step 1: Clone the Email Templates (2 minutes)

```bash
# Clone from GitHub
git clone https://github.com/ideabrian/email-templates.git
cd email-templates
```

**Or download:** https://github.com/ideabrian/email-templates/archive/refs/heads/master.zip

**Copy templates to your project:**

```bash
# Option A: Copy all 6 templates
cp -r emails /your-project/

# Option B: Copy just one template
cp emails/01-welcome.tsx /your-project/emails/
```

**What you just got:**
- 6 `.tsx` files with email templates
- Each file is a React component
- TypeScript types included

---

## Step 2: Install Dependencies (1 minute)

```bash
cd /your-project
npm install resend react-email @react-email/components react
```

**What these do:**
- `resend` - Sends the emails (modern, fast, free tier)
- `react-email` - Converts React → HTML emails
- `@react-email/components` - Email-safe React components (Button, Text, etc.)
- `react` - Required for JSX

---

## Step 3: Get a Resend API Key (2 minutes)

1. Go to https://resend.com/signup
2. Sign up (free - 100 emails/day, 3,000/month)
3. Create API key: https://resend.com/api-keys
4. Copy the key (starts with `re_`)

**Add to your `.env` file:**
```bash
RESEND_API_KEY=re_your_key_here
```

---

## Step 4: Send Your First Email (5 minutes)

Create `send-email.ts` in your project:

```typescript
import { Resend } from 'resend';
import { WelcomeEmail } from './emails/01-welcome';

const resend = new Resend(process.env.RESEND_API_KEY);

async function sendWelcomeEmail() {
  const { data, error } = await resend.emails.send({
    from: 'onboarding@resend.dev', // Use this for testing
    to: 'your-email@example.com',   // YOUR email here!
    subject: 'Welcome to My App!',
    react: WelcomeEmail({
      userName: 'Test User',
      productName: 'My App',
      loginUrl: 'https://example.com/login'
    })
  });

  if (error) {
    console.error('Failed to send:', error);
    return;
  }

  console.log('Email sent!', data);
}

sendWelcomeEmail();
```

**Run it:**
```bash
npx tsx send-email.ts
# Or with ts-node: npx ts-node send-email.ts
# Or compile first: tsc send-email.ts && node send-email.js
```

**Check your inbox!** You should receive a beautiful welcome email.

---

## Step 5: Use It in Your App (5 minutes)

### In an API endpoint (Next.js, Express, Hono, etc.):

```typescript
// app/api/send-welcome/route.ts (Next.js)
import { Resend } from 'resend';
import { WelcomeEmail } from '@/emails/01-welcome';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  const { email, name } = await request.json();

  const { data, error } = await resend.emails.send({
    from: 'hello@yourdomain.com',
    to: email,
    subject: 'Welcome!',
    react: WelcomeEmail({
      userName: name,
      productName: 'My App'
    })
  });

  if (error) {
    return Response.json({ error }, { status: 500 });
  }

  return Response.json({ success: true, data });
}
```

### In a signup flow:

```typescript
// After user signs up
import { sendWelcomeEmail } from './emails/send-welcome';

async function handleSignup(email: string, name: string) {
  // 1. Create user in database
  const user = await db.users.create({ email, name });

  // 2. Send welcome email
  await sendWelcomeEmail(email, name);

  // 3. Return success
  return { success: true, user };
}
```

---

## ✅ You're Done!

You can now:
- ✅ Send beautiful emails
- ✅ Use any of the 6 templates
- ✅ Customize with props
- ✅ Preview before sending (see below)

---

## 🎨 Bonus: Preview Emails Before Sending

Want to see what the email looks like before sending?

```bash
# In the email-templates directory
npm run dev
```

Opens preview server at http://localhost:3000 where you can:
- View all templates
- Edit props live
- Test in different email clients
- Export as HTML

---

## 📋 Common Use Cases

### Use Case #1: Password Reset

```typescript
import { PasswordResetEmail } from './emails/02-password-reset';

async function sendPasswordReset(email: string, resetToken: string) {
  const resetUrl = `https://myapp.com/reset-password?token=${resetToken}`;

  await resend.emails.send({
    from: 'security@yourdomain.com',
    to: email,
    subject: 'Reset your password',
    react: PasswordResetEmail({
      userName: 'User',
      resetUrl,
      expiryTime: '1 hour'
    })
  });
}
```

### Use Case #2: Order Receipt

```typescript
import { ReceiptEmail } from './emails/03-receipt';

async function sendReceipt(order) {
  await resend.emails.send({
    from: 'orders@yourdomain.com',
    to: order.customerEmail,
    subject: `Receipt for order ${order.number}`,
    react: ReceiptEmail({
      userName: order.customerName,
      orderNumber: order.number,
      orderDate: order.date,
      items: order.items, // [{ name, price, quantity }]
      subtotal: order.subtotal,
      tax: order.tax,
      total: order.total
    })
  });
}
```

### Use Case #3: Weekly Newsletter

```typescript
import { WeeklyDigestEmail } from './emails/05-weekly-digest';

async function sendWeeklyDigest(subscribers, articles) {
  for (const subscriber of subscribers) {
    await resend.emails.send({
      from: 'newsletter@yourdomain.com',
      to: subscriber.email,
      subject: `Your weekly digest - Week ${currentWeek}`,
      react: WeeklyDigestEmail({
        userName: subscriber.name,
        weekNumber: currentWeek.toString(),
        items: articles.map(a => ({
          title: a.title,
          description: a.excerpt,
          url: a.url
        })),
        unsubscribeUrl: `https://myapp.com/unsubscribe?token=${subscriber.token}`
      })
    });

    // Rate limiting (Resend free tier: 2 emails/sec)
    await new Promise(resolve => setTimeout(resolve, 500));
  }
}
```

---

## 🔧 Troubleshooting

### "Module not found: Can't resolve 'react'"

**Fix:** Install React:
```bash
npm install react
```

### "RESEND_API_KEY is not defined"

**Fix:**
1. Check `.env` file exists
2. Check you're loading env vars:
   ```typescript
   // Add at top of file:
   import 'dotenv/config'; // If using dotenv
   // Or with Next.js, it's automatic
   ```

### "from address not verified"

**Fix for testing:** Use `onboarding@resend.dev` (Resend's test email)

**Fix for production:**
1. Go to https://resend.com/domains
2. Add your domain
3. Add DNS records (MX, SPF, DKIM)
4. Wait for verification (~10 minutes)
5. Use `hello@yourdomain.com`

### Email looks broken in Gmail/Outlook

**This shouldn't happen!** The templates are tested in all major email clients.

If you modified the template:
- Don't use `flex` or `grid` (not supported in email)
- Use tables for layout (the templates do this)
- Keep styles inline (the templates do this)
- Test in https://www.emailonacid.com/ or https://litmus.com/

---

## 🎯 Next Steps

**After you've sent your first email:**

1. **Customize the templates** - Change colors, text, props
2. **Add your brand** - Logo, colors, fonts
3. **Test all 6 templates** - Try each one
4. **Add to your app** - Integrate into signup, checkout, etc.
5. **Monitor delivery** - Check Resend dashboard for stats

---

## 📚 Resources

- **Resend Docs**: https://resend.com/docs
- **React Email Docs**: https://react.email
- **Email Design Guide**: https://www.goodemailcode.com
- **Template Gallery**: https://3a996f05.capability-dashboard.pages.dev/email-gallery/

---

## 💬 Common Questions

**Q: Do I need TypeScript?**
A: No! You can use JavaScript. Just rename files from `.tsx` to `.jsx` and remove type annotations.

**Q: Can I use this with Nodemailer instead of Resend?**
A: Yes! Example:
```typescript
import { render } from '@react-email/render';
import { WelcomeEmail } from './emails/01-welcome';

const html = await render(WelcomeEmail({ userName: 'John' }));

await transporter.sendMail({
  from: 'hello@yourdomain.com',
  to: 'user@example.com',
  subject: 'Welcome!',
  html
});
```

**Q: How much does Resend cost?**
A: Free tier: 3,000 emails/month. Paid: $20/month for 50,000 emails.

**Q: Can I customize the templates?**
A: YES! Edit the `.tsx` files. Change colors, text, layout, anything.

**Q: Will these work in all email clients?**
A: Yes! Tested in Gmail, Outlook, Apple Mail, Yahoo, etc.

---

**You're ready to ship! 🚀**

Start with the Welcome email, then add more as you need them.
