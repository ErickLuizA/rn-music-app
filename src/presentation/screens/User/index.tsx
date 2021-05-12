import React, { useCallback, useContext, useEffect, useState } from 'react'
import {
  Image,
  ActivityIndicator,
  Text,
  View,
  ToastAndroid,
} from 'react-native'
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

  const getUserInfo = useCallback(async () => {
    try {
      const response = await loadUser.execute()

      setUserInfo(response)
    } catch (error) {
      console.log(`USER ${error}`)

      ToastAndroid.show('Erro ao buscar suas informações', ToastAndroid.SHORT)
    }
  }, [loadUser])

  useEffect(() => {
    getUserInfo()
  }, [getUserInfo])

  return (
    <View style={styles.container}>
      <View>
        <View>
          {userInfo ? (
            <>
              <Image
                source={{ uri: userInfo.avatar }}
                style={userInfo.avatar ? styles.image : null}
              />
              <Text style={styles.name}> {userInfo.name} </Text>
            </>
          ) : (
            <ActivityIndicator size="large" color="#ddd" />
          )}
        </View>
        <RectButton style={styles.button} onPress={logout}>
          <Text style={styles.text}>Logout</Text>
        </RectButton>
      </View>
    </View>
  )
}

export default UserScreen
