import React from 'react'
import { useState } from 'react'
import { TextInput,View,Text ,StyleSheet,TouchableOpacity} from 'react-native'

import axios from 'axios'
import { setToken } from './AuthService';

const Login=({navigation})=>{
    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')

    const handleSubmit=async()=>{
        const response=await axios.post(`http://10.0.2.2:8000/login/`,
                                                                        {email:email,
                                                                            password:password})
        setToken(response.data.token.access)  
        console.log(response.data.token.access) 
        console.log(response.data)  
        navigation.navigate('product')                                                               

    }
 
  
        return(
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
                               onPress={handleSubmit}
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
         )
 
 

}
export default Login

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