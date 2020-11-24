import React, { useContext, useEffect, useState } from 'react'
import { Image, ActivityIndicator, Text, View } from 'react-native'
import { RectButton } from 'react-native-gesture-handler'
import { User } from '../../../domain/entities/User'
import { ILoadUserUseCase } from '../../../domain/useCases/ILoadUserUseCase'
import { AuthContext } from '../../contexts/AuthContext'

import styles from './styles'

interface IUserScreen {
  loadUser: ILoadUserUseCase
}

function UserScreen({ loadUser }: IUserScreen) {
  const [userInfo, setUserInfo] = useState<User>()
  const { logout } = useContext(AuthContext)

  useEffect(() => {
    async function getUserInfo() {
      try {
        const response = await loadUser.execute()

        setUserInfo(response)
      } catch (err) {
        console.log(err.response.data)
      }
    }

    getUserInfo()
  }, [loadUser])

  if (!userInfo) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" />
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <View>
        <Image source={{ uri: userInfo.avatar }} style={styles.image} />
        <Text style={styles.name}> {userInfo.name} </Text>
      </View>
      <RectButton style={styles.button} onPress={() => logout()}>
        <Text style={styles.text}>Logout</Text>
      </RectButton>
    </View>
  )
}

export default UserScreen
