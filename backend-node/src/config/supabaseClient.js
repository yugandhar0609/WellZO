const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();
const logger = require('./logger');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  logger.error('Missing Supabase URL or Anonymous Key');
  throw new Error('Missing Supabase URL or Anonymous Key. Please check your environment variables.');
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Test the connection
async function testConnection() {
  try {
    const { data, error } = await supabase.auth.getSession();
    if (error) throw error;
    logger.info('Connected to Supabase successfully');
  } catch (error) {
    logger.error('Failed to connect to Supabase:', error.message);
    // Don't throw error here to allow the application to start even if Supabase is not available
  }
}

// Initialize connection
testConnection();

module.exports = supabase; 