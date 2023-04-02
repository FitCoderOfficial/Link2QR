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
        match: [/^[a-zA-Z0-9가-힣]{2,10}$/, '이름은 2~10자의 영문, 숫자, 한글로 입력해주세요'],
    },
    image: {    
        type: String,
    }
});

const User = models.User || model('User', UserSchema)

export default User;