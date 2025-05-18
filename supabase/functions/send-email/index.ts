import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { SESClient, SendEmailCommand } from 'npm:@aws-sdk/client-ses';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS'
};

const RECAPTCHA_SECRET_KEY = '6LeP-T4rAAAAAF3gRZuZK-suox6lMy3asM4LaaEo';

const recipientMap = {
  'General Inquiry': 'info@ekoflex.lt',
  'HR Department': 'hr@ekoflex.lt',
  'Accountant': 'accounting@ekoflex.lt',
  'Operations Director': 'operations@ekoflex.lt'
};

const sesClient = new SESClient({ 
  region: 'eu-north-1',
  credentials: {
    accessKeyId: Deno.env.get('AWS_ACCESS_KEY_ID') || '',
    secretAccessKey: Deno.env.get('AWS_SECRET_ACCESS_KEY') || ''
  }
});

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    // Only allow POST requests
    if (req.method !== 'POST') {
      throw new Error('Method not allowed');
    }

    const { name, email, subject, message, 'g-recaptcha-response': recaptchaResponse } = await req.json();
    
    // Verify reCAPTCHA
    const recaptchaVerification = await fetch('https://www.google.com/recaptcha/api/siteverify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `secret=${RECAPTCHA_SECRET_KEY}&response=${recaptchaResponse}`,
    });

    const recaptchaResult = await recaptchaVerification.json();
    if (!recaptchaResult.success) {
      throw new Error('reCAPTCHA verification failed');
    }

    const recipient = recipientMap[subject];
    if (!recipient) {
      throw new Error('Invalid subject');
    }

    const params = {
      Source: 'info@ekoflex.lt',
      Destination: {
        ToAddresses: [recipient]
      },
      Message: {
        Subject: {
          Data: `New Contact Form Message (${subject})`
        },
        Body: {
          Html: {
            Data: `
              <p><strong>Name:</strong> ${name}</p>
              <p><strong>Email:</strong> ${email}</p>
              <p><strong>Subject:</strong> ${subject}</p>
              <p><strong>Message:</strong><br>${message}</p>
            `
          }
        }
      }
    };

    const command = new SendEmailCommand(params);
    await sesClient.send(command);

    return new Response(
      JSON.stringify({ success: true }),
      {
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json'
        }
      }
    );

  } catch (error) {
    console.error('Error:', error.message);
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 400,
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json'
        }
      }
    );
  }
});