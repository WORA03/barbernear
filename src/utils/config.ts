export const CONFIG = {
  API_URL: __DEV__ 
    ? 'http://192.168.1.1:3000' // Replace with your machine's IP
    : 'https://your-production-url.com',
  GOOGLE_MAPS_API_KEY: 'YOUR_GOOGLE_MAPS_API_KEY',
  STRIPE_PUBLISHABLE_KEY: 'YOUR_STRIPE_PUBLISHABLE_KEY',
  CLOUDINARY_CLOUD_NAME: 'YOUR_CLOUDINARY_CLOUD_NAME',
};
