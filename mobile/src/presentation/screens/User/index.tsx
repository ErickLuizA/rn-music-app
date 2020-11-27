import React, { useContext, useEffect, useState } from 'react'
import {
  Image,
  ActivityIndicator,
  Text,
  View,
  StyleSheet,
  Dimensions,
} from 'react-native'
import { RectButton } from 'react-native-gesture-handler'
import { User } from '../../../domain/entities/User'
import { ILoadUserUseCase } from '../../../domain/useCases/ILoadUserUseCase'
import UserTabs from '../../../main/navigation/UserTabs'
import { AuthContext } from '../../contexts/AuthContext'

interface IUserScreen {
  loadUser: ILoadUserUseCase
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#111',
    paddingHorizontal: 20,
  },

  image: {
    width: 200,
    height: 200,
    borderRadius: 100,
  },

  name: {
    color: '#ddd',
    fontSize: 22,
    fontFamily: 'Inter_700Bold',
    alignSelf: 'center',
    marginTop: 60,
  },

  button: {
    backgroundColor: '#C72914',
    alignSelf: 'stretch',
    marginVertical: 10,
    paddingVertical: 10,
    width: Dimensions.get('window').width / 1.5,
  },

  text: {
    color: '#ddd',
    fontSize: 16,
    fontFamily: 'Inter_700Bold',
    textAlign: 'center',
    paddingVertical: 10,
  },
})

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
        <RectButton style={styles.button} onPress={() => logout()}>
          <Text style={styles.text}>Logout</Text>
        </RectButton>
      </View>
    </View>
  )
}

export default UserScreen
