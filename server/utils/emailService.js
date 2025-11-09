const nodemailer = require('nodemailer');

// Create transporter
const createTransporter = () => {
    console.log('Creating email transporter...');
    console.log('Email User:', process.env.EMAIL_USER);
    console.log('Email Password exists:', !!process.env.EMAIL_PASSWORD);
    console.log('Email Password length:', process.env.EMAIL_PASSWORD?.length);
    
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASSWORD) {
        console.error('❌ Email credentials not configured!');
        console.error('Please set EMAIL_USER and EMAIL_PASSWORD in .env file');
        throw new Error('Email credentials not configured');
    }
    
    if (process.env.EMAIL_PASSWORD === 'your_app_password_here') {
        console.error('❌ Email password is still the default placeholder!');
        console.error('Please replace with your actual Gmail App Password');
        throw new Error('Email password not configured');
    }
    
    return nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASSWORD
        }
    });
};

// Send email notification for new item
const sendNewItemNotification = async (item) => {
    try {
        const transporter = createTransporter();

        const itemType = item.concerntype === 'lost' ? 'LOST' : 'FOUND';
        const itemTypeEmoji = item.concerntype === 'lost' ? '🔴' : '🟢';

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: 'lostandfoundcampusdrait@gmail.com',
            subject: `${itemTypeEmoji} New ${itemType} Item Reported - ${item.itemname}`,
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 2px solid #3498db; border-radius: 10px;">
                    <h2 style="color: #3498db; text-align: center;">🔔 New ${itemType} Item Reported</h2>
                    
                    <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
                        <h3 style="color: #2c3e50; margin-top: 0;">Item Details:</h3>
                        
                        <table style="width: 100%; border-collapse: collapse;">
                            <tr>
                                <td style="padding: 10px; border-bottom: 1px solid #ddd;"><strong>Item Name:</strong></td>
                                <td style="padding: 10px; border-bottom: 1px solid #ddd;">${item.itemname}</td>
                            </tr>
                            <tr>
                                <td style="padding: 10px; border-bottom: 1px solid #ddd;"><strong>Description:</strong></td>
                                <td style="padding: 10px; border-bottom: 1px solid #ddd;">${item.itemdescription}</td>
                            </tr>
                            <tr>
                                <td style="padding: 10px; border-bottom: 1px solid #ddd;"><strong>Type:</strong></td>
                                <td style="padding: 10px; border-bottom: 1px solid #ddd;">
                                    <span style="background-color: ${item.concerntype === 'lost' ? '#ff6b6b' : '#51cf66'}; color: white; padding: 5px 10px; border-radius: 5px;">
                                        ${itemType}
                                    </span>
                                </td>
                            </tr>
                            <tr>
                                <td style="padding: 10px; border-bottom: 1px solid #ddd;"><strong>Reporter USN:</strong></td>
                                <td style="padding: 10px; border-bottom: 1px solid #ddd;"><strong>${item.usn || 'Not provided'}</strong></td>
                            </tr>
                            <tr>
                                <td style="padding: 10px; border-bottom: 1px solid #ddd;"><strong>Reporter Phone:</strong></td>
                                <td style="padding: 10px; border-bottom: 1px solid #ddd;">${item.phonenumber || 'Not provided'}</td>
                            </tr>
                            <tr>
                                <td style="padding: 10px; border-bottom: 1px solid #ddd;"><strong>Reported By:</strong></td>
                                <td style="padding: 10px; border-bottom: 1px solid #ddd;">${item.user}</td>
                            </tr>
                            <tr>
                                <td style="padding: 10px;"><strong>Date:</strong></td>
                                <td style="padding: 10px;">${new Date(item.date).toLocaleString()}</td>
                            </tr>
                        </table>
                    </div>

                    ${item.images && item.images.length > 0 ? `
                        <div style="margin: 20px 0;">
                            <h3 style="color: #2c3e50;">📷 Images:</h3>
                            <p style="color: #7f8c8d; font-size: 14px;">Images have been uploaded. Please check the admin portal to view them.</p>
                        </div>
                    ` : ''}

                    <div style="background-color: #e8f4f8; padding: 15px; border-radius: 8px; margin: 20px 0;">
                        <p style="margin: 0; color: #2c3e50;">
                            <strong>Action Required:</strong> Please review this item in the admin portal and take appropriate action.
                        </p>
                    </div>

                    <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 2px solid #ddd;">
                        <p style="color: #7f8c8d; font-size: 14px; margin: 5px 0;">
                            This is an automated notification from Lost & Found Campus System
                        </p>
                        <p style="color: #7f8c8d; font-size: 12px; margin: 5px 0;">
                            Please do not reply to this email
                        </p>
                    </div>
                </div>
            `
        };

        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent successfully:', info.messageId);
        return { success: true, messageId: info.messageId };
    } catch (error) {
        console.error('Error sending email:', error);
        return { success: false, error: error.message };
    }
};

// Send email notification for new claim
const sendNewClaimNotification = async (claim) => {
    try {
        const transporter = createTransporter();

        const itemTypeEmoji = claim.itemType === 'lost' ? '🔴' : '🟢';

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: 'lostandfoundcampusdrait@gmail.com',
            subject: `🎯 New Claim Submitted - ${claim.itemName}`,
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 2px solid #9b59b6; border-radius: 10px;">
                    <h2 style="color: #9b59b6; text-align: center;">🎯 New Claim Submitted</h2>
                    
                    <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
                        <h3 style="color: #2c3e50; margin-top: 0;">Item Details:</h3>
                        
                        <table style="width: 100%; border-collapse: collapse;">
                            <tr>
                                <td style="padding: 10px; border-bottom: 1px solid #ddd;"><strong>Item Name:</strong></td>
                                <td style="padding: 10px; border-bottom: 1px solid #ddd;">${claim.itemName}</td>
                            </tr>
                            <tr>
                                <td style="padding: 10px; border-bottom: 1px solid #ddd;"><strong>Item Type:</strong></td>
                                <td style="padding: 10px; border-bottom: 1px solid #ddd;">${itemTypeEmoji} ${claim.itemType.toUpperCase()}</td>
                            </tr>
                            <tr>
                                <td style="padding: 10px; border-bottom: 1px solid #ddd;"><strong>Description:</strong></td>
                                <td style="padding: 10px; border-bottom: 1px solid #ddd;">${claim.itemDescription}</td>
                            </tr>
                        </table>
                    </div>

                    <div style="background-color: #fff3cd; padding: 20px; border-radius: 8px; margin: 20px 0;">
                        <h3 style="color: #2c3e50; margin-top: 0;">Claimant Information:</h3>
                        
                        <table style="width: 100%; border-collapse: collapse;">
                            <tr>
                                <td style="padding: 10px; border-bottom: 1px solid #ddd;"><strong>Name:</strong></td>
                                <td style="padding: 10px; border-bottom: 1px solid #ddd;">${claim.claimantName}</td>
                            </tr>
                            <tr>
                                <td style="padding: 10px; border-bottom: 1px solid #ddd;"><strong>Phone:</strong></td>
                                <td style="padding: 10px; border-bottom: 1px solid #ddd;">${claim.claimantPhone}</td>
                            </tr>
                            <tr>
                                <td style="padding: 10px; border-bottom: 1px solid #ddd;"><strong>Email:</strong></td>
                                <td style="padding: 10px; border-bottom: 1px solid #ddd;">${claim.claimantEmail}</td>
                            </tr>
                            <tr>
                                <td style="padding: 10px;"><strong>Proof of Claim:</strong></td>
                                <td style="padding: 10px;">${claim.claimDescription}</td>
                            </tr>
                        </table>
                    </div>

                    <div style="background-color: #e8f4f8; padding: 15px; border-radius: 8px; margin: 20px 0;">
                        <p style="margin: 0; color: #2c3e50;">
                            <strong>Action Required:</strong> Please review this claim in the admin portal and verify the claimant's identity before approving.
                        </p>
                    </div>

                    <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 2px solid #ddd;">
                        <p style="color: #7f8c8d; font-size: 14px; margin: 5px 0;">
                            This is an automated notification from Lost & Found Campus System
                        </p>
                        <p style="color: #7f8c8d; font-size: 12px; margin: 5px 0;">
                            Please do not reply to this email
                        </p>
                    </div>
                </div>
            `
        };

        const info = await transporter.sendMail(mailOptions);
        console.log('Claim notification email sent successfully:', info.messageId);
        return { success: true, messageId: info.messageId };
    } catch (error) {
        console.error('Error sending claim notification email:', error);
        return { success: false, error: error.message };
    }
};

module.exports = {
    sendNewItemNotification,
    sendNewClaimNotification
};
