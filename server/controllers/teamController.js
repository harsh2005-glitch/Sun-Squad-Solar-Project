const TeamMember = require('../models/teamMember');
const cloudinary = require('cloudinary').v2;

// @desc    Get all team members
// @route   GET /api/team
// @access  Public
const getAllTeamMembers = async (req, res) => {
    try {
        const members = await TeamMember.find({}).sort({ createdAt: -1 });
        res.json(members);
    } catch (error) {
        console.error("Error fetching team members:", error);
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Add a new team member
// @route   POST /api/team
// @access  Private (Admin)
const addTeamMember = async (req, res) => {
    try {
        const { name, role, bio } = req.body;

        if (!req.file) {
            return res.status(400).json({ message: 'Please upload an image' });
        }

        // Upload to Cloudinary
        const result = await cloudinary.uploader.upload(req.file.path, {
            folder: 'team_members',
            width: 500,
            crop: "scale"
        });

        const newMember = new TeamMember({
            name,
            role,
            bio,
            imageUrl: result.secure_url,
            cloudinaryId: result.public_id 
        });

        const savedMember = await newMember.save();
        res.status(201).json(savedMember);

    } catch (error) {
        console.error("Error adding team member:", error);
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Delete a team member
// @route   DELETE /api/team/:id
// @access  Private (Admin)
const deleteTeamMember = async (req, res) => {
    try {
        const member = await TeamMember.findById(req.params.id);

        if (!member) {
            return res.status(404).json({ message: 'Team member not found' });
        }

        // Delete from Cloudinary
        if (member.cloudinaryId) {
            await cloudinary.uploader.destroy(member.cloudinaryId);
        } else {
             // Fallback for older images or if cloudinaryId wasn't saved perfectly
            const publicId = member.imageUrl.split('/').pop().split('.')[0];
             await cloudinary.uploader.destroy(`team_members/${publicId}`);
        }

        await TeamMember.findByIdAndDelete(req.params.id);

        res.json({ message: 'Team member removed' });
    } catch (error) {
        console.error("Error deleting team member:", error);
        res.status(500).json({ message: 'Server Error' });
    }
};

module.exports = {
    getAllTeamMembers,
    addTeamMember,
    deleteTeamMember
};
