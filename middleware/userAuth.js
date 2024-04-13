let isLoggedIn = (req,res,next)=>{
  if(req.session.userData){
    next();
  }
  else {
    res.redirect('/')
  }
}

let isLoggedOut = (req,res,next)=>{
 if(req.session.userData){
   res.redirect('/home')
 }else{
    next();
 }
}






module.exports = {
  isLoggedIn,
  isLoggedOut,
}


