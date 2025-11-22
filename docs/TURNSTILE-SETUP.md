# Cloudflare Turnstile Setup Instructions

## Getting Your Site Key

1. Go to [Cloudflare Dashboard](https://dash.cloudflare.com/)
2. Navigate to **Turnstile** in the sidebar
3. Click **Add Site**
4. Enter your domain name
5. Copy the **Site Key** and **Secret Key**

## Configure Turnstile

Edit `components/contact.html` and replace `YOUR_TURNSTILE_SITE_KEY`:

```html
<div class="cf-turnstile" 
     data-sitekey="YOUR_TURNSTILE_SITE_KEY" 
     data-theme="dark"
     data-size="normal"
     data-callback="onTurnstileSuccess"></div>
```

## Server-Side Verification (Required)

When handling form submissions, verify the Turnstile token:

```javascript
// Node.js example
const token = req.body['cf-turnstile-response'];
const ip = req.ip;

const response = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    secret: 'YOUR_SECRET_KEY', // From Cloudflare dashboard
    response: token,
    remoteip: ip // Optional but recommended
  })
});

const verification = await response.json();
if (!verification.success) {
  return res.status(400).json({ error: 'CAPTCHA verification failed' });
}
```

### Python Example

```python
import requests

def verify_turnstile(token, secret, ip):
    response = requests.post(
        'https://challenges.cloudflare.com/turnstile/v0/siteverify',
        json={
            'secret': secret,
            'response': token,
            'remoteip': ip
        }
    )
    return response.json().get('success', False)
```

### PHP Example

```php
$token = $_POST['cf-turnstile-response'];
$secret = 'YOUR_SECRET_KEY';
$ip = $_SERVER['REMOTE_ADDR'];

$response = file_get_contents('https://challenges.cloudflare.com/turnstile/v0/siteverify', false, stream_context_create([
    'http' => [
        'method' => 'POST',
        'header' => 'Content-Type: application/json',
        'content' => json_encode([
            'secret' => $secret,
            'response' => $token,
            'remoteip' => $ip
        ])
    ]
]));

$result = json_decode($response);
if (!$result->success) {
    die('CAPTCHA verification failed');
}
```

## Benefits

- ✅ **Free**: Unlimited verifications
- ✅ **Privacy-first**: No tracking, GDPR compliant
- ✅ **Fast**: Average solve time < 1 second
- ✅ **Accessible**: WCAG 2.1 AA compliant
- ✅ **Cloudflare Network**: Global CDN, 99.99% uptime
- ✅ **No user data collection**: Privacy-focused
- ✅ **Invisible mode available**: Can run completely invisible

## Pricing

- **Free Tier**: Unlimited verifications
- No credit card required
- Enterprise options available for advanced features

## Widget Customization

### Theme Options
- `light` - Light theme
- `dark` - Dark theme (used in this site)
- `auto` - Matches system preference

### Size Options
- `normal` - Standard size (300x65px)
- `compact` - Smaller size (130x120px)
- `flexible` - Responsive width

### Example with Options

```html
<div class="cf-turnstile" 
     data-sitekey="YOUR_SITE_KEY"
     data-theme="dark"
     data-size="normal"
     data-appearance="interaction-only"
     data-language="en"
     data-callback="onTurnstileSuccess"
     data-error-callback="onTurnstileError"></div>
```

## Troubleshooting

### Widget not appearing
1. Check that the site key is correct
2. Verify the domain is added to your Turnstile configuration
3. Check browser console for errors

### Verification failing
1. Ensure secret key is correct on backend
2. Verify token is being sent with form submission
3. Check that token hasn't expired (tokens expire after 5 minutes)

## Resources

- [Cloudflare Turnstile Docs](https://developers.cloudflare.com/turnstile/)
- [API Reference](https://developers.cloudflare.com/turnstile/get-started/)
- [Best Practices](https://developers.cloudflare.com/turnstile/best-practices/)
