import mongoose from 'mongoose'

const chatSchema = mongoose.Schema(
    {
        name: {
            type: String,
            trim: true
        },
        isGroupChat: {
            type: Boolean,
            default: false
        },
        groupAdmin: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        members: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User'
            }
        ],
        latestMessage: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Message'
        }
    },
    {
        timestamps: true
    }
)

const Chat = mongoose.model('Chat', chatSchema)
export default Chat