const mongoose = require("mongoose");
const validator = require("validator");

const issueSchema = new mongoose.Schema({
    name: {type: String, required: true},
    email: {
        type: String,
        required: true,
        lowercase: true,
        validate: (value) => {
            return validator.isEmail(value)
        }
    },
    mobile: {type: String, required: true},
    issueType: {type: String, required: true},
    issueTitle: {type: String, required: true},
    issueDescription: {type: String, required: true},
    createdAt: {type: Date, default: Date.now()},
    inProgressDate: {type: Date, default: null},
    closedDate: {type: Date, default: null},
    status: {type: String, default:"Open"},
    comments: {type: String, default: "This issue will be addressed shortly!"}
})

const issueTypeSchema = new mongoose.Schema({
    issue_type: {type: String, required: true}    
})


let issueModel = mongoose.model("issues", issueSchema);
let issueTypeModel = mongoose.model("issue-types", issueTypeSchema);

module.exports = {mongoose, issueModel, issueTypeModel};