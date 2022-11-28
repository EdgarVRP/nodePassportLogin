const mongoose=require('mongoose');
const {Schema}=mongoose;
const bcrypt=require('bcryptjs');

const userSchema=new Schema({
    email:{type:String,required:true},
    password:{type:String,required:true},
    telefono:{type:Number}
});
/* Recomendacion copilot
userSchema.methods.encryptPassword=async (password)=>{
    const salt=await bcrypt.genSalt(10);
    const hash=bcrypt.hash(password,salt);
    return hash;
};
*/
userSchema.methods.encryptPassword=(password)=>{
    return bcrypt.hashSync(password,bcrypt.genSaltSync(10));
};

userSchema.methods.matchPassword=function(password){
    return bcrypt.compareSync(password,this.password);
};
//Recomendacion copilot




module.exports= mongoose.model('users',userSchema);
