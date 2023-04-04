import { Schema, model, models } from 'mongoose';

const UserSchema = new Schema({
    email: {
        type: String,
        unique: [true, '이메일이 이미 존재합니다'],
        required: [true, '이메일을 입력해주세요'],
    },
    username: { 
        type: String,
        unique: [true, '이름이 이미 존재합니다'],
        required: [true, '이름을 입력해주세요'],
        match: [/^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/, "사용자 이름은 8-20자의 영문,숫자를 넣어야합니다!"]
    },
    image: {    
        type: String,
    }
});

const User = models.User || model('User', UserSchema)

export default User;