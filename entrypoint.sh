#!/bin/sh

echo "⏳ Czekam na MongoDB..."
until nc -z mongodb 27017; do
  sleep 1
done

echo "✅ MongoDB dostępne – buduję Next.js..."
npm run build:next

echo "🚀 Uruchamiam Payload CMS..."
npm run serve

