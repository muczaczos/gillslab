import { webpackBundler } from '@payloadcms/bundler-webpack'
import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { payloadCloud } from '@payloadcms/plugin-cloud'
import nestedDocs from '@payloadcms/plugin-nested-docs'
import redirects from '@payloadcms/plugin-redirects'
import seo from '@payloadcms/plugin-seo'
import type { GenerateTitle } from '@payloadcms/plugin-seo/types'
import stripePlugin from '@payloadcms/plugin-stripe'
import { slateEditor } from '@payloadcms/richtext-slate'
import dotenv from 'dotenv'
import path from 'path'
import { buildConfig } from 'payload/config'

import Categories from './collections/Categories'
import Comments from './collections/Comments'
import { Media } from './collections/Media'
import { Orders } from './collections/Orders'
import { Pages } from './collections/Pages'
import { Posts } from './collections/Posts'
import Products from './collections/Products'
import { Subscribers } from './collections/Subscribers'
import { Tags } from './collections/Tags'
import Users from './collections/Users'
import Zones from './collections/Zones'
import BeforeDashboard from './components/BeforeDashboard'
import BeforeLogin from './components/BeforeLogin'
import NavigationAlert from './components/NavigationAlerts'
import { createPaymentIntent } from './endpoints/create-payment-intent'
import { customersProxy } from './endpoints/customers'
import { productsProxy } from './endpoints/products'
import { seed } from './endpoints/seed'
import { Footer } from './globals/Footer'
import { Header } from './globals/Header'
import { Settings } from './globals/Settings'
import { priceUpdated } from './stripe/webhooks/priceUpdated'
import { productUpdated } from './stripe/webhooks/productUpdated'

import '../../tailwind.css'
import '../css/admin.css'

const generateTitle: GenerateTitle = () => {
  return 'Cubensis Growkit'
}

export const email = {
  transportOptions: {
    host: process.env.SMTP_HOST,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
    port: Number(process.env.SMTP_HOST),
    secure: Number(process.env.SMTP_PORT) === 465, // true for port 465, false (the default) for 587 and others
    requireTLS: true,
  },
  fromName: 'hello',
  fromAddress: 'shop@planet-of-mushrooms.com',
}

const mockModulePath = path.resolve(__dirname, './emptyModuleMock.js')

dotenv.config({
  path: path.resolve(__dirname, '../../.env'),
})

export default buildConfig({
  admin: {
    css: path.resolve(__dirname, '../css/compiledTailwind.css'),
    user: Users.slug,
    bundler: webpackBundler(),
    components: {
      afterNavLinks: [NavigationAlert],
      beforeLogin: [BeforeLogin],
      beforeDashboard: [BeforeDashboard],
    },
    webpack: config => {
      return {
        ...config,
        module: {
          ...config.module,
          rules: [
            ...config.module.rules,
            {
              test: /\.css$/,
              use: ['style-loader', 'css-loader', 'postcss-loader'],
              include: [path.resolve(__dirname, '../css/extraStyles.css')],
            },
            {
              test: /\.scss$/,
              use: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader'],
              include: [
                path.resolve(__dirname, '../scss/'), // Ścieżka do plików SCSS, jeśli takie masz
              ],
            },
          ],
        },
        resolve: {
          ...config.resolve,
          extensions: ['.js', '.jsx', '.ts', '.tsx'],
          alias: {
            ...config.resolve?.alias,
            dotenv: path.resolve(__dirname, './dotenv.js'),
            [path.resolve(__dirname, 'collections/Products/hooks/beforeChange')]: mockModulePath,
            [path.resolve(__dirname, 'collections/Users/hooks/createStripeCustomer')]:
              mockModulePath,
            [path.resolve(__dirname, 'collections/Users/endpoints/customer')]: mockModulePath,
            [path.resolve(__dirname, 'endpoints/create-payment-intent')]: mockModulePath,
            [path.resolve(__dirname, 'endpoints/customers')]: mockModulePath,
            [path.resolve(__dirname, 'endpoints/products')]: mockModulePath,
            [path.resolve(__dirname, 'endpoints/seed')]: mockModulePath,
            stripe: mockModulePath,
            express: mockModulePath,
          },
        },
      }
    },
  },
  rateLimit: {
    trustProxy: true,
    max: 100000,
  },
  editor: slateEditor({}),
  db: mongooseAdapter({
    url: process.env.DATABASE_URI,
  }),
  serverURL: process.env.PAYLOAD_PUBLIC_SERVER_URL,
  collections: [
    Zones,
    Tags,
    Posts,
    Subscribers,
    Pages,
    Products,
    Orders,
    Media,
    Categories,
    Users,
    Comments,
  ],
  email,
  localization: {
    locales: [
      {
        label: {
          en: 'English',
          pl: 'Angielski',
        },
        code: 'en',
      },
      {
        label: {
          en: 'Polish',
          pl: 'Polski',
        },
        code: 'pl',
      },
    ],
    defaultLocale: 'en',
    fallback: true,
  },
  globals: [Settings, Header, Footer],
  typescript: {
    outputFile: path.resolve(__dirname, 'payload-types.ts'),
  },
  graphQL: {
    schemaOutputFile: path.resolve(__dirname, 'generated-schema.graphql'),
  },
  cors: [
    'https://checkout.stripe.com',
    'https://grzybole.pl',
    'https://pay.cashbill.pl/testws/rest/payment/grzybole.pl',
    process.env.PAYLOAD_PUBLIC_SERVER_URL || '',
  ].filter(Boolean),
  csrf: ['https://checkout.stripe.com', process.env.PAYLOAD_PUBLIC_SERVER_URL || ''].filter(
    Boolean,
  ),
  endpoints: [
    {
      path: '/create-payment-intent',
      method: 'post',
      handler: createPaymentIntent,
    },
    {
      path: '/stripe/customers',
      method: 'get',
      handler: customersProxy,
    },
    {
      path: '/stripe/products',
      method: 'get',
      handler: productsProxy,
    },
    {
      path: '/seed',
      method: 'get',
      handler: seed,
    },
  ],
  plugins: [
    stripePlugin({
      stripeSecretKey: process.env.STRIPE_SECRET_KEY || '',
      isTestKey: Boolean(process.env.PAYLOAD_PUBLIC_STRIPE_IS_TEST_KEY),
      stripeWebhooksEndpointSecret: process.env.STRIPE_WEBHOOKS_SIGNING_SECRET,
      rest: false,
      webhooks: {
        'product.created': productUpdated,
        'product.updated': productUpdated,
        'price.updated': priceUpdated,
      },
    }),
    redirects({
      collections: ['pages', 'products', 'posts', 'subscribers'],
    }),
    nestedDocs({
      collections: ['categories'],
    }),
    seo({
      collections: ['pages', 'products', 'posts'],
      generateTitle,
      uploadsCollection: 'media',
    }),
    payloadCloud(),
  ],
})
