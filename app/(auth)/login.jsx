import { View, Text, Image, TextInput, TouchableOpacity, Alert } from 'react-native'
import React, { useRef, useState } from 'react'
import { Link, router } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context';
import Logo from "../../assets/images/logo.png"
import eyehide from "../../assets/icons/eye-hide.png"
import eye from "../../assets/icons/eye.png"
import { getLoggedInUser, signin } from '../../lib/appwrite';
import { useDispatch } from 'react-redux';
import { addLoggedInUser } from '../../redux/userSlice';

const Login = () => {
  let [showPassword , setShowPassword] = useState(false);
  let inputs = useRef({email:"",password:""});
  let dispatch = useDispatch();
  
  let toggleShowPassword = () =>{
  setShowPassword(!showPassword);
  }

  let handleLogin = async() =>{
    if (!inputs.current.email || !inputs.current.password) {
      Alert.alert('Error', 'Please fill in all fields!');
    } else {
      try {
         await signin(inputs.current.email,inputs.current.password);
       

        await getLoggedInUser()
        
         
         
      router.navigate("/home");
      } catch (error) {
        throw new Error (error)
      }
     
    }

  }


  return (
    <View className=" bg-[#161622] flex-1  h-full w-full items-center pt-[15%] "  >
      <View id='container' className =" h-fit w-[90%]">
          <Image className="w-1/3" resizeMode="contain" source={Logo}></Image>

          <View className="   h-fit w-full  gap-y-3">

            <Text className="text-2xl font-semibold text-white">Login</Text>

            
            <View className="flex gap-2">
                  <Text className="text-lg text-[#cdcde0]">email</Text>
                  <TextInput placeholder='your email address'   onChangeText={(text) => inputs.current.email = text}  placeholderTextColor={"#7B7B8B"} className="focus:border-secondary text-white  focus:border-2 h-[55px] text-base rounded-lg bg-[#1E1E2D] px-4"/>
            </View>
            <View className="flex gap-1 ">
                  <Text className="text-lg text-[#cdcde0]">password</Text>
                  
                  <View className="flex flex-row justify-between">
                    <TextInput  onChangeText={(text) => inputs.current.password = text} secureTextEntry={true && !showPassword} placeholder='enter your password'  placeholderTextColor={"#7B7B8B"} className="focus:border-secondary focus:border-2 h-[55px] w-[100%] text-white text-base rounded-lg bg-[#1E1E2D] px-4"/>
                    <TouchableOpacity className="w-10 -translate-x-10  flex items-center justify-center " onPress={toggleShowPassword}><Image className="w-[25px] h-[25px]" resizeMode='contain' source={showPassword? eyehide:eye}></Image></TouchableOpacity>
                  </View>
                  
            </View>

          <TouchableOpacity onPress={handleLogin} className=" py-3 px-2  rounded-lg  flex justify-center items-center font-bold  text-[#161622] bg-[#ff8c00]">
              <Text className="text-lg font-semibold" >Log In</Text>
            </TouchableOpacity>

          <Link href={"/signup"} className='w-full h-10 text-center '>
            <Text className="text-[#787b8b]  text-base">Don't have an account? <Text className="text-[#ff8c00] underline">Signup</Text></Text>
          </Link>
          </View>
      </View>
    </View>
  )
}

export default Login 