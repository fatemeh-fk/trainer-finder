export default{
  
        userId(state){
            return state.userId;
        },
        token(state){
            return state.token;
        },
        //convert to true boolean by adding double excalmation mark
        isAuthenticated(state){
            return !!state.token;
        },
        didAutoLogout(state){
             return state.didAutoLogout;
          }   

}
