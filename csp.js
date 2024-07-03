const policies = {
  'default-src': ["'self'"],
  'script-src': [
    "'self'",
    "'unsafe-inline'",
    "'unsafe-eval'",
    'https://checkout.stripe.com',
    'https://js.stripe.com',
    'https://maps.googleapis.com',
    'https://geowidget.inpost.pl/inpost-geowidget.js',
    'https://www.googletagmanager.com/',
    'https://region1.google-analytics.com/',
    'https://www.google-analytics.com'

  ],
  'child-src': ["'self'"],
  'style-src': ["'self'", "'unsafe-inline'", 'https://fonts.googleapis.com'],
  'img-src': ["'self'", 'https://*.stripe.com', 'https://raw.githubusercontent.com', 'https://jakimkurierem.pl/logo_kuriera/dpd_logo.png'],
  'font-src': ["'self'"],
  'frame-src': [
    "'self'",
    'https://checkout.stripe.com',
    'https://js.stripe.com',
    'https://hooks.stripe.com',
    'https://geowidget-app.inpost.pl/',
  ],
  'connect-src': [
    "'self'",
    'https://checkout.stripe.com',
    'https://api.stripe.com',
    'https://maps.googleapis.com',
    'https://pay.cashbill.pl/testws/rest/payment/planet-of-mushrooms.com',
    'https://pay.cashbill.pl/testws/rest/payment/',
    'https://pay.cashbill.pl/ws/rest/payment/grzybole.pl',
    'https://pay.cashbill.pl/testws/rest/payment/grzybole.pl',
    'http://www.google.pl',
    'https://jsonplaceholder.typicode.com/users',
    'https://www.googletagmanager.com/',
    'https://region1.google-analytics.com/',
    'https://www.google-analytics.com'
  ],

}

module.exports = Object.entries(policies)
  .map(([key, value]) => {
    if (Array.isArray(value)) {
      return `${key} ${value.join(' ')}`
    }
    return ''
  })
  .join('; ')
