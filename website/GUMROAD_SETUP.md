# Gumroad Payment Setup Guide for VideoConvert Pro

This guide walks you through setting up Gumroad to sell VideoConvert Pro licenses.

## Table of Contents

1. [Create Gumroad Account](#1-create-gumroad-account)
2. [Set Up Your Profile](#2-set-up-your-profile)
3. [Create the Product](#3-create-the-product)
4. [Configure Pricing](#4-configure-pricing)
5. [Set Up License Keys](#5-set-up-license-keys)
6. [Customize the Checkout](#6-customize-the-checkout)
7. [Connect Payment Methods](#7-connect-payment-methods)
8. [Integrate with Your Website](#8-integrate-with-your-website)
9. [Set Up Webhooks (Optional)](#9-set-up-webhooks-optional)
10. [Testing](#10-testing)

---

## 1. Create Gumroad Account

1. Go to [gumroad.com](https://gumroad.com)
2. Click **"Start selling"** or **"Sign up"**
3. Create an account using email or Google/Twitter
4. Verify your email address

## 2. Set Up Your Profile

1. Go to **Settings** → **Profile**
2. Fill in your details:
   - **Name**: VideoConvert (or your brand name)
   - **Username**: videoconvert (this will be your Gumroad URL)
   - **Bio**: "Transform videos for any platform. 100% local processing."
   - **Profile picture**: Upload your app logo
3. Add social links (Twitter, website, etc.)

## 3. Create the Product

### Navigate to Products

1. Click **"Products"** in the sidebar
2. Click **"New product"**

### Product Details

Fill in the following:

| Field | Value |
|-------|-------|
| **Name** | VideoConvert Pro |
| **Description** | See template below |
| **Price** | $29 (or your chosen price) |
| **Product type** | Digital product |

### Product Description Template

```markdown
# VideoConvert Pro License

Unlock the full power of VideoConvert with a Pro license.

## What's Included

✅ **All Output Formats** - MP4, MOV, MKV, AVI, WebM
✅ **4K Resolution Support** - Up to 3840x2160
✅ **No Watermark** - Clean, professional output
✅ **Batch Conversion** - Convert multiple files at once
✅ **Custom Presets** - Save your favorite settings
✅ **Lifetime Updates** - Free updates forever
✅ **Priority Support** - Get help when you need it

## How It Works

1. Purchase and receive your license key instantly
2. Open VideoConvert and go to Settings
3. Enter your license key to activate Pro features
4. Enjoy unlimited conversions!

## System Requirements

- Windows 10 or later
- macOS 10.15 (Catalina) or later
- Linux (Ubuntu 20.04 or equivalent)

## Refund Policy

30-day money-back guarantee. If you're not satisfied, contact us for a full refund.
```

### Add Product Images

1. Upload screenshots showing Pro features
2. Recommended: Before/after comparison (Free vs Pro)
3. Add your app icon as the thumbnail

## 4. Configure Pricing

### Standard Pricing

1. Set base price: **$29**
2. Optional: Add a "Compare at" price for discount display (e.g., $49)

### Discount Codes (Optional)

1. Go to **Discounts** in product settings
2. Create discount codes:
   - `LAUNCH20` - 20% off for launch
   - `STUDENT50` - 50% off for students
   - `EARLY30` - 30% off for early adopters

### Pay What You Want (Optional)

If you want flexible pricing:
1. Enable "Let customers pay what they want"
2. Set minimum price: $19
3. Set suggested price: $29

## 5. Set Up License Keys

Gumroad can automatically generate unique license keys for each purchase.

### Enable License Keys

1. In product settings, find **"Content"** section
2. Enable **"Generate a unique license key"**
3. Gumroad will create a unique key for each sale

### Custom License Key Format (Advanced)

If you need custom license keys:

1. Go to **Settings** → **Advanced**
2. Set up a webhook to generate custom keys
3. Use your own license validation server

### License Key Delivery

Keys are automatically:
- Shown on the purchase confirmation page
- Included in the receipt email
- Available in the customer's Gumroad library

## 6. Customize the Checkout

### Checkout Settings

1. Go to product **Settings** → **Checkout**
2. Configure:
   - **Collect customer info**: Email (required), Name (optional)
   - **Ask for shipping address**: No (digital product)
   - **Custom thank you message**: "Thanks for purchasing VideoConvert Pro! Your license key is below."

### Custom Fields (Optional)

Add custom fields to collect:
- Operating system preference
- How they heard about you
- Feature requests

### Branding

1. Go to **Settings** → **Design**
2. Upload your logo
3. Set brand colors to match your website
4. Customize button text: "Get Pro License"

## 7. Connect Payment Methods

### Payout Settings

1. Go to **Settings** → **Payments**
2. Connect your payout method:
   - **PayPal** (fastest, most regions)
   - **Bank transfer** (US, UK, EU)
   - **Stripe** (for card payments)

### Accepted Payment Methods

Gumroad accepts:
- Credit/debit cards (Visa, Mastercard, Amex)
- PayPal
- Apple Pay / Google Pay
- Local payment methods in some regions

### Tax Settings

1. Go to **Settings** → **Payments** → **Tax**
2. Enable automatic VAT/GST collection if selling internationally
3. Gumroad handles EU VAT compliance automatically

## 8. Integrate with Your Website

### Get Your Product Link

Your product URL will be:
```
https://[username].gumroad.com/l/videoconvert-pro
```

Or use a custom short link:
```
https://gumroad.com/l/vc-pro
```

### Embed Options

#### Option A: Direct Link (Recommended)

```html
<a href="https://videoconvert.gumroad.com/l/pro" class="gumroad-button">
  Get Pro License - $29
</a>
```

#### Option B: Gumroad Overlay

Add this script to your website:
```html
<script src="https://gumroad.com/js/gumroad.js"></script>
```

Then use overlay links:
```html
<a class="gumroad-button" href="https://videoconvert.gumroad.com/l/pro">
  Get Pro License
</a>
```

#### Option C: Embed Checkout

Embed the full checkout on your page:
```html
<div class="gumroad-product-embed">
  <a href="https://videoconvert.gumroad.com/l/pro">Loading...</a>
</div>
<script src="https://gumroad.com/js/gumroad-embed.js"></script>
```

### Update Website Pricing Page

Update your pricing page to link to Gumroad:

```tsx
// In website/app/pricing/Pricing.tsx

const GUMROAD_URL = 'https://videoconvert.gumroad.com/l/pro'

// Update the "Get Pro" button
<a href={GUMROAD_URL} target="_blank" rel="noopener noreferrer">
  <Button variant="primary" size="lg">
    Get Pro License
  </Button>
</a>
```

## 9. Set Up Webhooks (Optional)

For advanced integrations (automatic license activation, CRM, etc.):

### Enable Webhooks

1. Go to **Settings** → **Advanced** → **Webhooks**
2. Add your webhook URL: `https://your-server.com/api/gumroad-webhook`

### Webhook Events

Gumroad sends webhooks for:
- `sale` - New purchase
- `refund` - Refund processed
- `subscription_updated` - Subscription changes
- `subscription_cancelled` - Subscription cancelled

### Webhook Payload Example

```json
{
  "seller_id": "abc123",
  "product_id": "xyz789",
  "product_name": "VideoConvert Pro",
  "email": "customer@example.com",
  "price": 2900,
  "license_key": "XXXXX-XXXXX-XXXXX-XXXXX",
  "sale_id": "sale_123",
  "sale_timestamp": "2024-01-15T10:30:00Z"
}
```

### Webhook Handler Example (Node.js)

```javascript
app.post('/api/gumroad-webhook', (req, res) => {
  const { license_key, email, product_name } = req.body

  // Verify the webhook (check seller_id matches yours)
  if (req.body.seller_id !== process.env.GUMROAD_SELLER_ID) {
    return res.status(401).send('Unauthorized')
  }

  // Store license in your database
  await db.licenses.create({
    key: license_key,
    email: email,
    product: product_name,
    active: true
  })

  // Send welcome email, etc.

  res.status(200).send('OK')
})
```

## 10. Testing

### Test Mode

1. Gumroad doesn't have a formal test mode
2. Create a 100% discount code for testing: `TEST100`
3. Make a test purchase with the discount
4. Verify:
   - License key is generated
   - Email is received
   - Webhooks fire correctly

### Test Checklist

- [ ] Product page displays correctly
- [ ] Checkout process works
- [ ] License key is delivered
- [ ] Email receipt is sent
- [ ] Refund process works
- [ ] Discount codes apply correctly
- [ ] Webhooks fire (if configured)

### Go Live Checklist

- [ ] Remove test discount codes
- [ ] Set final pricing
- [ ] Update website links
- [ ] Test one real purchase (refund yourself)
- [ ] Monitor first few sales

---

## Quick Reference

| Item | Value |
|------|-------|
| Product URL | `https://videoconvert.gumroad.com/l/pro` |
| Price | $29 |
| Discount Code | `LAUNCH20` (20% off) |
| Refund Policy | 30 days |

## Support

- Gumroad Help: [help.gumroad.com](https://help.gumroad.com)
- Gumroad Community: [community.gumroad.com](https://community.gumroad.com)
- Contact Gumroad: support@gumroad.com

---

## Next Steps

1. Create your Gumroad account
2. Set up the VideoConvert Pro product
3. Update your website's pricing page with the Gumroad link
4. Announce your launch!
