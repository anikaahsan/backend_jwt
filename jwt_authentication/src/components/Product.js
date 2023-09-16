import React from 'react'
import { useState ,useEffect} from 'react'
import { TextInput,View,Text ,StyleSheet,TouchableOpacity,Pressable} from 'react-native'

import axios from 'axios'
import { getToken ,removeToken} from './AuthService';

const Product=({navigation})=>{
    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')
    const [data,setData]=useState('')

    const [sessionTimer, setSessionTimer] = useState(null);

    const sessionTimeoutDuration = 1 * 60 * 1000;

      // Function to reset the session timer
    const resetSessionTimer = () => {
      console.log("i am in reset session timer")
      if (sessionTimer) {
        clearTimeout(sessionTimer);
      }
     
      const timer = setTimeout(logout, sessionTimeoutDuration);
      setSessionTimer(timer);
    };
  
  
    const logout = async () => {
      await removeToken()
      navigation.navigate('login');
    };

    // Start the session timer when the component mounts
    useEffect(() => {
    resetSessionTimer();
    return () => {
      if (sessionTimer) {
        clearTimeout(sessionTimer);
      }
     
    };
  }, []);

 

    
      useEffect(() => {
      
        getProtectedData();
      }, []); 

    const getProtectedData = async () => {
        console.log('protected')
        try {
          const token = await getToken();
      
          if (!token) {
            // Handle the case where the user is not authenticated
            return null;
          }
      
          const response = await axios.get(`http://10.0.2.2:8000/product/`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
      
          setData(response.data)
          console.log(response.data)
         
        //   return data;
        } catch (error) {
          console.error('Error fetching protected data:', error);
        //   return null;
        }
      };

   
    return(
        <Pressable onPress={resetSessionTimer} style={{alignItems:'center',flex:1,justifyContent:'center',backgroundColor:'white'}} >
            {data?
            (<View >
                <Text style={{ fontSize:30 }}>{ data }</Text>
            </View>)
        :
        (<View>
               <View style={{alignItems:'center',flex:1,justifyContent:'center',backgroundColor:'white'}} >
               <View>
                   <Text style={{fontSize:40,fontWeight:'bold',}}>Log In</Text>
               </View>
               <View style={{marginTop:20}}>
                   <TextInput
                           style={styles.textstyle}
                           value={email}
                           onChangeText={(e)=>setEmail(e)}
                           placeholder='Email'
                           placeholderTextColor={'black'}/>
               
                   <TextInput 
                              style={styles.textstyle}
                              value={password}
                              onChangeText={(e)=>setPassword(e)}
                              placeholder='password'
                              placeholderTextColor={'black'}/>
                           
               </View>
               <TouchableOpacity 
                               style={{ width:300,marginTop:15}}
                            //    onPress={handleSubmit}
                               >
                        <Text style={{fontSize:25,backgroundColor:'slateblue',padding:10,borderRadius:10,textAlign:'center',color:'white'}}>Log In</Text>
               </TouchableOpacity>
                
                <View style={{flexDirection:"row",marginTop:15,}}>
                    <Text style={{fontSize:18}}>Don't have an account??</Text>
                    <TouchableOpacity onPress={()=>navigation.navigate('signup')}> 
                       <Text style={{ fontWeight:'bold',color:'slateblue',fontSize:18}}>Sign Up</Text>
                    </TouchableOpacity>
                </View>
           </View>

        </View>)
        }

        </Pressable>
    )

}
export default Product

const styles=StyleSheet.create({
    textstyle:{
        borderWidth:1,
        borderRadius:8,
        width:300,
        fontSize:18,
        margin:8,
        padding:10
 
    }
 })