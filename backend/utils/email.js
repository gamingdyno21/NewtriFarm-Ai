import nodemailer from 'nodemailer';
import path from 'path';
import fs from 'fs';

// Create transporter
const createTransporter = () => {
  return nodemailer.createTransporter({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: process.env.EMAIL_PORT === '465',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });
};

// Email templates
const emailTemplates = {
  emailVerification: (data) => `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Verify Your Email - NutriFarm AI</title>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #22c55e, #16a34a); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
        .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
        .button { display: inline-block; background: #22c55e; color: white; padding: 15px 30px; text-decoration: none; border-radius: 5px; margin: 20px 0; }
        .footer { text-align: center; margin-top: 30px; color: #666; font-size: 14px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>🌾 NutriFarm AI</h1>
          <p>Verify Your Email Address</p>
        </div>
        <div class="content">
          <h2>Hello ${data.name}!</h2>
          <p>Welcome to NutriFarm AI! We're excited to have you join our community of smart farmers.</p>
          <p>To get started, please verify your email address by clicking the button below:</p>
          <a href="${data.verificationUrl}" class="button">Verify Email Address</a>
          <p>If the button doesn't work, you can copy and paste this link into your browser:</p>
          <p style="word-break: break-all; color: #666;">${data.verificationUrl}</p>
          <p>This link will expire in 24 hours for security reasons.</p>
          <p>If you didn't create an account with NutriFarm AI, you can safely ignore this email.</p>
        </div>
        <div class="footer">
          <p>&copy; 2024 NutriFarm AI. All rights reserved.</p>
          <p>This email was sent to you because you signed up for NutriFarm AI.</p>
        </div>
      </div>
    </body>
    </html>
  `,
  
  passwordReset: (data) => `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Reset Your Password - NutriFarm AI</title>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #ef4444, #dc2626); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
        .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
        .button { display: inline-block; background: #ef4444; color: white; padding: 15px 30px; text-decoration: none; border-radius: 5px; margin: 20px 0; }
        .footer { text-align: center; margin-top: 30px; color: #666; font-size: 14px; }
        .warning { background: #fef3c7; border: 1px solid #f59e0b; padding: 15px; border-radius: 5px; margin: 20px 0; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>🌾 NutriFarm AI</h1>
          <p>Reset Your Password</p>
        </div>
        <div class="content">
          <h2>Hello ${data.name}!</h2>
          <p>We received a request to reset your password for your NutriFarm AI account.</p>
          <p>Click the button below to reset your password:</p>
          <a href="${data.resetUrl}" class="button">Reset Password</a>
          <p>If the button doesn't work, you can copy and paste this link into your browser:</p>
          <p style="word-break: break-all; color: #666;">${data.resetUrl}</p>
          <div class="warning">
            <strong>⚠️ Security Notice:</strong>
            <ul>
              <li>This link will expire in 10 minutes</li>
              <li>If you didn't request this password reset, please ignore this email</li>
              <li>Your password will remain unchanged until you click the link above</li>
            </ul>
          </div>
        </div>
        <div class="footer">
          <p>&copy; 2024 NutriFarm AI. All rights reserved.</p>
          <p>This email was sent to you because you requested a password reset.</p>
        </div>
      </div>
    </body>
    </html>
  `,
  
  welcome: (data) => `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Welcome to NutriFarm AI!</title>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #22c55e, #16a34a); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
        .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
        .feature { background: white; padding: 20px; margin: 15px 0; border-radius: 5px; border-left: 4px solid #22c55e; }
        .button { display: inline-block; background: #22c55e; color: white; padding: 15px 30px; text-decoration: none; border-radius: 5px; margin: 20px 0; }
        .footer { text-align: center; margin-top: 30px; color: #666; font-size: 14px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>🌾 NutriFarm AI</h1>
          <p>Welcome to the Future of Farming!</p>
        </div>
        <div class="content">
          <h2>Hello ${data.name}!</h2>
          <p>Welcome to NutriFarm AI! We're thrilled to have you join our community of innovative farmers.</p>
          <p>Here's what you can do with NutriFarm AI:</p>
          
          <div class="feature">
            <h3>📊 Smart Dashboard</h3>
            <p>Monitor your farm's performance with real-time metrics and insights</p>
          </div>
          
          <div class="feature">
            <h3>🤖 AI-Powered Diagnosis</h3>
            <p>Get instant crop health analysis and personalized recommendations</p>
          </div>
          
          <div class="feature">
            <h3>🌤️ Weather Intelligence</h3>
            <p>Access detailed forecasts and farming-specific weather insights</p>
          </div>
          
          <div class="feature">
            <h3>💰 ROI Calculator</h3>
            <p>Plan your investments with comprehensive financial analysis</p>
          </div>
          
          <div class="feature">
            <h3>📦 Inventory Management</h3>
            <p>Track supplies and equipment with automated alerts</p>
          </div>
          
          <div class="feature">
            <h3>👥 Community</h3>
            <p>Connect with fellow farmers and share knowledge</p>
          </div>
          
          <a href="${process.env.FRONTEND_URL}/dashboard" class="button">Get Started</a>
          
          <p>Need help getting started? Check out our <a href="${process.env.FRONTEND_URL}/help">help center</a> or contact our support team.</p>
        </div>
        <div class="footer">
          <p>&copy; 2024 NutriFarm AI. All rights reserved.</p>
          <p>Thank you for choosing NutriFarm AI!</p>
        </div>
      </div>
    </body>
    </html>
  `,
  
  farmInvitation: (data) => `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Farm Invitation - NutriFarm AI</title>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #3b82f6, #2563eb); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
        .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
        .button { display: inline-block; background: #3b82f6; color: white; padding: 15px 30px; text-decoration: none; border-radius: 5px; margin: 20px 0; }
        .footer { text-align: center; margin-top: 30px; color: #666; font-size: 14px; }
        .farm-details { background: white; padding: 20px; margin: 15px 0; border-radius: 5px; border: 1px solid #e5e7eb; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>🌾 NutriFarm AI</h1>
          <p>Farm Invitation</p>
        </div>
        <div class="content">
          <h2>Hello ${data.name}!</h2>
          <p>You've been invited to join a farm on NutriFarm AI!</p>
          
          <div class="farm-details">
            <h3>Farm Details:</h3>
            <p><strong>Farm Name:</strong> ${data.farmName}</p>
            <p><strong>Farm Type:</strong> ${data.farmType}</p>
            <p><strong>Role:</strong> ${data.role}</p>
            <p><strong>Invited By:</strong> ${data.invitedBy}</p>
          </div>
          
          <p>Click the button below to accept the invitation and start managing this farm:</p>
          <a href="${data.acceptUrl}" class="button">Accept Invitation</a>
          
          <p>If you have any questions about this invitation, please contact the farm owner.</p>
        </div>
        <div class="footer">
          <p>&copy; 2024 NutriFarm AI. All rights reserved.</p>
          <p>This invitation was sent to you by ${data.invitedBy}.</p>
        </div>
      </div>
    </body>
    </html>
  `
};

// Send email function
export const sendEmail = async ({ email, subject, template, data, attachments = [] }) => {
  try {
    const transporter = createTransporter();
    
    // Get template
    const htmlContent = emailTemplates[template](data);
    
    const mailOptions = {
      from: `"NutriFarm AI" <${process.env.EMAIL_FROM || process.env.EMAIL_USER}>`,
      to: email,
      subject: subject,
      html: htmlContent,
      attachments
    };

    const info = await transporter.sendMail(mailOptions);
    
    console.log('Email sent successfully:', {
      messageId: info.messageId,
      to: email,
      subject: subject,
      template: template
    });

    return {
      success: true,
      messageId: info.messageId
    };

  } catch (error) {
    console.error('Email sending failed:', error);
    throw new Error(`Failed to send email: ${error.message}`);
  }
};

// Send bulk emails
export const sendBulkEmails = async (emails, subject, template, data) => {
  const results = [];
  
  for (const email of emails) {
    try {
      const result = await sendEmail({ email, subject, template, data });
      results.push({ email, success: true, result });
    } catch (error) {
      results.push({ email, success: false, error: error.message });
    }
  }
  
  return results;
};

// Send notification email
export const sendNotificationEmail = async (user, notification) => {
  const data = {
    name: user.firstName,
    notificationType: notification.type,
    message: notification.message,
    timestamp: new Date().toLocaleString(),
    actionUrl: notification.actionUrl || `${process.env.FRONTEND_URL}/dashboard`
  };

  return await sendEmail({
    email: user.email,
    subject: `NutriFarm AI Notification: ${notification.title}`,
    template: 'notification',
    data
  });
};

// Send weekly report email
export const sendWeeklyReport = async (user, farmData) => {
  const data = {
    name: user.firstName,
    farmName: farmData.name,
    weekStart: farmData.weekStart,
    weekEnd: farmData.weekEnd,
    metrics: farmData.metrics,
    recommendations: farmData.recommendations,
    reportUrl: `${process.env.FRONTEND_URL}/farms/${farmData.id}/reports`
  };

  return await sendEmail({
    email: user.email,
    subject: `Weekly Farm Report - ${farmData.name}`,
    template: 'weeklyReport',
    data
  });
};
