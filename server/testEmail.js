// Test Email Configuration
require('dotenv').config();
const nodemailer = require('nodemailer');

console.log('=== Email Configuration Test ===\n');

// Check environment variables
console.log('1. Checking environment variables...');
console.log('   EMAIL_USER:', process.env.EMAIL_USER);
console.log('   EMAIL_PASSWORD exists:', !!process.env.EMAIL_PASSWORD);
console.log('   EMAIL_PASSWORD length:', process.env.EMAIL_PASSWORD?.length);

if (!process.env.EMAIL_USER || !process.env.EMAIL_PASSWORD) {
    console.error('\n❌ ERROR: Email credentials not found in .env file!');
    console.log('\nPlease add these to your .env file:');
    console.log('EMAIL_USER=lostandfoundcampusdrait@gmail.com');
    console.log('EMAIL_PASSWORD=your_16_character_app_password');
    process.exit(1);
}

if (process.env.EMAIL_PASSWORD === 'your_app_password_here') {
    console.error('\n❌ ERROR: Email password is still the default placeholder!');
    console.log('\nSteps to get Gmail App Password:');
    console.log('1. Go to: https://myaccount.google.com/');
    console.log('2. Click Security → 2-Step Verification (enable if not enabled)');
    console.log('3. Click Security → App passwords');
    console.log('4. Select Mail and Other (Custom name)');
    console.log('5. Generate and copy the 16-character password');
    console.log('6. Update .env file with: EMAIL_PASSWORD=your_generated_password');
    process.exit(1);
}

console.log('✅ Environment variables configured\n');

// Test email connection
console.log('2. Testing email connection...');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD
    }
});

// Verify connection
transporter.verify(function (error, success) {
    if (error) {
        console.error('\n❌ Email connection FAILED!');
        console.error('Error:', error.message);
        
        if (error.message.includes('Invalid login')) {
            console.log('\n💡 Solution:');
            console.log('1. Make sure you are using an App Password, not your regular Gmail password');
            console.log('2. Remove any spaces from the App Password');
            console.log('3. Ensure 2-Step Verification is enabled on your Gmail account');
            console.log('4. Generate a new App Password if needed');
        }
        
        process.exit(1);
    } else {
        console.log('✅ Email connection successful!\n');
        
        // Send test email
        console.log('3. Sending test email...');
        
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: 'lostandfoundcampusdrait@gmail.com',
            subject: '✅ Test Email - Lost & Found System',
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 2px solid #3498db; border-radius: 10px;">
                    <h2 style="color: #3498db; text-align: center;">✅ Email System Working!</h2>
                    
                    <div style="background-color: #d4edda; padding: 20px; border-radius: 8px; margin: 20px 0;">
                        <p style="margin: 0; color: #155724; font-size: 16px;">
                            <strong>Success!</strong> Your email notification system is configured correctly.
                        </p>
                    </div>
                    
                    <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
                        <h3 style="color: #2c3e50; margin-top: 0;">Configuration Details:</h3>
                        <ul style="color: #2c3e50;">
                            <li>Email Service: Gmail</li>
                            <li>From: ${process.env.EMAIL_USER}</li>
                            <li>Status: Active</li>
                            <li>Test Time: ${new Date().toLocaleString()}</li>
                        </ul>
                    </div>
                    
                    <div style="background-color: #e8f4f8; padding: 15px; border-radius: 8px; margin: 20px 0;">
                        <p style="margin: 0; color: #2c3e50;">
                            You will now receive automatic notifications when:
                        </p>
                        <ul style="color: #2c3e50;">
                            <li>New lost items are reported</li>
                            <li>New found items are reported</li>
                            <li>New claims are submitted</li>
                        </ul>
                    </div>
                    
                    <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 2px solid #ddd;">
                        <p style="color: #7f8c8d; font-size: 14px; margin: 5px 0;">
                            This is a test email from Lost & Found Campus System
                        </p>
                        <p style="color: #7f8c8d; font-size: 12px; margin: 5px 0;">
                            Test completed successfully at ${new Date().toLocaleString()}
                        </p>
                    </div>
                </div>
            `
        };
        
        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.error('❌ Failed to send test email!');
                console.error('Error:', error.message);
                process.exit(1);
            } else {
                console.log('✅ Test email sent successfully!');
                console.log('   Message ID:', info.messageId);
                console.log('\n📧 Check your inbox: lostandfoundcampusdrait@gmail.com');
                console.log('\n🎉 Email system is fully configured and working!');
                process.exit(0);
            }
        });
    }
});
