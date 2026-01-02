# Gumroad Setup Instructions

This guide walks you through setting up Gumroad to sell VideoConvert Pro licenses.

## 1. Create a Gumroad Account

1. Go to [gumroad.com](https://gumroad.com)
2. Click "Start selling" or "Sign up"
3. Create an account with your email
4. Complete your profile with business information

## 2. Set Up Payment Processing

1. Go to **Settings** > **Payments**
2. Connect your bank account or PayPal for payouts
3. Set your payout schedule (weekly, bi-weekly, or monthly)
4. Add tax information if required for your region

## 3. Create the VideoConvert Pro Product

1. Click **"New product"** from your dashboard
2. Fill in product details:

   | Field | Value |
   |-------|-------|
   | **Name** | VideoConvert Pro |
   | **Price** | $29 (or your preferred price) |
   | **Type** | Digital product |

3. **Description** (copy this):
   ```
   Unlock the full power of VideoConvert with a Pro license:

   - All output formats: MP4, MOV, MKV, AVI, WebM
   - Up to 4K resolution (3840x2160)
   - No watermark on exported videos
   - Batch conversion - process multiple files at once
   - Custom presets - save your favorite settings
   - Lifetime updates included
   - Priority email support

   After purchase, you'll receive a license key via email.
   Enter it in the VideoConvert app settings to activate Pro features.
   ```

4. **Cover image**: Upload your VideoConvert Pro marketing image (1280x720 recommended)

## 4. Configure License Key Delivery

Since VideoConvert validates license keys in format `VC-XXXX-XXXX-XXXX`, you need to generate and deliver these keys.

### Option A: Manual Key Generation (Simple)

1. Pre-generate a batch of license keys in this format:
   ```
   VC-A1B2-C3D4-E5F6
   VC-G7H8-I9J0-K1L2
   VC-M3N4-O5P6-Q7R8
   ... etc
   ```

2. In Gumroad product settings:
   - Go to **Content** tab
   - Select **"Send a unique file/code to each customer"**
   - Upload a text file with one key per line, OR
   - Use Gumroad's license key feature

### Option B: Use Gumroad's Built-in License Keys

1. In your product settings, go to **Content**
2. Enable **"Generate a unique license key"**
3. **Important**: Gumroad generates keys in a different format
4. You'll need to update your app's license validation in `electron/main.js`:

   ```javascript
   // Current validation (line 168):
   const LICENSE_KEY_PATTERN = /^VC-[A-Z0-9]{4}-[A-Z0-9]{4}-[A-Z0-9]{4}$/;

   // Change to accept Gumroad format (32-character hex):
   const LICENSE_KEY_PATTERN = /^[A-F0-9]{8}-[A-F0-9]{8}-[A-F0-9]{8}-[A-F0-9]{8}$/;
   ```

### Option C: Custom Key Generation Script (Recommended)

Create a script to generate keys and store them:

```javascript
// scripts/generate-keys.js
const crypto = require('crypto');
const fs = require('fs');

function generateKey() {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  const segment = () => Array.from({length: 4}, () =>
    chars[Math.floor(Math.random() * chars.length)]
  ).join('');

  return `VC-${segment()}-${segment()}-${segment()}`;
}

// Generate 100 keys
const keys = Array.from({length: 100}, generateKey);
fs.writeFileSync('license-keys.txt', keys.join('\n'));
console.log('Generated 100 license keys to license-keys.txt');
```

Run with `node scripts/generate-keys.js`, then upload `license-keys.txt` to Gumroad.

## 5. Set Up Email Template

1. Go to **Settings** > **Emails**
2. Customize the purchase confirmation email:

   **Subject**: Your VideoConvert Pro License Key

   **Body**:
   ```
   Thank you for purchasing VideoConvert Pro!

   Your license key: {license_key}

   To activate:
   1. Open VideoConvert
   2. Go to Settings > License
   3. Enter your license key
   4. Click "Activate"

   Your license works on up to 3 devices.

   Need help? Contact support@videoconvert.video

   Happy converting!
   The VideoConvert Team
   ```

## 6. Get Your Product URL

1. After publishing, Gumroad gives you a URL like:
   ```
   https://yourname.gumroad.com/l/videoconvert-pro
   ```

2. Or use a custom short link:
   ```
   https://gumroad.com/l/videoconvert-pro
   ```

## 7. Add to Website

Update the "Get Pro License" button in `website/app/pricing/Pricing.tsx`:

```tsx
// Find line ~143 and change:
<Button variant="primary" className="w-full" size="lg">

// To:
<a href="https://yourname.gumroad.com/l/videoconvert-pro" target="_blank" rel="noopener noreferrer">
  <Button variant="primary" className="w-full" size="lg">
    <CreditCard className="w-5 h-5 mr-2" />
    Get Pro License
  </Button>
</a>
```

## 8. Test the Flow

1. Use Gumroad's test mode to make a test purchase
2. Verify the license key is delivered via email
3. Test the key in your VideoConvert app
4. Confirm Pro features unlock

## 9. Configure Webhooks (Optional)

For advanced license management, set up webhooks:

1. Go to **Settings** > **Advanced**
2. Add a webhook URL: `https://videoconvert.video/api/gumroad-webhook`
3. Gumroad will POST purchase data to your endpoint

Example webhook handler (if needed later):
```typescript
// website/app/api/gumroad-webhook/route.ts
export async function POST(req: Request) {
  const data = await req.formData();
  const email = data.get('email');
  const licenseKey = data.get('license_key');

  // Store in database, send welcome email, etc.

  return Response.json({ success: true });
}
```

## Checklist

- [ ] Gumroad account created
- [ ] Payment processing connected
- [ ] VideoConvert Pro product created
- [ ] Price set to $29 (with $49 crossed out)
- [ ] License key delivery configured
- [ ] Email template customized
- [ ] Product URL obtained
- [ ] Website "Get Pro License" button updated
- [ ] Test purchase completed
- [ ] Deploy website changes
