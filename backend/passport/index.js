const LocalStrategy = require('passport-local').Strategy;
// const db = require('pg').Pool
const users = require('../tempuser');



exports.config = (passport)=>{
    // 로그인 시 유저 정보 세션에 저장
    passport.serializeUser((user,done)=>{
        done(null,user.id);
    })
    
    passport.deserializeUser((id,done)=>{
        const result = users.filter(user=>user.id === rid);
        if(result.length>0){
            done(null, result[0]);
        }
    });
    
    passport.use(new LocalStrategy({
        usernameField:'rid',
        passwordField:'pw',
    
    }, (rid,pw, done)=>{
        const result = users.filter(user=>user.id===rid);
        if (result.length>0){
            const user = result[0];
            if (user.password === pw){
                done(null, user);
            } else {
                done(null,false,{msg:'비밀번호 틀림'})
            }
        } else {
            done(null, fals, {msg: '가입되지 않은 번호'})
        }
    }));
}
