const Claim = require('../models/ClaimSchema');
const { sendNewClaimNotification } = require('../utils/emailService');

// Create a new claim
const createClaim = async (req, res) => {
    try {
        const {
            itemId,
            itemName,
            itemDescription,
            itemType,
            claimantName,
            claimantPhone,
            claimantEmail,
            claimDescription,
            itemOwnerPhone
        } = req.body;

        // Validate required fields
        if (!itemId || !itemName || !claimantName || !claimantPhone || !claimantEmail || !claimDescription || !itemOwnerPhone) {
            return res.status(400).json({ 
                success: false,
                message: "All fields are required" 
            });
        }

        // Create claim
        const claim = await Claim.create({
            itemId,
            itemName,
            itemDescription,
            itemType,
            claimantName,
            claimantPhone,
            claimantEmail,
            claimDescription,
            itemOwnerPhone,
            status: 'pending'
        });

        // Send email notification to admin
        console.log('📧 Attempting to send claim notification email for:', claim.itemName);
        sendNewClaimNotification(claim).then(result => {
            if (result.success) {
                console.log('✅ Admin claim notification email sent successfully!');
                console.log('   Message ID:', result.messageId);
            } else {
                console.error('❌ Failed to send admin claim notification email:', result.error);
            }
        }).catch(error => {
            console.error('❌ Error in claim notification promise:', error);
        });

        res.status(201).json({ 
            success: true,
            message: "Claim submitted successfully! Admin will review and contact you.",
            claim 
        });
    } catch (error) {
        console.error("Error creating claim:", error);
        res.status(500).json({ 
            success: false,
            message: "Error submitting claim. Please try again." 
        });
    }
};

// Get all claims
const fetchClaims = async (req, res) => {
    try {
        const claims = await Claim.find().sort({ date: -1 });
        res.json({ 
            success: true,
            gotClaim: claims 
        });
    } catch (error) {
        console.error("Error fetching claims:", error);
        res.status(500).json({ 
            success: false,
            message: "Error fetching claims" 
        });
    }
};

// Get pending claims only
const fetchPendingClaims = async (req, res) => {
    try {
        const claims = await Claim.find({ status: 'pending' }).sort({ date: -1 });
        res.json({ 
            success: true,
            gotClaim: claims 
        });
    } catch (error) {
        console.error("Error fetching pending claims:", error);
        res.status(500).json({ 
            success: false,
            message: "Error fetching pending claims" 
        });
    }
};

// Update claim status and meeting place
const updateClaim = async (req, res) => {
    try {
        const { id } = req.params;
        const { status, meetingPlace } = req.body;

        const claim = await Claim.findByIdAndUpdate(
            id,
            { status, meetingPlace },
            { new: true }
        );

        if (!claim) {
            return res.status(404).json({ 
                success: false,
                message: "Claim not found" 
            });
        }

        res.json({ 
            success: true,
            message: "Claim updated successfully",
            claim 
        });
    } catch (error) {
        console.error("Error updating claim:", error);
        res.status(500).json({ 
            success: false,
            message: "Error updating claim" 
        });
    }
};

// Delete claim
const deleteClaim = async (req, res) => {
    try {
        const { id } = req.params;
        
        const claim = await Claim.findByIdAndDelete(id);
        
        if (!claim) {
            return res.status(404).json({ 
                success: false,
                message: "Claim not found" 
            });
        }

        res.json({ 
            success: true,
            message: "Claim deleted successfully" 
        });
    } catch (error) {
        console.error("Error deleting claim:", error);
        res.status(500).json({ 
            success: false,
            message: "Error deleting claim" 
        });
    }
};

module.exports = {
    createClaim,
    fetchClaims,
    fetchPendingClaims,
    updateClaim,
    deleteClaim
};
