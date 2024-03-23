import mongoose from 'mongoose'

const messageSchema = mongoose.Schema(
    {
        content: {
            type: String,
            trim: true
        },
        type: {
            type: String,
            required: true
        },
        attachments: [
            {
                public_id: {
                    type: String,
                    required: true
                },
                url: {
                    type: String,
                    required: true
                }
            }
        ],
        sender: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        chat: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Chat',
            required: true
        }
    },
    {
        timestamps: true
    }
)
const Message = mongoose.model('Message', messageSchema)
export default Message