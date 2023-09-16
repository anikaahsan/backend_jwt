import React from 'react'
import { useState } from 'react'
import { TextInput,View,Text ,StyleSheet,TouchableOpacity,FlatList} from 'react-native'

import axios from 'axios';

const Signup=({navigation})=>{
   const [email,setEmail]=useState('')
   const [username,setUsername]=useState('')
   const [password,setPassword]=useState('')
   const [data,setData]=useState('')

   const handleSubmit=async ()=>{
      try{
         const response=await axios.post(`http://10.0.2.2:8000/register/`,
                                                                        {email:email,
                                                                            username:username,
                                                                            password:password})
         setData(response.data)                                                                   
         console.log(response.data)                                                                   
      }catch(error){
         console.error('error is', error)
      }

   }
  
      
  
    return(
        
        <View style={{alignItems:'center',flex:1,justifyContent:'center',backgroundColor:'white'}} >
              <View>
            <Text style={{fontSize:40,fontWeight:'bold',}}>Sign Up</Text>
        </View>
            { data ?
            (
            <View style={{flexDirection:"row",marginTop:15,}}>
            <Text style={{fontSize:20}}>{ data }</Text>
            <TouchableOpacity onPress={()=>navigation.navigate('login')}> 
                <Text style={{ fontWeight:'bold',color:'slateblue',fontSize:20}}> Now Login</Text>
            </TouchableOpacity>
        </View>)
        :
        (<View>
          
        <View style={{marginTop:20}}>
            <TextInput
                    style={styles.textstyle}
                    value={email}
                    onChangeText={(e)=>setEmail(e)}
                    placeholder='Email'
                    placeholderTextColor={'black'}/>
            <TextInput
                    style={styles.textstyle}
                    value={username}
                    onChangeText={(e)=>setUsername(e)}
                    placeholder='Username'
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
                 <Text style={{fontSize:25,backgroundColor:'slateblue',padding:10,borderRadius:10,textAlign:'center',color:'white'}}>Sign Up</Text>
        </TouchableOpacity>

        <View style={{flexDirection:"row",marginTop:15,}}>
            <Text style={{fontSize:18}}>Already have a account??</Text>
            <TouchableOpacity onPress={()=>navigation.navigate('login')}> 
                <Text style={{ fontWeight:'bold',color:'slateblue',fontSize:18}}>Login</Text>
            </TouchableOpacity>
        </View>
        </View>
        )}
       
       
    </View>
    )
}
export default Signup
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