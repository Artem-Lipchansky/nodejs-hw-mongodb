import { model, Schema } from 'mongoose';

const contactsSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: false,
    },
    isFavourite: {
      type: Boolean,
      default: false,
    },
    contactType: {
      type: String,
      enum: ['work', 'home', 'personal'],
      default: 'personal',
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'users',
    },
    photo: {
      type: String,
      default: null,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const Contact = model('contacts', contactsSchema);

export default Contact;




// import { model, Schema } from 'mongoose';

// const contactsSchema = new Schema(
//   {
//     name: {
//       type: String,
//       required: true,
//     },
//     phoneNumber: {
//       type: String,
//       required: true,
//     },
//     email: {
//       type: String,
//       required: false,
//     },
//     isFavourite: {
//       type: Boolean,
//       required: true,
//       default: false,
//     },
//     contactType: {
//       type: String,
//       required: true,
//       enum: ['work', 'home', 'personal'],
//       default: 'personal',
//     },
//     photo: {
//       type: String,
//     },
//     userId: {
//       type: Schema.Types.ObjectId,
//       ref: 'users',
//     },
//   },
//   {
//     timestamps: true,
//     versionKey: false,
//   }
// );

// export const ContactsCollection = model('contacts', contactsSchema);
