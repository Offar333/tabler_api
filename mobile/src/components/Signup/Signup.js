import React, { Component } from 'react';
import { StatusBar, AsyncStorage , StyleSheet, ImageBackground} from 'react-native';
import axios from 'axios';
import api from '../../api/api'

import {
    Logo, 
    Container, 
    SubTitle, 
    Title, 
    Inputs,
    ButtonViewRegister,
    ButtonRegisterOk,
    TextButton
} from './styles';
import { Root, Popup } from 'popup-ui';


export default class Signup extends Component{  

    state = {
        username: 'johnny123',
        email: 'teste@teste.com.br',
        password: '123456',
        passwordConfirm: '123456',
        error: '',
    }
    
    handleNameChange = (username) => {
        this.setState({ username });
    }
    
    handleEmailChange = (email) => {
        this.setState({ email });
    }
    
    handlePasswordChange = (password) => {
        this.setState({password});
    }

    handlePasswordConfirmation = (passwordConfirm) => {
        this.setState({passwordConfirm});
    }

    
    handleSignupPress = async () => {
        if (this.state.username === 0 || this.state.email === 0 || this.state.password === 0){
            this.setState({ error: 'ta faltando coisa ai' });
            console.log(this.state.error);
        } else {
            try {
                const response = await api.post('/users', {
                    username: this.state.username,
                    email: this.state.email,
                    password: this.state.password,
                });
    
                this.setState({ error: 'Deu bom, eu acho' });
                console.log(this.state.error);
    
            } catch (_err) {
                console.log(_err.request)
                this.setState({ error: 'Houve um problema no registro, verifique os dados.' });
                console.log(this.state.error);
            }
        }
    } 
    



    render(){  
        return( 
            <Root><Container>
                <ImageBackground source={require('../../assets/fundo.png')} style={styles.backgroundImage}>
                <Logo source={require('../../assets/logo.png')}/>
                <SubTitle>Jogue e Adquira Elos</SubTitle>
                <Title>Cadastrar-se</Title>
                <Inputs 
                    autoCapitalize='none'
                    onChangeText={this.handleNameChange}
                    value={this.state.username}
                    placeholder="Digite seu nome de usuario" 
                    autoFocus={true} 
                    returnKeyType = {"next"}
                />
                <Inputs 
                    autoCapitalize='none'
                    onChangeText={this.handleEmailChange}
                    value={this.state.email}
                    placeholder="Digite seu e-mail" 
                    keyboardType="email-address"
                />
                <Inputs 
                    autoCapitalize='none'
                    value={this.state.password}
                    onChangeText={this.handlePasswordChange}
                    placeholder="Digite sua senha"
                    secureTextEntry={true}/>


                <Inputs
                    autoCapitalize='none'
                    onChange={this.handlePasswordConfirmation}
                    value={this.state.passwordConfirm}
                    placeholder="Digite a confirmacao"
                    secureTextEntry={true}
                />

                <ButtonViewRegister>
                    <ButtonRegisterOk
                        onPress={this.handleSignupPress}
                        >
                        <TextButton>Cadastrar-se</TextButton>
                    </ButtonRegisterOk>
                </ButtonViewRegister>
                </ImageBackground>
            </Container></Root>
        )}}
        
        const styles = StyleSheet.create({
            backgroundImage: {
                height: '100%',
                width: '100%',
                alignItems: 'center',
                resizeMode: 'cover',
                justifyContent: 'center',
          }
          });

        Signup.navigationOptions = {
            header: null
          }
          
