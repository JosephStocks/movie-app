const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcryptjs');
const db = require('../models');


const init = (passport) => {

    passport.use( new LocalStrategy((email, password, done) =>{
        console.log(`inside passport.use: email ${email}, password: ${password}`);

        db.users.findAll({where: {email: email}})
        .then(records =>{
            //[{}]
            if( records  != null){

                let record = records[0];
                
                bcrypt.compare(password, record.password, (err, response)=>{

                        if(response){
                            //this means a match, user with correct password 
                            console.log('passwords matched');
                            //serialize user gets called here
                        
                            
                            done(null, { id: record.id, email: record.email })
                        }
                        else {
                            //no session for you - username mismatch 
                            console.log('passwords didnt');
                            done(null, false)
                        }
                })
            }
            else{
                //no session fo you
                console.log(`user not found`)
                done(null, false)
            }
        })

    }))


    passport.serializeUser((user, done) =>{
        //passport adding information to the sessions
        console.log(`serializing user`)
        done(null, user.id)

    })

    passport.deserializeUser((id, done)=>{
        //checking to see if user is valid with the cookie that was passed from request 

        // 5, 7
        console.log('deseralizing user');
        db.users.findByPk(id)
        .then(record =>{
            done(null, record)
        })
    })

}


module.exports = init;