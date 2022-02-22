let timer;

export default{
   async login(context,payload){
      return context.dispatch('auth',{
           ...payload,
           mode :'login'
       });
   /*  const response=await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyD4kmObKfi2EUoH3PiIPz-YeyQotvCi_EM',{
        method:'POST',
        body:JSON.stringify({
            email : payload.email,
            password : payload.password,
            returnSecureToken : true


        })
    });
      
  
        const responseData = await response.json();
        
        if (!response.ok){
            console.log("resdata",responseData)
            const error= new Error(responseData.message || 'failed to authenticate check your login');
            throw error;
        }
        console.log(responseData);
        context.commit('setUser',{
            token:responseData.idToken,
            userId:responseData.localId,
            tokenExpiration:responseData.expiresIn
        })*/


    },
    async signup(context,payload){
       
          return  context.dispatch('auth',{
                ...payload,
                mode :'signup'
            });
       /* const response=await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyD4kmObKfi2EUoH3PiIPz-YeyQotvCi_EM',{
            method:'POST',
            body:JSON.stringify({
                email : payload.email,
                password : payload.password,
                returnSecureToken : true


            })
        });
       
        const responseData = await response.json();
       
        if (!response.ok){
            console.log("resdata",responseData)
            const error= new Error(responseData.message || 'failed to authenticate check your login');
            throw error;
        }
        console.log(responseData);
        context.commit('setUser',{
            token:responseData.idToken,
            userId:responseData.localId,
            tokenExpiration:responseData.expiresIn
        });
        */
    },
   async auth(context,payload){
        const mode=payload.mode;
        let url ='https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyD4kmObKfi2EUoH3PiIPz-YeyQotvCi_EM';
      if(mode === 'singup'){
          url='https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyD4kmObKfi2EUoH3PiIPz-YeyQotvCi_EM';
      }
      
        const response=await fetch(url,{
            method:'POST',
            body:JSON.stringify({
                email : payload.email,
                password : payload.password,
                returnSecureToken : true
    
    
            })
        });
          
      
            const responseData = await response.json();
            
            if (!response.ok){
               // console.log("resdata",responseData)
                const error= new Error(responseData.message || 'failed to authenticate check your login');
                throw error;
            }
              const expiresIn = +responseData.expiresIn * 1000;
            // const expiresIn =5000;
            const expirationDate = new Date().getTime() + expiresIn;


            localStorage.setItem('token',responseData.idToken);
            localStorage.setItem('userId',responseData.localId);
            localStorage.setItem('tockenExpiration',expirationDate)
            //console.log(responseData);

            timer = setTimeout(function(){
                context.dispatch('didAutoLogout');
            },expiresIn)
            context.commit('setUser',{
                token:responseData.idToken,
                userId:responseData.localId,
                
            })

    },
    autoLogin(context){

        const token = localStorage.getItem('token');
        const userId=localStorage.getItem('userId');
        const tokenExpiration = localStorage.getItem('tokenExpiration');

        const expiresIn = +tokenExpiration - new Date().getTime();
        if(expiresIn <0){
            return;
        }
        setTimeout(function(){
            context.dispatch('didAutoLogout');
        },expiresIn)

        if (token && userId){
            context.commit('setUser',{
                token :token,
                userId :userId,
               // tokenExpiration:null
            })
        }
    },
    logout(context){
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        localStorage.removeItem('tokenExpiration')
        clearTimeout(timer);
        context.commit('setUser',{
            token  : null,
            userId  :null,
          // tokenExpiration :null
        });
        
    },
    autoLogout(context){
        context.dispatch('logout');
        context.commit('didAutoLogout');
    }

};