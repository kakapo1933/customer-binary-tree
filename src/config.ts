// Environment-specific configuration
const config = {
  development: {
    apiBaseUrl: 'http://localhost:3001',
  },
  production: {
    apiBaseUrl: 'https://api.example.com',
  },
};

// Determine the current environment
const environment = process.env.NODE_ENV || 'development';

// Export the configuration for the current environment
export default config[environment as keyof typeof config];
